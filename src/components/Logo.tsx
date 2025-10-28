import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="url(#logoGradient)"
          stroke="#1E40AF"
          strokeWidth="2"
        />
        
        {/* DB Letters */}
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          DB
        </text>
      </svg>
    </div>
  );
};

export default Logo;

