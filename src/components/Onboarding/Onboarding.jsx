import React, { useState } from 'react';

const Onboarding = ({ onComplete }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onComplete(username.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#17181C] overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Column - Content */}
        <div className="flex-1 w-full max-w-xl flex flex-col justify-center animate-fade-in-up">
          <h1 className="text-[4rem] md:text-[5.5rem] leading-[1.1] font-semibold text-[#a2f0ca] tracking-tight mb-16">
            Best Profile<br />Generator
          </h1>
          
          <form onSubmit={handleSubmit} className="w-full relative mb-12 group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your GitHub Username"
              className="w-full bg-transparent border-b border-[#3b3d46] text-[#a2f0ca] placeholder-[#5e6270] pb-3 text-xl focus:outline-none focus:border-[#a2f0ca] transition-colors"
              autoFocus
            />
            <button
              type="submit"
              disabled={!username.trim()}
              className="absolute right-0 bottom-3 text-[#a2f0ca] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-2xl leading-none flex items-center justify-center"
            >
              &#8594;
            </button>
          </form>

          <p className="text-[#5e6270] text-3xl md:text-4xl font-semibold">
            Create <span className="text-[#e6c875] border-b-[3px] border-dashed border-[#e6c875] pb-1">Interactive</span> Profile
          </p>
        </div>

        {/* Right Column - Illustration */}
        <div className="flex-1 w-full flex justify-center md:justify-end animate-fade-in">
          <img 
            src="/hero-illustration-transparent.png" 
            alt="Developer Illustration" 
            className="w-full max-w-[600px] object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
