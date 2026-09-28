'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { IWorkout } from '@/app/types/types';

// ============================================
// Context Type
// ============================================
interface PlanContextType {
  plan: IWorkout[];
  saved: IWorkout[];
  addToPlan: (workout: IWorkout) => void;
  addToSaved: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

// ============================================
// Create Context
// ============================================
const PlanContext = createContext<PlanContextType>({
  plan: [],
  saved: [],
  addToPlan: () => {},
  addToSaved: () => {},
  removeFromPlan: () => {},
  removeFromSaved: () => {},
  isInPlan: () => false,
  isInSaved: () => false,
});

// ============================================
// Plan Provider
// ============================================
export const PlanProvider = ({ children }: { children: ReactNode }) => {
  // 🔥 Lazy Initialization — localStorage থেকে সরাসরি load
  const [plan, setPlan] = useState<IWorkout[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedData = localStorage.getItem('fitlog_plan');
      return savedData ? JSON.parse(savedData) : [];
    } catch {
      return [];
    }
  });

  const [saved, setSaved] = useState<IWorkout[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const savedData = localStorage.getItem('fitlog_saved');
      return savedData ? JSON.parse(savedData) : [];
    } catch {
      return [];
    }
  });

  // 🔥 plan পরিবর্তন হলে localStorage-এ সেভ
  useEffect(() => {
    try {
      localStorage.setItem('fitlog_plan', JSON.stringify(plan));
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  }, [plan]);

  // 🔥 saved পরিবর্তন হলে localStorage-এ সেভ
  useEffect(() => {
    try {
      localStorage.setItem('fitlog_saved', JSON.stringify(saved));
    } catch (error) {
      console.error('Error saving saved:', error);
    }
  }, [saved]);

  // ============================================
  // Actions
  // ============================================
  const addToPlan = (workout: IWorkout) => {
    setPlan((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      if (prev.length >= 5) return prev;
      return [...prev, workout];
    });
  };

  const addToSaved = (workout: IWorkout) => {
    setSaved((prev) => {
      if (prev.some((w) => w.id === workout.id)) return prev;
      return [...prev, workout];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
  };

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isInSaved = (id: number) => saved.some((w) => w.id === id);

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        isInPlan,
        isInSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);