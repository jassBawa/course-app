# 🎥 Serverless Video Streaming Platform

This project is a scalable, serverless video streaming platform designed to manage courses, upload and transcode videos, and stream them using HLS (HTTP Live Streaming). It leverages AWS services such as Lambda, DynamoDB, S3, SQS, ECS (Fargate), and Cognito.

---

## 🚀 Features

- **Admin Panel** to create courses and upload videos
- **Secure Presigned Upload** to S3 via Lambda
- **Automatic Video Transcoding** to HLS in multiple resolutions
- **Efficient Video Metadata Management** using DynamoDB
- **Playback Support** using HLS-compatible players
- **Fully Serverless & Scalable** using AWS-managed services

---

## 🛠️ Tech Stack

| Layer        | Technology                           |
|--------------|---------------------------------------|
| Frontend     | (To be built using React/Next.js)     |
| Backend API  | AWS Lambda (Node.js), API Gateway     |
| Authentication | AWS Cognito (with group-based auth) |
| Storage      | Amazon S3                             |
| Transcoding  | ECS Fargate + FFmpeg + Node.js        |
| Queue        | Amazon SQS                            |
| Database     | Amazon DynamoDB                       |
| Infrastructure | IAM Roles, Policies, S3 Triggers    |

---

# Cognito configuration
NEXT_PUBLIC_COGNITO_AUTHORITY=https://<your-cognito-domain>.auth.<region>.amazoncognito.com/oauth2
NEXT_PUBLIC_COGNITO_CLIENT_ID=your_cognito_app_client_id
NEXT_PUBLIC_COGNITO_REDIRECT_URI=http://localhost:3000
NEXT_PUBLIC_COGNITO_SCOPE=openid profile email
NEXT_PUBLIC_COGNITO_DOMAIN=<your-cognito-domain>.auth.<region>.amazoncognito.com

# Backend API Gateway endpoint
API_ENDPOINT=https://<your-api-id>.execute-api.<region>.amazonaws.com/prod

## 📦 AWS Architecture Overview

```plaintext
[ Admin Panel (Frontend) ]
         |
         ↓
[ API Gateway + Lambda (create-course, create-video, get-courses, get-course-videos) ]
         |
         ├──> DynamoDB (Courses, Videos Table)
         └──> S3 (Presigned URL Upload to tempvideosbucket)
                                  ↓
                S3 Event Trigger on object upload
                                  ↓
                      SQS Queue (video-processing-queue)
                                  ↓
              ECS Fargate Task (Transcoding with FFmpeg)
                                  ↓
     Transcoded output → S3 (transcodedvideos.jasscodes.com)
                                  ↓
       Update DynamoDB with playback URL + resolutions


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
