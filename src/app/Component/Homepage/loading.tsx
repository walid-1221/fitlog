export default function Loading() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="inline-block w-12 h-12 border-4 border-neutral-800 border-t-lime-400 rounded-full animate-spin mb-6"></div>

        <p className="text-lime-400 font-bold uppercase tracking-widest text-sm">
          Loading workouts…
        </p>
      </div>
    </div>
  );
}