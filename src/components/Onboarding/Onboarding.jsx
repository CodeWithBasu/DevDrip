import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [username, setUsername] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onComplete(username.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent-primary/20 blur-[100px] mix-blend-screen animate-blob" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/20 blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
      
      <div className="relative w-full max-w-md">
        {/* Glassmorphism Card */}
        <div className="glass-panel p-10 flex flex-col items-center text-center transform transition-all duration-500 hover:scale-[1.02]">
          
          <div className="mb-8 relative">
            <div className="absolute inset-0 bg-accent-primary/20 blur-2xl rounded-full" />
            <div className="relative bg-panel-bg p-4 rounded-2xl border border-border-main shadow-2xl flex items-center justify-center w-20 h-20">
              <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold font-display mb-3 text-text-primary tracking-tight">
            Welcome to DevDrip
          </h1>
          <p className="text-text-secondary mb-8 text-lg">
            Enter your GitHub username to automatically build your ultimate developer README.
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative mb-6 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-text-secondary font-mono">@</span>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="torvalds"
                className="w-full p-4 pl-10 bg-input-bg border-2 border-border-main rounded-xl text-text-primary placeholder-text-secondary/50 focus:outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-primary/20 transition-all text-lg font-medium"
                autoFocus
              />
            </div>

            <button
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={!username.trim()}
              className="group relative w-full flex items-center justify-center gap-2 bg-accent-primary text-white p-4 rounded-xl font-bold text-lg transition-all hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                Start Building
                <ArrowRight 
                  size={20} 
                  className={`transition-transform duration-300 ${isHovered && username.trim() ? 'translate-x-1' : ''}`} 
                />
              </span>
            </button>
          </form>
        </div>
        
        {/* Helper Text */}
        <p className="text-center text-text-secondary/60 text-sm mt-6 font-medium">
          We use this to fetch your open source stats and top languages.
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
