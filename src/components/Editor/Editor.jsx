import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, Trash2, Wand2 } from 'lucide-react';

const InputLabel = ({ children }) => (
  <label className="block text-sm font-medium text-text-secondary mb-2 mt-8 first:mt-0 uppercase tracking-widest">{children}</label>
);

const Editor = ({ state, onChange, onAddTech, onRemoveTech, onGenerate }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const [newTech, setNewTech] = useState({ name: '', color: '', logo: '' });

  const handleAddTech = () => {
    if (newTech.name && newTech.color && newTech.logo) {
      onAddTech(newTech);
      setNewTech({ name: '', color: '', logo: '' });
    }
  };

  const inputClass = "w-full p-4 rounded-xl bg-input-bg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all text-lg";

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(s => Math.min(s + 1, totalSteps));
  };
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(s => Math.max(s - 1, 1));
  };

  const StepSection = ({ current, target, children, title, subtitle }) => {
    if (current !== target) return null;
    return (
      <div className="animate-slide-up w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-3">{title}</h2>
          <p className="text-text-secondary text-lg md:text-xl">{subtitle}</p>
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="text-text-primary">
      
      {/* Progress Bar */}
      <div className="mb-12 flex gap-3 max-w-lg mx-auto">
        {[...Array(totalSteps)].map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${i + 1 <= step ? 'bg-accent-primary shadow-[0_0_15px_rgba(99,102,241,0.6)]' : 'bg-border-main'}`} />
        ))}
      </div>

      <StepSection current={step} target={1} title="The Basics" subtitle="Let's start with your introduction and what you're working on.">
        <InputLabel>What's your name?</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.name} 
          onChange={(e) => onChange(null, 'name', e.target.value)} 
          placeholder="e.g. John Doe"
        />
        
        <InputLabel>Your Title or Role</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.title} 
          onChange={(e) => onChange(null, 'title', e.target.value)} 
          placeholder="e.g. Full Stack Developer"
        />
        
        <InputLabel>A Catchy Catchphrase</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.catchphrase} 
          onChange={(e) => onChange(null, 'catchphrase', e.target.value)} 
          placeholder="e.g. Building aesthetic web experiences"
        />

        <div className="h-px bg-border-main w-full my-8"></div>

        <InputLabel>Current Focus / Working On</InputLabel>
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
      </StepSection>

      <StepSection current={step} target={2} title="Tech Arsenal" subtitle="Showcase the languages, frameworks, and tools you use.">
        <div className="mb-8 flex flex-wrap gap-3">
          {state.tech.map(t => (
            <div key={t.name} className="inline-flex items-center bg-input-bg px-4 py-2 rounded-lg shadow-sm">
              <span className="text-base font-medium">{t.name}</span>
              <Trash2 size={18} className="ml-3 cursor-pointer text-text-secondary hover:text-red-400 transition-colors" onClick={() => onRemoveTech(t.name)} />
            </div>
          ))}
          {state.tech.length === 0 && <p className="text-text-secondary italic">No tech added yet.</p>}
        </div>
        
        <div className="flex flex-col md:flex-row gap-3">
          <input type="text" placeholder="Name (e.g. React)" className={inputClass} value={newTech.name} onChange={e => setNewTech({...newTech, name: e.target.value})} />
          <input type="text" placeholder="Hex (e.g. 20232A)" className={inputClass} value={newTech.color} onChange={e => setNewTech({...newTech, color: e.target.value})} />
          <input type="text" placeholder="Logo slug (e.g. react)" className={inputClass} value={newTech.logo} onChange={e => setNewTech({...newTech, logo: e.target.value})} />
          <button onClick={handleAddTech} className="bg-accent-primary hover:bg-blue-600 text-white px-6 rounded-xl transition-colors flex-shrink-0 flex items-center justify-center">
            <Plus size={24} />
          </button>
        </div>
        <p className="text-sm text-text-secondary mt-3">Use Simple-Icons slugs for the logo (e.g., javascript, typescript, nextdotjs)</p>
      </StepSection>

      <StepSection current={step} target={3} title="Connect & Network" subtitle="Where can people find you on the web?">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          {[
            { id: 'github', label: 'GitHub Username' },
            { id: 'twitter', label: 'Twitter Username' },
            { id: 'linkedin', label: 'LinkedIn Username' },
            { id: 'portfolio', label: 'Portfolio URL' },
            { id: 'devto', label: 'Dev.to Username' },
            { id: 'medium', label: 'Medium (with @)' },
            { id: 'youtube', label: 'YouTube Channel' },
            { id: 'discord', label: 'Discord Invite Code' }
          ].map(social => (
            <div key={social.id}>
              <InputLabel>{social.label}</InputLabel>
              <input 
                type="text" 
                className={inputClass}
                value={state.socials[social.id]} 
                onChange={(e) => onChange('socials', social.id, e.target.value)} 
              />
            </div>
          ))}
        </div>

        <div className="h-px bg-border-main w-full my-10"></div>
        <h3 className="text-2xl font-bold mb-4">Support & Blog</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <div>
            <InputLabel>Buy Me A Coffee</InputLabel>
            <input 
              type="text" 
              className={inputClass}
              value={state.support?.buyMeACoffee || ''} 
              onChange={(e) => onChange('support', 'buyMeACoffee', e.target.value)} 
              placeholder="Username"
            />
          </div>
          <div>
            <InputLabel>Ko-fi</InputLabel>
            <input 
              type="text" 
              className={inputClass}
              value={state.support?.kofi || ''} 
              onChange={(e) => onChange('support', 'kofi', e.target.value)} 
              placeholder="Username"
            />
          </div>
        </div>

        <div className="mt-2">
          <InputLabel>RSS Feed URL (Blog)</InputLabel>
          <input 
            type="text" 
            className={inputClass}
            value={state.blog.rssUrl} 
            onChange={(e) => onChange('blog', 'rssUrl', e.target.value)} 
            placeholder="https://example.com/rss.xml"
          />
        </div>
      </StepSection>

      <StepSection current={step} target={4} title="Stats & Aesthetics" subtitle="Make your profile stand out with stats and visual flair.">
        
        <InputLabel>Primary GitHub Username (For Stats)</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.githubUsername} 
          onChange={(e) => onChange(null, 'githubUsername', e.target.value)} 
          placeholder="e.g. CodeWithBasu"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 p-6 bg-input-bg rounded-xl">
          <div className="flex flex-col gap-5">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded bg-bg-primary text-accent-primary focus:ring-accent-primary cursor-pointer"
                checked={state.stats?.showStats ?? true} 
                onChange={(e) => onChange('stats', 'showStats', e.target.checked)} 
              />
              <span className="text-lg font-medium group-hover:text-accent-primary transition-colors">GitHub Stats Card</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded bg-bg-primary text-accent-primary focus:ring-accent-primary cursor-pointer"
                checked={state.stats?.showStreak ?? true} 
                onChange={(e) => onChange('stats', 'showStreak', e.target.checked)} 
              />
              <span className="text-lg font-medium group-hover:text-accent-primary transition-colors">Streak Stats</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded bg-bg-primary text-accent-primary focus:ring-accent-primary cursor-pointer"
                checked={state.stats?.showTopLangs ?? true} 
                onChange={(e) => onChange('stats', 'showTopLangs', e.target.checked)} 
              />
              <span className="text-lg font-medium group-hover:text-accent-primary transition-colors">Top Languages</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded bg-bg-primary text-accent-primary focus:ring-accent-primary cursor-pointer"
                checked={state.stats?.showVisitors ?? false} 
                onChange={(e) => onChange('stats', 'showVisitors', e.target.checked)} 
              />
              <span className="text-lg font-medium group-hover:text-accent-primary transition-colors">Profile Visitors (Moe Counter)</span>
            </label>
          </div>
          
          <div className="flex flex-col gap-5">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded bg-bg-primary text-accent-primary focus:ring-accent-primary cursor-pointer"
                checked={state.stats?.showBorder ?? true} 
                onChange={(e) => onChange('stats', 'showBorder', e.target.checked)} 
              />
              <span className="text-lg text-text-secondary group-hover:text-text-primary transition-colors">Show Border</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded bg-bg-primary text-accent-primary focus:ring-accent-primary cursor-pointer"
                checked={state.stats?.lifetimeCommits ?? false} 
                onChange={(e) => onChange('stats', 'lifetimeCommits', e.target.checked)} 
              />
              <span className="text-lg text-text-secondary group-hover:text-text-primary transition-colors">Lifetime Commits</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded bg-bg-primary text-accent-primary focus:ring-accent-primary cursor-pointer"
                checked={state.stats?.privateCommits ?? false} 
                onChange={(e) => onChange('stats', 'privateCommits', e.target.checked)} 
              />
              <span className="text-lg text-text-secondary group-hover:text-text-primary transition-colors">Private Commits</span>
            </label>
          </div>
        </div>
        
        <div className="mt-8">
          <InputLabel>Stats Theme</InputLabel>
          <select className={`${inputClass} cursor-pointer`} value={state.stats?.theme || 'radical'} onChange={(e) => onChange('stats', 'theme', e.target.value)}>
            <option className="bg-bg-primary text-text-primary" value="radical">Radical</option>
            <option className="bg-bg-primary text-text-primary" value="dracula">Dracula</option>
            <option className="bg-bg-primary text-text-primary" value="dark">Dark</option>
            <option className="bg-bg-primary text-text-primary" value="tokyonight">Tokyo Night</option>
            <option className="bg-bg-primary text-text-primary" value="transparent">Transparent</option>
          </select>
        </div>

        <div className="h-px bg-border-main w-full my-10"></div>
        
        <InputLabel>Top Banner Image URL</InputLabel>
        <input 
          type="text" 
          className={inputClass}
          value={state.aesthetics?.topBanner || ''} 
          onChange={(e) => onChange('aesthetics', 'topBanner', e.target.value)} 
          placeholder="https://example.com/banner.png"
        />
        
        <div className="mt-8">
          <InputLabel>Fun Footer GIF</InputLabel>
          <select 
            className={`${inputClass} cursor-pointer`} 
            value={state.aesthetics?.bottomGif || 'none'} 
            onChange={(e) => onChange('aesthetics', 'bottomGif', e.target.value)}
          >
            <option className="bg-bg-primary text-text-primary" value="none">None</option>
            <option className="bg-bg-primary text-text-primary" value="typingCat">Typing Cat</option>
            <option className="bg-bg-primary text-text-primary" value="coffeeDev">Coffee Desk Developer</option>
            <option className="bg-bg-primary text-text-primary" value="matrix">Matrix Hacker</option>
            <option className="bg-bg-primary text-text-primary" value="codingAnime">Coding Anime Girl</option>
          </select>
        </div>

      </StepSection>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-border-main">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'bg-input-bg hover:bg-hover-bg'}`}
        >
          <ChevronLeft className="mr-2" size={20} /> Back
        </button>

        {step < totalSteps ? (
          <button 
            onClick={nextStep}
            className="flex items-center px-8 py-3 rounded-xl font-semibold bg-accent-primary hover:bg-blue-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all transform hover:scale-105"
          >
            Continue <ChevronRight className="ml-2" size={20} />
          </button>
        ) : (
          <button 
            onClick={onGenerate}
            className="flex items-center px-10 py-4 rounded-xl font-bold bg-gradient-to-r from-accent-primary to-purple-600 text-white shadow-[0_0_30px_rgba(99,102,241,0.6)] transition-all transform hover:scale-105 text-lg border border-white/20"
          >
            <Wand2 className="mr-3" size={24} /> Generate README
          </button>
        )}
      </div>

    </div>
  );
};

export default Editor;
