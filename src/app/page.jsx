"use client";

import React, { useState } from 'react';
import Editor from '../components/Editor/Editor';
import Preview from '../components/Preview/Preview';
import { generateMarkdown } from '../utils/markdownGenerator';

export default function Page() {
  const [theme, setTheme] = useState('dark'); // 'dark', 'minimalist', 'glassmorphism'
  
  const [state, setState] = useState({
    name: 'Jane Doe',
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
    githubUsername: 'janedoe',
    stats: {
      showStats: true,
      theme: 'radical'
    },
    socials: {
      twitter: 'janedoe',
      linkedin: 'janedoe',
      portfolio: 'https://janedoe.dev'
    },
    blog: {
      rssUrl: 'https://janedoe.dev/rss.xml'
    }
  });

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

  return (
    <div data-theme={theme} className="flex flex-col h-screen font-sans bg-bgPrimary text-textPrimary transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="glass-panel flex justify-between items-center px-8 py-4 border-b border-borderMain rounded-none">
        <h2 className="text-2xl font-bold font-display tracking-tight text-textPrimary">ProfileForge</h2>
        <div>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)} 
            className="bg-bgPrimary border border-borderMain text-textPrimary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentPrimary transition-all cursor-pointer"
          >
            <option value="dark">Cyberpunk / Dark</option>
            <option value="minimalist">Minimalist</option>
            <option value="glassmorphism">Glassmorphism</option>
          </select>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 overflow-hidden">
        
        {/* Editor Pane */}
        <section className="flex-1 overflow-y-auto p-8 border-r border-borderMain custom-scrollbar">
          <Editor 
            state={state} 
            onChange={handleStateChange}
            onAddTech={addTech}
            onRemoveTech={removeTech}
          />
        </section>

        {/* Preview Pane */}
        <section className="flex-1 overflow-y-auto p-8 bg-panelBg custom-scrollbar">
          <Preview markdown={markdown} theme={theme} />
        </section>

      </main>
    </div>
  );
}
