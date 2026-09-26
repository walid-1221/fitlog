// ============================================
// FITLOG — TypeScript Type Definitions
// ============================================

// --------------------------------------------
// Workout Interface
// --------------------------------------------
export interface IWorkout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

// --------------------------------------------
// Plan Context Types
// --------------------------------------------
export interface PlanContextType {
  plan: IWorkout[];
  saved: IWorkout[];
  addToPlan: (workout: IWorkout) => void;
  addToSaved: (workout: IWorkout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
}

// --------------------------------------------
// Component Props Types
// --------------------------------------------
export interface LibraryCardProps {
  workout: IWorkout;
}

export interface LibrarySortProps {
  workouts: IWorkout[];
}

export interface PlanButtonsProps {
  workout: IWorkout;
}

export interface PlanCardProps {
  workout: IWorkout;
  tab: 'plan' | 'saved';
  onRemove: (id: number) => void;
}

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface StatRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

// --------------------------------------------
// Page Params Types
// --------------------------------------------
export interface WorkoutDetailsPageProps {
  params: Promise<{ id: string }>;
}

export interface RootLayoutProps {
  children: React.ReactNode;
}

// --------------------------------------------
// Sort Option Type
// --------------------------------------------
export type SortOption = 'duration' | 'calories' | 'rating';

// --------------------------------------------
// Active Tab Type
// --------------------------------------------
export type ActiveTab = 'plan' | 'saved';