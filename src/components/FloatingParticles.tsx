import { useMemo } from 'react';

export default function FloatingParticles({ count = 6 }: { count?: number }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 4 + Math.random() * 8,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
    })), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="floating-particle bg-primary"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
