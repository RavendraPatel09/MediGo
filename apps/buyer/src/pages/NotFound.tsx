import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@medicycle/ui';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-white/20 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-white/60 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}
