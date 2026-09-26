'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePlan } from '@/app/context/PlanContext';

const SavedPage = () => {
  const { saved, removeFromSaved } = usePlan();

  if (saved.length === 0) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-4">Nothing Saved Yet</h1>
          <p className="text-neutral-500 mb-6">Save workouts for later from the library.</p>
          <Link href="/workout" className="bg-lime-400 text-black px-6 py-3 rounded-lg font-bold">
            Browse Workouts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-white text-3xl font-black uppercase mb-8">
          Saved ({saved.length})
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((workout) => (
            <div key={workout.id} className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800">
              <div className="relative h-48">
                <Image src={workout.image} alt={workout.name} fill unoptimized className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold uppercase mb-2">{workout.name}</h3>
                <p className="text-neutral-500 text-sm mb-3">⏱ {workout.duration} min · 🔥 {workout.caloriesBurned} kcal</p>
                <button
                  onClick={() => removeFromSaved(workout.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
                >
                  Remove from Saved
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedPage;