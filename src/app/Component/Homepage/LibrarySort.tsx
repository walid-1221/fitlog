'use client';

import React, { useState, useMemo } from 'react';
import { IWorkout } from '@/types/types';
import LibraryCard from '@/app/Component/Homepage/homepage/Librarycard';

type SortOption = 'duration' | 'calories' | 'rating';

const LibrarySort = ({ workouts }: { workouts: IWorkout[] }) => {
  const [sortBy, setSortBy] = useState<SortOption>('duration');

  const sortedWorkouts = useMemo(() => {
    const list = [...workouts];

    switch (sortBy) {
      case 'duration':
        return list.sort((a, b) => a.duration - b.duration);
      case 'calories':
        return list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [workouts, sortBy]);

  return (
    <>
      {/* Sort Dropdown */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 hover:border-lime-400/40 transition">
          <span className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
            Sort By
          </span>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent text-white text-sm font-semibold focus:outline-none cursor-pointer pr-2"
          >
            <option value="duration" className="bg-neutral-900">
              Duration
            </option>
            <option value="calories" className="bg-neutral-900">
              Calories
            </option>
            <option value="rating" className="bg-neutral-900">
              Rating
            </option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedWorkouts.map((workout) => (
          <LibraryCard key={workout.id} workout={workout} />
        ))}
      </div>
    </>
  );
};

export default LibrarySort;