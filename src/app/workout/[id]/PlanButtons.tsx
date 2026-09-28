'use client';

import React from 'react';
import { toast } from 'react-toastify';
import { IWorkout } from '@/app/types/types';
import { usePlan } from '@/app/context/PlanContext';

const PlanButtons = ({ workout }: { workout: IWorkout }) => {
  const { addToPlan, addToSaved, isInPlan, isInSaved } = usePlan();

  const alreadyInPlan = isInPlan(workout.id);
  const alreadyInSaved = isInSaved(workout.id);

  const handleAddToPlan = () => {
    if (alreadyInPlan) {
      toast.warning('⚠️ Already in your plan!');
      return;
    }
    addToPlan(workout);
    toast.success(`✅ "${workout.name}" added to your plan!`);
  };

  const handleSaveForLater = () => {
    if (alreadyInSaved) {
      toast.warning('⚠️ Already saved!');
      return;
    }
    addToSaved(workout);
    toast.success(`💖 "${workout.name}" saved for later!`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
      <button
        onClick={handleAddToPlan}
        disabled={alreadyInPlan}
        className={`flex-1 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
          alreadyInPlan
            ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
            : 'bg-lime-400 hover:bg-lime-300 text-black'
        }`}
      >
        <span>📅</span>
        {alreadyInPlan ? 'Added to Plan' : "Add to today's plan"}
      </button>

      <button
        onClick={handleSaveForLater}
        disabled={alreadyInSaved}
        className={`flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border ${
          alreadyInSaved
            ? 'border-neutral-700 text-neutral-500 cursor-not-allowed'
            : 'border-neutral-700 hover:border-lime-400 text-white'
        }`}
      >
        <span>🤍</span>
        {alreadyInSaved ? 'Saved' : 'Save for later'}
      </button>
    </div>
  );
};

export default PlanButtons;