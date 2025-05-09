const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const fs = require('node:fs/promises');
const fsOld = require('node:fs');
const path = require('node:path');
const ffmpeg = require('fluent-ffmpeg');
const crypto = require('crypto');
const { HeadObjectCommand } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: 'eu-north-1',
});

const dynamoClient = new DynamoDBClient({
  region: 'eu-north-1',
});

const RESOLUTIONS = [
  { name: '360p', width: 480, height: 360 },
  { name: '480p', width: 854, height: 480 },
  { name: '720p', width: 1280, height: 720 },
  { name: '1080p', width: 1920, height: 1080 },
];

const BUCKET_NAME = process.env.BUCKET_NAME;
const KEY = process.env.KEY;

async function uploadToS3(filePath, s3Key) {
  const contentType = s3Key.endsWith('.m3u8')
    ? 'application/vnd.apple.mpegurl'
    : 'video/MP2T';

  const putCommand = new PutObjectCommand({
    Bucket: 'transcodedvideos',
    Key: s3Key,
    Body: fsOld.createReadStream(filePath),
    ContentType: contentType,
  });

  await s3Client.send(putCommand);
  console.log(`Uploaded: ${s3Key}`);
}

async function init() {
  if (!BUCKET_NAME || !KEY) {
    throw new Error('BUCKET_NAME and KEY environment variables are required');
  }

  // Get metadata using HeadObjectCommand
  const headData = await s3Client.send(
    new HeadObjectCommand({
      Bucket: BUCKET_NAME,
      Key: KEY,
    })
  );

  const courseId = headData.Metadata?.courseid;
  const title = headData.Metadata?.title;

  if (!courseId) {
    throw new Error('courseId metadata missing in uploaded object');
  }

  const localInput = 'original.mp4';

  const originalVideo = await s3Client.send(
    new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: KEY,
    })
  );

  await fs.writeFile(localInput, originalVideo.Body);

  const videoId = crypto.randomUUID();
  const outputDir = `./output-${videoId}`;
  await fs.mkdir(outputDir);
  // Transcode into each resolution

  const resolutionData = {};

  for (const res of RESOLUTIONS) {
    const variantDir = path.join(outputDir, res.name);
    await fs.mkdir(variantDir);

    await new Promise((resolve, reject) => {
      ffmpeg(localInput)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions([
          '-preset veryfast',
          '-g 48',
          '-sc_threshold 0',
          `-s ${res.width}x${res.height}`,
          `-b:v ${res.width * 1000}`,
          '-hls_time 6',
          '-hls_playlist_type vod',
          `-hls_segment_filename ${variantDir}/segment_%03d.ts`,
        ])
        .output(`${variantDir}/playlist.m3u8`)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    // Add to resolution data for DynamoDB
    resolutionData[res.name] = {
      M: {
        resolution: { S: `${res.width}x${res.height}` },
        url: {
          // cloudfront url
          S: `https://url.cloudfront.net/${videoId}/${res.name}/playlist.m3u8`,
        },
      },
    };
  }

  // Create master playlist
  const masterPlaylistPath = path.join(outputDir, 'master.m3u8');
  const masterPlaylist = RESOLUTIONS.map(
    (res) =>
      `#EXT-X-STREAM-INF:BANDWIDTH=${res.width * 1000},RESOLUTION=${
        res.width
      }x${res.height}\n${res.name}/playlist.m3u8`
  ).join('\n');

  await fs.writeFile(masterPlaylistPath, `#EXTM3U\n${masterPlaylist}`);

  // Upload all files to S3
  const allFiles = await Promise.all(
    RESOLUTIONS.map(async (res) => {
      const files = await fs.readdir(path.join(outputDir, res.name));
      return files.map((f) => ({
        path: path.join(outputDir, res.name, f),
        key: `${videoId}/${res.name}/${f}`,
      }));
    })
  );

  // Flatten array and add master playlist
  const uploadList = allFiles.flat();
  uploadList.push({
    path: masterPlaylistPath,
    key: `${videoId}/master.m3u8`,
  });

  await Promise.all(
    uploadList.map(({ path: filePath, key }) => uploadToS3(filePath, key))
  );

  // Save to DynamoDB
  await dynamoClient.send(
    new PutItemCommand({
      TableName: 'Videos',
      Item: {
        videoId: { S: videoId },
        courseId: { S: courseId },
        originalKey: { S: KEY },
        title: { S: title },
        masterPlaylistUrl: {
          S: `https://url.cloudfront.net/${videoId}/master.m3u8`,
        },
        uploadedAt: { S: new Date().toISOString() },
        resolutions: { M: resolutionData },
      },
    })
  );

  console.log(`✅ Processed video ${videoId} with multi-resolution HLS`);
}

init().catch((err) => {
  console.error('❌ Failed:', err);
});
