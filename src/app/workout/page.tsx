import React from 'react';
import { IWorkout } from '@/types/types';
import LibraryCard from '@/app/Component/Homepage/homepage/Librarycard';

// ✅ নতুন API URL
const API_URL = 'https://api.api-store.workers.dev/api/fitlog';

const getWorkouts = async (): Promise<IWorkout[]> => {
  const res = await fetch(API_URL, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed: ${res.status}`);
  }

  return res.json();
};

const WorkoutPage = async () => {
  const workouts = await getWorkouts();

  if (!workouts || workouts.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <p className="text-neutral-400">No workouts found</p>
      </div>
    );
  }

  return (
    <section className="bg-black py-16 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-black tracking-wide uppercase">
            The Workout Library
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {workouts.length} lifts covering every major muscle group.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map((workout) => (
            <LibraryCard key={workout.id} workout={workout} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkoutPage;