import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';

const Accordion = ({ title, defaultOpen, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="glass-panel mb-4 overflow-hidden">
      <div 
        className="p-4 flex items-center cursor-pointer hover:bg-hover-bg transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={20} className="text-text-primary" /> : <ChevronRight size={20} className="text-text-primary" />}
        <h3 className="ml-2 m-0 text-lg font-semibold text-text-primary">{title}</h3>
      </div>
      {isOpen && (
        <div className="p-4 animate-fade-in border-t border-border-main">
          {children}
        </div>
      )}
    </div>
  );
};

const InputLabel = ({ children }) => (
  <label className="block text-sm font-medium text-text-secondary mb-1 mt-3 first:mt-0">{children}</label>
);

const Editor = ({ state, onChange, onAddTech, onRemoveTech }) => {
  const [newTech, setNewTech] = useState({ name: '', color: '', logo: '' });

  const handleAddTech = () => {
    if (newTech.name && newTech.color && newTech.logo) {
      onAddTech(newTech);
      setNewTech({ name: '', color: '', logo: '' });
    }
  };

  const inputClass = "w-full p-3 rounded-lg bg-input-bg border border-border-main text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all";

  return (
    <div className="text-text-primary">
      <h2 className="text-2xl font-bold mb-6 font-display">Customize Profile</h2>

      <Accordion title="Introduction" defaultOpen={true}>
        <InputLabel>Name</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.name} 
          onChange={(e) => onChange(null, 'name', e.target.value)} 
          placeholder="e.g. John Doe"
        />
        
        <InputLabel>Title / Role</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.title} 
          onChange={(e) => onChange(null, 'title', e.target.value)} 
          placeholder="e.g. Full Stack Developer"
        />
        
        <InputLabel>Catchphrase</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.catchphrase} 
          onChange={(e) => onChange(null, 'catchphrase', e.target.value)} 
          placeholder="e.g. Building awesome web apps"
        />
      </Accordion>

      <Accordion title="About Me" defaultOpen={false}>
        <InputLabel>Current Focus</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.about.currentFocus} 
          onChange={(e) => onChange('about', 'currentFocus', e.target.value)} 
        />
        
        <InputLabel>Currently Learning</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.about.learning} 
          onChange={(e) => onChange('about', 'learning', e.target.value)} 
        />
        
        <InputLabel>Ask me about</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.about.askMe} 
          onChange={(e) => onChange('about', 'askMe', e.target.value)} 
        />
        
        <InputLabel>Fun Fact</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.about.funFact} 
          onChange={(e) => onChange('about', 'funFact', e.target.value)} 
        />
      </Accordion>

      <Accordion title="Tech Stack" defaultOpen={false}>
        <div className="mb-4 flex flex-wrap gap-2">
          {state.tech.map(t => (
            <div key={t.name} className="inline-flex items-center bg-input-bg px-3 py-1.5 rounded-md">
              <span className="text-sm font-medium">{t.name}</span>
              <Trash2 size={16} className="ml-2 cursor-pointer text-accent-primary hover:text-red-400 transition-colors" onClick={() => onRemoveTech(t.name)} />
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mb-2">
          <input type="text" placeholder="Name (e.g. React)" className={inputClass} value={newTech.name} onChange={e => setNewTech({...newTech, name: e.target.value})} />
          <input type="text" placeholder="Hex (e.g. 20232A)" className={inputClass} value={newTech.color} onChange={e => setNewTech({...newTech, color: e.target.value})} />
          <input type="text" placeholder="Logo slug" className={inputClass} value={newTech.logo} onChange={e => setNewTech({...newTech, logo: e.target.value})} />
          <button onClick={handleAddTech} className="bg-accent-primary hover:bg-blue-600 text-white p-3 rounded-lg transition-colors flex-shrink-0">
            <Plus size={20} />
          </button>
        </div>
        <p className="text-xs text-text-secondary">Use Simple-Icons slugs (e.g., javascript, react, python)</p>
      </Accordion>

      <Accordion title="GitHub Stats" defaultOpen={false}>
        <InputLabel>GitHub Username</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.githubUsername} 
          onChange={(e) => onChange(null, 'githubUsername', e.target.value)} 
        />
        
        <div className="flex items-center gap-2 mb-4 mt-2">
          <input 
            type="checkbox" 
            className="w-4 h-4 rounded bg-input-bg border-border-main text-accent-primary focus:ring-accent-primary"
            checked={state.stats.showStats} 
            onChange={(e) => onChange('stats', 'showStats', e.target.checked)} 
          />
          <span className="text-sm font-medium">Show GitHub Stats Card</span>
        </div>
        
        <InputLabel>Stats Theme</InputLabel>
        <select className={inputClass} value={state.stats.theme} onChange={(e) => onChange('stats', 'theme', e.target.value)}>
          <option value="radical">Radical</option>
          <option value="dracula">Dracula</option>
          <option value="dark">Dark</option>
          <option value="tokyonight">Tokyo Night</option>
          <option value="transparent">Transparent</option>
        </select>
      </Accordion>

      <Accordion title="Social Links" defaultOpen={false}>
        <InputLabel>Twitter Username</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.socials.twitter} 
          onChange={(e) => onChange('socials', 'twitter', e.target.value)} 
        />
        
        <InputLabel>LinkedIn Username</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.socials.linkedin} 
          onChange={(e) => onChange('socials', 'linkedin', e.target.value)} 
        />
        
        <InputLabel>Portfolio URL</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.socials.portfolio} 
          onChange={(e) => onChange('socials', 'portfolio', e.target.value)} 
        />
      </Accordion>

      <Accordion title="Blog (RSS)" defaultOpen={false}>
        <InputLabel>RSS Feed URL</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.blog.rssUrl} 
          onChange={(e) => onChange('blog', 'rssUrl', e.target.value)} 
        />
        <p className="text-xs text-text-secondary mt-2">Adds the GitHub Action tags for dynamic blog posts</p>
      </Accordion>

    </div>
  );
};

export default Editor;
