'use client'

interface SeedOfLifeProps {
  className?: string;
  size?: number;
  color?: string;
}

const SeedOfLife = ({ className = "", size = 80, color = "#daa520" }: SeedOfLifeProps) => {
  const r = size * 0.2; // radius of each circle
  const cx = size / 2;
  const cy = size / 2;

  // Calculate the 6 outer circle positions (60 degrees apart)
  const outerCircles = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 90) * (Math.PI / 180);
    outerCircles.push({
      cx: cx + r * Math.cos(angle),
      cy: cy + r * Math.sin(angle),
    });
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`spin-slow ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 10px rgba(218, 165, 32, 0.5))' }}
    >
      {/* Center circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={color}
        strokeWidth="1.5"
        opacity="0.9"
      />

      {/* 6 outer circles forming the Seed of Life pattern */}
      {outerCircles.map((circle, i) => (
        <circle
          key={i}
          cx={circle.cx}
          cy={circle.cy}
          r={r}
          stroke={color}
          strokeWidth="1.5"
          opacity="0.9"
        />
      ))}
    </svg>
  );
};

export default SeedOfLife;
