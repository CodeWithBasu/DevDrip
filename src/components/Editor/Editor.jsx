import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2 } from 'lucide-react';

const Accordion = ({ title, defaultOpen, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'hidden' }} className="glass-panel">
      <div 
        style={{ padding: '1rem', display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.1)' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        <h3 style={{ marginLeft: '0.5rem', margin: 0 }}>{title}</h3>
      </div>
      {isOpen && (
        <div style={{ padding: '1rem' }} className="animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

const Editor = ({ state, onChange, onAddTech, onRemoveTech }) => {
  const [newTech, setNewTech] = useState({ name: '', color: '', logo: '' });

  const handleAddTech = () => {
    if (newTech.name && newTech.color && newTech.logo) {
      onAddTech(newTech);
      setNewTech({ name: '', color: '', logo: '' });
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Customize Profile</h2>

      <Accordion title="Introduction" defaultOpen={true}>
        <label>Name</label>
        <input 
          type="text" 
          value={state.name} 
          onChange={(e) => onChange(null, 'name', e.target.value)} 
          placeholder="e.g. John Doe"
        />
        
        <label>Title / Role</label>
        <input 
          type="text" 
          value={state.title} 
          onChange={(e) => onChange(null, 'title', e.target.value)} 
          placeholder="e.g. Full Stack Developer"
        />
        
        <label>Catchphrase</label>
        <input 
          type="text" 
          value={state.catchphrase} 
          onChange={(e) => onChange(null, 'catchphrase', e.target.value)} 
          placeholder="e.g. Building awesome web apps"
        />
      </Accordion>

      <Accordion title="About Me" defaultOpen={false}>
        <label>Current Focus</label>
        <input 
          type="text" 
          value={state.about.currentFocus} 
          onChange={(e) => onChange('about', 'currentFocus', e.target.value)} 
        />
        
        <label>Currently Learning</label>
        <input 
          type="text" 
          value={state.about.learning} 
          onChange={(e) => onChange('about', 'learning', e.target.value)} 
        />
        
        <label>Ask me about</label>
        <input 
          type="text" 
          value={state.about.askMe} 
          onChange={(e) => onChange('about', 'askMe', e.target.value)} 
        />
        
        <label>Fun Fact</label>
        <input 
          type="text" 
          value={state.about.funFact} 
          onChange={(e) => onChange('about', 'funFact', e.target.value)} 
        />
      </Accordion>

      <Accordion title="Tech Stack" defaultOpen={false}>
        <div style={{ marginBottom: '1rem' }}>
          {state.tech.map(t => (
            <div key={t.name} style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px', marginRight: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem' }}>{t.name}</span>
              <Trash2 size={14} style={{ marginLeft: '0.5rem', cursor: 'pointer', color: 'var(--accent-primary)' }} onClick={() => onRemoveTech(t.name)} />
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="text" placeholder="Name (e.g. React)" value={newTech.name} onChange={e => setNewTech({...newTech, name: e.target.value})} style={{ marginBottom: 0 }} />
          <input type="text" placeholder="Hex Color (e.g. 20232A)" value={newTech.color} onChange={e => setNewTech({...newTech, color: e.target.value})} style={{ marginBottom: 0 }} />
          <input type="text" placeholder="Logo slug (e.g. react)" value={newTech.logo} onChange={e => setNewTech({...newTech, logo: e.target.value})} style={{ marginBottom: 0 }} />
          <button onClick={handleAddTech} style={{ background: 'var(--accent-primary)', color: 'white', padding: '0.5rem', borderRadius: '8px' }}>
            <Plus size={20} />
          </button>
        </div>
        <small style={{ color: 'var(--text-secondary)' }}>Use Simple-Icons slugs (e.g., javascript, react, python)</small>
      </Accordion>

      <Accordion title="GitHub Stats" defaultOpen={false}>
        <label>GitHub Username</label>
        <input 
          type="text" 
          value={state.githubUsername} 
          onChange={(e) => onChange(null, 'githubUsername', e.target.value)} 
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <input 
            type="checkbox" 
            checked={state.stats.showStats} 
            onChange={(e) => onChange('stats', 'showStats', e.target.checked)} 
            style={{ width: 'auto', marginBottom: 0 }}
          />
          <span>Show GitHub Stats Card</span>
        </div>
        
        <label>Stats Theme</label>
        <select value={state.stats.theme} onChange={(e) => onChange('stats', 'theme', e.target.value)}>
          <option value="radical">Radical</option>
          <option value="dracula">Dracula</option>
          <option value="dark">Dark</option>
          <option value="tokyonight">Tokyo Night</option>
          <option value="transparent">Transparent</option>
        </select>
      </Accordion>

      <Accordion title="Social Links" defaultOpen={false}>
        <label>Twitter Username</label>
        <input 
          type="text" 
          value={state.socials.twitter} 
          onChange={(e) => onChange('socials', 'twitter', e.target.value)} 
        />
        
        <label>LinkedIn Username</label>
        <input 
          type="text" 
          value={state.socials.linkedin} 
          onChange={(e) => onChange('socials', 'linkedin', e.target.value)} 
        />
        
        <label>Portfolio URL</label>
        <input 
          type="text" 
          value={state.socials.portfolio} 
          onChange={(e) => onChange('socials', 'portfolio', e.target.value)} 
        />
      </Accordion>

      <Accordion title="Blog (RSS)" defaultOpen={false}>
        <label>RSS Feed URL</label>
        <input 
          type="text" 
          value={state.blog.rssUrl} 
          onChange={(e) => onChange('blog', 'rssUrl', e.target.value)} 
        />
        <small style={{ color: 'var(--text-secondary)' }}>Adds the GitHub Action tags for dynamic blog posts</small>
      </Accordion>

    </div>
  );
};

export default Editor;
