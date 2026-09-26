'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { usePlan } from '@/app/context/PlanContext';
import { IWorkout } from '@/types/types';

const MyPlanPage = () => {
  const { plan, saved, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [mounted, setMounted] = useState(false);

  // 🔥 Hydration mismatch এড়ানোর জন্য
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-neutral-400">Loading workouts…</p>
      </div>
    );
  }

  const currentList = activeTab === 'plan' ? plan : saved;

  // 🔥 Live Metrics
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const handleRemove = (id: number) => {
    if (activeTab === 'plan') {
      removeFromPlan(id);
      toast.info('🗑️ Removed from plan');
    } else {
      removeFromSaved(id);
      toast.info('🗑️ Removed from saved');
    }
  };

  return (
    <div className="bg-black min-h-screen py-10 px-4">
      <div className="container mx-auto">

        {/* ==================== Header ==================== */}
        <h1 className="text-white text-3xl md:text-4xl font-black uppercase">
          My Plan
        </h1>
        <p className="text-neutral-500 text-sm mt-1 mb-8">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* ==================== Metrics Summary ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
              Exercises
            </p>
            <p className="text-white text-3xl font-black mt-2">
              {totalExercises}
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
              Minutes
            </p>
            <p className="text-white text-3xl font-black mt-2">
              {totalMinutes}
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest">
              Calories
            </p>
            <p className="text-white text-3xl font-black mt-2">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* ==================== Tabs ==================== */}
        <div className="flex gap-2 border-b border-neutral-800 mb-6">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-3 font-bold text-sm uppercase tracking-wider transition-all ${
              activeTab === 'plan'
                ? 'text-lime-400 border-b-2 border-lime-400'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            Today's Plan ({plan.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-3 font-bold text-sm uppercase tracking-wider transition-all ${
              activeTab === 'saved'
                ? 'text-lime-400 border-b-2 border-lime-400'
                : 'text-neutral-500 hover:text-white'
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        {/* ==================== List / Empty State ==================== */}
        {currentList.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-white text-2xl font-black uppercase mb-2">
              Nothing Here Yet
            </h2>
            <p className="text-neutral-500 mb-6">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/workout"
              className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-3 rounded-full transition"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {currentList.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                tab={activeTab}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

// ==================== Plan Card Component ====================
function PlanCard({
  workout,
  tab,
  onRemove,
}: {
  workout: IWorkout;
  tab: 'plan' | 'saved';
  onRemove: (id: number) => void;
}) {
  const [isDone, setIsDone] = useState(false);

  const handleDone = () => {
    setIsDone(true);
    toast.success(`✅ "${workout.name}" marked as done!`);
  };

  return (
    <div
      className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center ${
        isDone ? 'opacity-60' : ''
      }`}
    >
      {/* Thumbnail */}
      <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          unoptimized
          className="object-cover"
          sizes="150px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 w-full">
        <h3
          className={`text-white font-bold uppercase ${
            isDone ? 'line-through' : ''
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-neutral-500 text-sm mb-2">{workout.equipment}</p>

        <div className="flex gap-4 text-xs text-neutral-400">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 w-full md:w-auto flex-wrap justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-4 py-2 rounded-full transition"
        >
          View Details
        </Link>

        {tab === 'plan' && (
          <button
            onClick={handleDone}
            disabled={isDone}
            className={`text-xs font-bold px-4 py-2 rounded-full transition ${
              isDone
                ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-lime-400 hover:bg-lime-300 text-black'
            }`}
          >
            ✓ {isDone ? 'Done' : 'Mark as Done'}
          </button>
        )}

        <button
          onClick={() => onRemove(workout.id)}
          className="bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white text-xs font-bold px-4 py-2 rounded-full transition"
        >
          ✕ Remove
        </button>
      </div>
    </div>
  );
}

export default MyPlanPage;