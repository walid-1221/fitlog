'use client';

import React from 'react';
import Link from 'next/link';
import { usePlan } from '@/app/context/PlanContext';

const NavCounts = () => {
  const { plan, saved } = usePlan();

  return (
    <div className="navbar-end gap-2">

      {/* Plan Count */}
      <Link
        href="/my-plan"
        className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-full border border-neutral-800 transition"
      >
        <span className="text-white text-xs font-semibold">Plan</span>
        <span
          suppressHydrationWarning
          className="bg-lime-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
        >
          {plan.length}
        </span>
      </Link>

      {/* Saved Count */}
      <Link
        href="/my-plan"
        className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-full border border-neutral-800 transition"
      >
        <span className="text-white text-xs font-semibold">Saved</span>
        <span
          suppressHydrationWarning
          className="bg-lime-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full"
        >
          {saved.length}
        </span>
      </Link>

    </div>
  );
};

export default NavCounts;