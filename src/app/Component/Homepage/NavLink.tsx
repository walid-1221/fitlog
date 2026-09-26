'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`font-semibold text-sm transition-colors ${
        isActive
          ? 'text-lime-400 border-b-2 border-lime-400 pb-1'
          : 'text-white hover:text-lime-400'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;