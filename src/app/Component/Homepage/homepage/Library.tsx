import React from 'react';
import { IWorkout } from '@/app/types/types';
import LibrarySort from '@/app/Component/Homepage/LibrarySort';

const API_URL = 'https://api.api-store.workers.dev/api/fitlog';

const getLibrary = async (): Promise<IWorkout[]> => {
  const res = await fetch(API_URL, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
};

const Library = async () => {
  const libraryData = await getLibrary();

  if (!libraryData || libraryData.length === 0) {
    return (
      <p className="text-center my-20 text-neutral-400">
        No workouts found
      </p>
    );
  }

  return (
    <section id="library" className="bg-black py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-white text-3xl md:text-4xl font-black tracking-wide uppercase">
            The Library
          </h2>
          <p className="text-neutral-500 text-sm mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Client Component — Sort + Cards */}
        <LibrarySort workouts={libraryData} />
      </div>
    </section>
  );
};

export default Library;