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
      showStreak: true,
      showTopLangs: true,
      showBorder: true,
      lifetimeCommits: false,
      privateCommits: false,
      theme: 'radical'
    },
    socials: {
      github: 'janedoe',
      twitter: 'janedoe',
      devto: '',
      codepen: '',
      codesandbox: '',
      stackoverflow: '',
      linkedin: 'janedoe',
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
    }
  });

  const [editorWidth, setEditorWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = React.useRef(null);

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

  React.useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth >= 20 && newWidth <= 80) {
        setEditorWidth(newWidth);
      }
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const markdown = generateMarkdown(state);

  return (
    <div data-theme={theme} className="flex flex-col h-screen font-sans bg-bg-primary text-text-primary transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="glass-panel flex justify-between items-center px-8 py-4 border-b border-border-main rounded-none">
        <h2 className="text-2xl font-bold font-display tracking-tight text-text-primary">DevDrip</h2>
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
      <main ref={containerRef} className="flex flex-1 overflow-hidden" style={{ cursor: isDragging ? 'col-resize' : 'auto' }}>
        
        {/* Editor Pane */}
        <section 
          className="overflow-y-auto p-8 custom-scrollbar"
          style={{ width: `${editorWidth}%` }}
        >
          <Editor 
            state={state} 
            onChange={handleStateChange}
            onAddTech={addTech}
            onRemoveTech={removeTech}
          />
        </section>

        {/* Resizer */}
        <div 
          className="w-1.5 bg-border-main hover:bg-accent-primary cursor-col-resize flex-shrink-0 transition-colors z-10 select-none"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
        />

        {/* Preview Pane */}
        <section className="flex-1 overflow-y-auto p-8 bg-panel-bg backdrop-blur-xl custom-scrollbar">
          <Preview markdown={markdown} theme={theme} />
        </section>

      </main>
    </div>
  );
}
