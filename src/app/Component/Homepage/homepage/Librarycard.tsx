import Image from 'next/image';
import React from 'react';
import { IWorkout } from '@/app/types/types';
import Link from 'next/link';

interface LibraryCardProps {
  workout: IWorkout;
}

const LibraryCard = ({ workout }: LibraryCardProps) => {
  if (!workout) {
    return <div className="text-red-500">Workout data missing</div>;
  }

  const primaryMuscle = workout.muscleGroups?.[0] || 'N/A';

  return (
    <Link href={`/workout/${workout.id}`}>
      <div className="bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-lime-400/40 hover:-translate-y-1 transition-all duration-300 group">
        {/* Image */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={workout.image || '/placeholder.png'}
            alt={workout.name || 'Workout'}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Badges */}
          <div className="flex gap-2 mb-3">
            <span className="bg-lime-400 text-black text-[11px] font-extrabold px-3 py-1 rounded-full tracking-wide">
              {primaryMuscle.toUpperCase()}
            </span>
            <span className="bg-red-500 text-white text-[11px] font-extrabold px-3 py-1 rounded-full tracking-wide">
              {workout.equipment?.toUpperCase() || 'N/A'}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-white font-extrabold text-lg tracking-wide uppercase leading-tight mb-1">
            {workout.name}
          </h3>

          {/* Description */}
          <p className="text-neutral-500 text-sm mb-4 line-clamp-2">
            {workout.description}
          </p>

          {/* Divider */}
          <div className="border-t border-neutral-800 mb-3"></div>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-1">
              <span>⏱</span>
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🔥</span>
              <span>{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{workout.rating}</span>
            </div>
          </div>

          {/* Sets & Reps */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mt-2 pt-2 border-t border-neutral-800">
            <span>📊 {workout.sets} sets</span>
            <span>🔁 {workout.reps} reps</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LibraryCard;