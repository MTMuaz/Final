import React from 'react';

interface AnimatedLogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ size = 'medium', showText = true }) => {
  const sizeClasses = {
    small: 'w-12 h-12',
    medium: 'w-24 h-24',
    large: 'w-40 h-40'
  };

  const textSizeClasses = {
    small: 'text-base',
    medium: 'text-xl',
    large: 'text-3xl'
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full flex items-center justify-center relative group animate-logo-glow`}
          style={{
            animation: 'logo-pulse 3s ease-in-out infinite, logo-rotate 20s linear infinite'
          }}
        >
          <img
            src="/image.png"
            alt="Team Explorer BD / ISS Explorer logo"
            className="w-full h-full object-contain rounded-full"
            loading="eager"
          />

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, transparent 40%, rgba(6, 182, 212, 0.1) 70%, rgba(168, 85, 247, 0.1) 100%)',
              filter: 'blur(8px)',
              animation: 'logo-pulse 3s ease-in-out infinite'
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent`}>
            ISS 25 Explorer
          </h1>
          <p className="text-xs text-slate-400 -mt-1">Team Explorer BD</p>
        </div>
      )}

      <style>{`
        @keyframes logo-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.4)) drop-shadow(0 0 16px rgba(168, 85, 247, 0.2));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.6)) drop-shadow(0 0 24px rgba(168, 85, 247, 0.3));
            transform: scale(1.02);
          }
        }

        @keyframes logo-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-logo-glow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
