import { useMemo } from 'react';

function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      size: Math.random() > 0.8 ? '3px' : Math.random() > 0.5 ? '2px' : '1px',
      opacity: 0.3 + Math.random() * 0.7
    }));
  }, []);

  return (
    <div className="stars">
      {stars.map(star => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animationDelay: star.animationDelay,
            opacity: star.opacity
          }}
        />
      ))}
      {/* Nebula effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl" />
    </div>
  );
}

export default StarBackground;
