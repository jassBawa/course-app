import AdminVideoContaner from '@/components/admin/AdminVideoContaner';
import { Button } from '@/components/ui/button';
import { fetchAllCourseVideos } from '@/lib/actions/dasboardActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function VideoPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  const { data, error } = await fetchAllCourseVideos(courseId);
  console.log(data);
  if (!data || error) {
    return notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/admin`}>Back to dashboard</Link>
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-2">Course Videos here</h1>
        <AdminVideoContaner videos={data.videos} courseId={courseId} />
      </div>
    </div>
  );
}
