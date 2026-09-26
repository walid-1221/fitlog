import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.png';
import NavCounts from './NavCounts';
import NavLink from './NavLink';

const Navbar = () => {
  return (
    <nav className="bg-neutral-950 border-b border-neutral-800 sticky top-0 z-50">
      <div className="container mx-auto navbar px-4">

        {/* navbar-start */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-neutral-900 rounded-box z-50 mt-3 w-52 p-2 shadow-lg border border-neutral-800"
            >
              <li>
                <NavLink href="/workout">Workout</NavLink>
              </li>
              <li>
                <NavLink href="/my-plan">My Plan</NavLink>
              </li>
            </ul>
          </div>

          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="FITLOG Logo" width={32} height={32} />
            <span className="text-lime-400 font-black text-xl tracking-widest">
              FITLOG
            </span>
          </Link>
        </div>

        {/* navbar-center — Desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            <li>
              <NavLink href="/workout">Workout</NavLink>
            </li>
            <li>
              <NavLink href="/my-plan">My Plan</NavLink>
            </li>
          </ul>
        </div>

        {/* navbar-end — Client Component */}
        <NavCounts />
      </div>
    </nav>
  );
};

export default Navbar;