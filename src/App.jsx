import React, { useState } from 'react';
import Editor from './components/Editor/Editor';
import Preview from './components/Preview/Preview';
import { generateMarkdown } from './utils/markdownGenerator';

function App() {
  const [theme, setTheme] = useState('dark'); // 'dark', 'minimalist', 'glassmorphism'
  
  const [state, setState] = useState({
    name: 'Jane Doe',
    title: 'Full Stack Developer',
    catchphrase: 'Building aesthetic web experiences',
    about: {
      currentFocus: 'React & Vite',
      learning: 'Three.js & WebGL',
      askMe: 'Frontend Architecture',
      funFact: 'I love coffee and debugging'
    },
    tech: [
      { name: 'React', color: '20232A', logo: 'react' },
      { name: 'Vite', color: '646CFF', logo: 'vite' },
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
    <div data-theme={theme} style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      
      {/* Navbar */}
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="glass-panel">
        <h2>ProfileForge</h2>
        <div>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{ width: 'auto', marginBottom: 0 }}>
            <option value="dark">Cyberpunk / Dark</option>
            <option value="minimalist">Minimalist</option>
            <option value="glassmorphism">Glassmorphism</option>
          </select>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Editor Pane */}
        <section style={{ flex: 1, overflowY: 'auto', padding: '2rem', borderRight: '1px solid var(--border-color)' }}>
          <Editor 
            state={state} 
            onChange={handleStateChange}
            onAddTech={addTech}
            onRemoveTech={removeTech}
          />
        </section>

        {/* Preview Pane */}
        <section style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: 'var(--panel-bg)' }}>
          <Preview markdown={markdown} />
        </section>

      </main>
    </div>
  );
}

export default App;
