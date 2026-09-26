import React from 'react';
import Image from 'next/image';
import logo from '@/app/assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 px-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left: Logo + Brand */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="FITLOG Logo" width={28} height={28} />
          <span className="text-lime-400 font-black text-lg tracking-widest">
            FITLOG
          </span>
        </div>

        {/* Right: Copyright */}
        <p className="text-neutral-500 text-xs text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;