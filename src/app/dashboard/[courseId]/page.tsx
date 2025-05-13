import { Button } from '@/components/ui/button';
import { VideoContainer } from '@/components/videos';
import { fetchAllCourseVideos } from '@/lib/actions/dasboardActions';
import Link from 'next/link';

export default async function VideoPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const { data, error } = await fetchAllCourseVideos(courseId);

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h3 className="text-2xl font-semibold text-red-500">{error}</h3>
        <Button asChild>
          <Link href="/dashboard">Go Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard`}>Back to Dashboard</Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">Course Videos</h1>

        <VideoContainer videos={data.videos} />
      </div>
    </div>
  );
}
