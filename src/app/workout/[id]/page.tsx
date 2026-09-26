import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { IWorkout } from '@/types/types';
import PlanButtons from './PlanButtons';

interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

const API_URL = 'https://api.api-store.workers.dev/api/fitlog';

const getWorkoutById = async (id: string): Promise<IWorkout | null> => {
  const res = await fetch(`${API_URL}/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;

  return res.json();
};

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const primaryMuscle = workout.muscleGroups?.[0] || 'N/A';

  return (
    <div className="bg-black min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-neutral-950 rounded-3xl p-6 lg:p-10 border border-neutral-800">

          {/* Left: Image */}
          <div className="relative h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col">
            <h1 className="text-white text-3xl md:text-4xl font-black tracking-wide uppercase leading-tight mb-3">
              {workout.name}
            </h1>

            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
              {workout.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                {primaryMuscle.toUpperCase()}
              </span>
              {workout.muscleGroups?.slice(1).map((muscle, idx) => (
                <span
                  key={idx}
                  className="bg-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full"
                >
                  {muscle.toUpperCase()}
                </span>
              ))}
            </div>

            {/* Stats Table */}
            <div className="bg-neutral-900 rounded-2xl overflow-hidden mb-6">
              <StatRow label="EQUIPMENT" value={workout.equipment} />
              <StatRow label="DIFFICULTY" value={workout.difficulty} />
              <StatRow label="SETS" value={String(workout.sets)} />
              <StatRow label="REPS" value={workout.reps} />
              <StatRow label="DURATION" value={`${workout.duration} min`} />
              <StatRow label="CALORIES" value={`${workout.caloriesBurned} kcal`} />
              <StatRow label="RATING" value={String(workout.rating)} isLast />
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h2 className="text-lime-400 text-sm font-bold tracking-widest uppercase mb-3">
                Instructions
              </h2>
              <ol className="space-y-2 text-sm text-neutral-400">
                {workout.instructions.map((instruction, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-neutral-600 font-bold min-w-[20px]">
                      {idx + 1}.
                    </span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* ✅ Client Component — শুধু বাটন */}
            <PlanButtons workout={workout} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Stat Row — Server Component
function StatRow({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center px-5 py-3 ${
        !isLast ? 'border-b border-neutral-800' : ''
      }`}
    >
      <span className="text-neutral-500 text-xs font-bold tracking-widest uppercase">
        {label}
      </span>
      <span className="text-white text-sm font-semibold">{value}</span>
    </div>
  );
}

export default WorkoutDetailsPage;