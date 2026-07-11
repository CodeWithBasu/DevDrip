"use client";

import React, { useState } from 'react';
import Editor from '../components/Editor/Editor';
import Preview from '../components/Preview/Preview';
import Onboarding from '../components/Onboarding/Onboarding';
import { generateMarkdown } from '../utils/markdownGenerator';

export default function Page() {
  const [theme, setTheme] = useState('dark'); // 'dark', 'minimalist', 'glassmorphism'
  
  const [isOnboarded, setIsOnboarded] = useState(false);
  
  const [state, setState] = useState({
    name: '',
    title: 'Full Stack Developer',
    catchphrase: 'Building aesthetic web experiences',
    about: {
      currentFocus: 'React & Next.js',
      learning: 'Tailwind CSS',
      askMe: 'Frontend Architecture',
      funFact: 'I love coffee and debugging'
    },
    tech: [
      { name: 'React', color: '20232A', logo: 'react' },
      { name: 'Next.js', color: '000000', logo: 'nextdotjs' },
      { name: 'JavaScript', color: 'F7DF1E', logo: 'javascript' }
    ],
    githubUsername: '',
    stats: {
      showStats: true,
      showStreak: true,
      showTopLangs: true,
      showVisitors: false,
      showBorder: true,
      lifetimeCommits: false,
      privateCommits: false,
      theme: 'radical',
      customHostUrl: ''
    },
    socials: {
      github: '',
      twitter: '',
      devto: '',
      codepen: '',
      codesandbox: '',
      stackoverflow: '',
      linkedin: '',
      kaggle: '',
      facebook: '',
      instagram: '',
      dribbble: '',
      behance: '',
      hashnode: '',
      medium: '',
      youtube: '',
      codechef: '',
      hackerrank: '',
      codeforces: '',
      leetcode: '',
      hackerearth: '',
      geeksforgeeks: '',
      discord: '',
      portfolio: 'https://janedoe.dev'
    },
    blog: {
      rssUrl: 'https://janedoe.dev/rss.xml'
    },
    support: {
      buyMeACoffee: '',
      kofi: ''
    },
    aesthetics: {
      topBanner: '',
      bottomGif: 'none'
    }
  });

  const [appState, setAppState] = useState('onboarding'); // 'onboarding', 'editor', 'result'

  const handleStateChange = (section, field, value) => {
    if (section) {
      setState(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setState(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addTech = (tech) => {
    setState(prev => ({
      ...prev,
      tech: [...prev.tech, tech]
    }));
  };

  const removeTech = (techName) => {
    setState(prev => ({
      ...prev,
      tech: prev.tech.filter(t => t.name !== techName)
    }));
  };

  const markdown = generateMarkdown(state);

  const handleOnboardingComplete = (username) => {
    setState(prev => ({
      ...prev,
      name: username,
      githubUsername: username,
      socials: {
        ...prev.socials,
        github: username,
        twitter: username, // Optional: assume twitter is same
        linkedin: username
      }
    }));
    setAppState('editor');
  };

  const handleGenerate = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAppState('result');
  };

  const handleGoBack = () => {
    setAppState('editor');
  };

  return (
    <div data-theme={theme} className="flex flex-col min-h-screen font-sans bg-bg-primary text-text-primary transition-colors duration-300 relative overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="glass-panel sticky top-0 z-50 flex justify-between items-center px-8 py-4 rounded-none backdrop-blur-xl">
        <h2 
          className="text-2xl font-bold font-display tracking-tight text-text-primary cursor-pointer hover:text-accent-primary transition-colors" 
          onClick={() => appState !== 'onboarding' && setAppState('editor')}
        >
          DevDrip
        </h2>
        <div>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)} 
            className="bg-bg-primary border border-border-main text-text-primary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all cursor-pointer"
          >
            <option className="bg-bg-primary text-text-primary" value="dark">Cyberpunk / Dark</option>
            <option className="bg-bg-primary text-text-primary" value="minimalist">Minimalist</option>
            <option className="bg-bg-primary text-text-primary" value="glassmorphism">Glassmorphism</option>
          </select>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        
        {appState === 'onboarding' && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}

        {appState === 'editor' && (
          <section className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in pb-32">
            <Editor 
              state={state} 
              onChange={handleStateChange}
              onAddTech={addTech}
              onRemoveTech={removeTech}
              onGenerate={handleGenerate}
            />
          </section>
        )}

        {appState === 'result' && (
          <section className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 animate-fade-in flex flex-col">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 shrink-0">
              <div>
                <h1 className="text-4xl font-display font-bold mb-2">Your README is ready! ✨</h1>
                <p className="text-text-secondary">Preview it below or grab the raw code for your repository.</p>
              </div>
              <button 
                onClick={handleGoBack}
                className="px-6 py-2.5 rounded-lg border border-border-main text-text-secondary hover:text-text-primary hover:border-accent-primary transition-all font-medium flex items-center gap-2 shrink-0"
              >
                ← Back to Edit
              </button>
            </div>
            
            <div className="flex-1 min-h-[600px] mb-8">
              <Preview markdown={markdown} theme={theme} />
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
