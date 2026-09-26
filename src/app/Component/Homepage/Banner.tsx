import Image from 'next/image';
import React from 'react';
import logo from '@/app/assets/banner.png';

const Banner = () => {
  return (
    <section className="relative bg-neutral-950 text-white py-20 md:py-28 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-lime-400/10 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            <span className="inline-block text-lime-400 text-sm font-semibold tracking-[0.3em] uppercase">
              Workout Library
            </span>

            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              TRAIN WITH INTENT.
              <br />
              <span className="text-lime-400">LOG EVERY SET.</span>
            </h1>

            <p className="text-neutral-400 text-base md:text-lg max-w-md">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* ✅ Anchor Link — Library section-এ scroll করবে */}
              <a
                href="#library"
                className="bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                <span>🏋️</span>
                BROWSE WORKOUTS
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-lime-400/20 blur-2xl rounded-full"></div>
            <Image
              src={logo}
              alt="Workout Banner"
              width={500}
              height={500}
              className="relative rounded-2xl object-cover shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;