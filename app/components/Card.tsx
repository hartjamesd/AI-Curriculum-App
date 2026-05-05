'use client';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: string;
}

export default function Card({ children, className = '', accent }: CardProps) {
  return (
    <div
      className={`rounded-xl p-5 ${className}`}
      style={{
        background: '#111827',
        border: `1px solid ${accent || '#1f2937'}`,
        boxShadow: accent ? `0 0 0 1px ${accent}22` : undefined,
      }}
    >
      {children}
    </div>
  );
}
