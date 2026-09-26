'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { IWorkout } from '@/app/types/types';


interface PlanContextType {
  plan: IWorkout[];
  saved: IWorkout[];
  addToPlan: (workout: IWorkout) => void;
  addToSaved: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  mounted: boolean;
}


const PlanContext = createContext<PlanContextType>({
  plan: [],
  saved: [],
  addToPlan: () => {},
  addToSaved: () => {},
  removeFromPlan: () => {},
  removeFromSaved: () => {},
  isInPlan: () => false,
  isInSaved: () => false,
  mounted: false,
});

// ============================================
// Plan Provider
// ============================================
export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<IWorkout[]>([]);
  const [saved, setSaved] = useState<IWorkout[]>([]);
  const [mounted, setMounted] = useState(false);

  // 🔥 localStorage থেকে লোড (একবার, mount-এ)
  useEffect(() => {
    setMounted(true);
    try {
      const savedPlan = localStorage.getItem('fitlog_plan');
      const savedSaved = localStorage.getItem('fitlog_saved');
      if (savedPlan) setPlan(JSON.parse(savedPlan));
      if (savedSaved) setSaved(JSON.parse(savedSaved));
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // 🔥 plan পরিবর্তন হলে localStorage-এ সেভ
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('fitlog_plan', JSON.stringify(plan));
    } catch (error) {
      console.error('Error saving plan to localStorage:', error);
    }
  }, [plan, mounted]);

  // 🔥 saved পরিবর্তন হলে localStorage-এ সেভ
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('fitlog_saved', JSON.stringify(saved));
    } catch (error) {
      console.error('Error saving saved to localStorage:', error);
    }
  }, [saved, mounted]);

  // ============================================
  // Actions
  // ============================================
  const addToPlan = (workout: IWorkout) => {
    setPlan((prev) => {
      // Duplicate check
      if (prev.some((w) => w.id === workout.id)) return prev;
      // Cap of 5 (optional — requirement-এ আছে)
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

  // ============================================
  // Provider
  // ============================================
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
        mounted,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

// ============================================
// Custom Hook
// ============================================
export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};