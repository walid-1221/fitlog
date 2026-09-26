import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-lime-400 text-8xl md:text-9xl font-black mb-4">
          404
        </h1>
        <h2 className="text-white text-2xl md:text-3xl font-bold uppercase mb-3">
          Page Not Found
        </h2>
        <p className="text-neutral-500 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-lime-400 hover:bg-lime-300 text-black font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105"
        >
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
}