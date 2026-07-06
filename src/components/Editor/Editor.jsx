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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { id: 'github', label: 'GitHub Username', logo: 'github', color: '181717' },
            { id: 'twitter', label: 'Twitter Username', logo: 'x', color: '000000' },
            { id: 'devto', label: 'Dev.to Username', logo: 'devdotto', color: '0A0A0A' },
            { id: 'codepen', label: 'CodePen Username', logo: 'codepen', color: '000000' },
            { id: 'codesandbox', label: 'CodeSandbox Username', logo: 'codesandbox', color: '151515' },
            { id: 'stackoverflow', label: 'StackOverflow User ID', logo: 'stackoverflow', color: 'F58025' },
            { id: 'linkedin', label: 'LinkedIn Username', logo: 'linkedin', color: '0077B5' },
            { id: 'kaggle', label: 'Kaggle Username', logo: 'kaggle', color: '20BEFF' },
            { id: 'facebook', label: 'Facebook Username', logo: 'facebook', color: '1877F2' },
            { id: 'instagram', label: 'Instagram Username', logo: 'instagram', color: 'E4405F' },
            { id: 'dribbble', label: 'Dribbble Username', logo: 'dribbble', color: 'EA4C89' },
            { id: 'behance', label: 'Behance Username', logo: 'behance', color: '1769FF' },
            { id: 'hashnode', label: 'Hashnode (with @)', logo: 'hashnode', color: '2962FF' },
            { id: 'medium', label: 'Medium (with @)', logo: 'medium', color: '12100E' },
            { id: 'youtube', label: 'YouTube Channel', logo: 'youtube', color: 'FF0000' },
            { id: 'codechef', label: 'CodeChef Username', logo: 'codechef', color: '5B4638' },
            { id: 'hackerrank', label: 'HackerRank Username', logo: 'hackerrank', color: '00EA64' },
            { id: 'codeforces', label: 'Codeforces Username', logo: 'codeforces', color: '1F8ACB' },
            { id: 'leetcode', label: 'LeetCode Username', logo: 'leetcode', color: 'FFA116' },
            { id: 'hackerearth', label: 'HackerEarth (with @)', logo: 'hackerearth', color: '2C3454' },
            { id: 'geeksforgeeks', label: 'GFG Profile', logo: 'geeksforgeeks', color: '2F8D46' },
            { id: 'discord', label: 'Discord Invite Code', logo: 'discord', color: '5865F2' },
            { id: 'portfolio', label: 'Portfolio URL', logo: 'globe', color: '2563EB' }
          ].map(social => (
            <div key={social.id}>
              <div className="flex items-center gap-2 mb-1 mt-3 first:mt-0">
                <img 
                  src={['linkedin', 'codepen'].includes(social.logo) ? `/icons/${social.logo}.svg` : `https://cdn.simpleicons.org/${social.logo}/${social.color}`} 
                  alt={social.label} 
                  className="w-4 h-4 object-contain opacity-80 social-logo"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <label className="block text-sm font-medium text-text-secondary">{social.label}</label>
              </div>
              <input 
                type="text" 
                className={inputClass}
                value={state.socials[social.id]} 
                onChange={(e) => onChange('socials', social.id, e.target.value)} 
              />
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion title="Support" defaultOpen={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center mb-2 mt-3 first:mt-0">
              <img 
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" 
                alt="Buy Me A Coffee" 
                className="h-10"
              />
            </div>
            <input 
              type="text" 
              className={inputClass}
              value={state.support?.buyMeACoffee || ''} 
              onChange={(e) => onChange('support', 'buyMeACoffee', e.target.value)} 
              placeholder="buymeacoffee username"
            />
          </div>
          <div>
            <div className="flex items-center mb-2 mt-3 first:mt-0">
              <img 
                src="https://storage.ko-fi.com/cdn/brandasset/v2/support_me_on_kofi_dark.png" 
                alt="Ko-fi" 
                className="h-10"
              />
            </div>
            <input 
              type="text" 
              className={inputClass}
              value={state.support?.kofi || ''} 
              onChange={(e) => onChange('support', 'kofi', e.target.value)} 
              placeholder="Ko-fi username"
            />
          </div>
        </div>
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
