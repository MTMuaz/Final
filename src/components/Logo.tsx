import React from 'react';
import { Satellite } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-pink-500/30 blur-md animate-pulse"></div>
        
        {/* Middle orbital ring */}
        <div className="absolute inset-0 w-12 h-12 border-2 border-gradient-to-r from-cyan-400/50 to-purple-500/50 rounded-full animate-spin-slow">
          <div className="w-full h-full rounded-full border-2 border-transparent bg-gradient-to-r from-cyan-400/50 to-purple-500/50 bg-clip-border"></div>
        </div>
        
        {/* Inner ring with stars */}
        <div className="absolute inset-1 w-10 h-10 border border-cyan-300/40 rounded-full animate-spin-reverse">
          {/* Small orbital dots */}
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full transform -translate-x-1/2 animate-pulse"></div>
          <div className="absolute left-0 top-1/2 w-1 h-1 bg-pink-400 rounded-full transform -translate-y-1/2 animate-pulse"></div>
          <div className="absolute right-0 top-1/2 w-1 h-1 bg-yellow-400 rounded-full transform -translate-y-1/2 animate-pulse"></div>
        </div>
        
        {/* Central space station */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-400/60 flex items-center justify-center shadow-lg shadow-cyan-400/20">
            <Satellite className="w-4 h-4 text-cyan-300 animate-pulse" />
          </div>
        </div>
        
        {/* Outer space glow effect */}
        <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        
        {/* Twinkling stars around logo */}
        <div className="absolute -top-2 -left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
        <div className="absolute -top-1 -right-3 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-2 -right-1 w-1 h-1 bg-purple-300 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-1 -left-3 w-0.5 h-0.5 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="flex flex-col">
        <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          ISS 25 Explorer
        </h1>
        <p className="text-xs text-slate-400 -mt-1">NASA Space Apps Challenge 2025</p>
      </div>
    </div>
  );
};

export default Logo;