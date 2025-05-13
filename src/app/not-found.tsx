import Link from 'next/link';
import React from 'react';

function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            The link you followed may be broken, or the page may have been
            removed.
          </p>
        </div>

        <Link
          href="/"
          className="inline-block px-6 py-3 text-sm font-medium text-white transition bg-gray-900 rounded-full hover:bg-gray-800"
          prefetch={false}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default Page;
