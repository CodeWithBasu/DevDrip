import React from 'react';
import { Terminal, Code, Cpu, MessageSquare, Coffee, Github, Twitter, Linkedin, Globe, MapPin } from 'lucide-react';

const WebProfile = ({ state, theme }) => {
  const { name, title, catchphrase, about, tech, githubUsername, stats, socials } = state;

  // Find a custom stats host or fallback
  const getStatsHost = () => {
    if (stats.customHostUrl && stats.customHostUrl.trim() !== '') {
      let host = stats.customHostUrl.trim();
      if (host.endsWith('/')) {
        host = host.slice(0, -1);
      }
      return host + '/api';
    }
    return 'https://github-readme-stats-three-sandy-45.vercel.app/api';
  };

  const getStatsUrl = () => {
    const host = getStatsHost();
    const border = stats.showBorder ? '' : '&hide_border=true';
    const themeStr = stats.theme ? `&theme=${stats.theme}` : '&theme=radical';
    const lifetime = stats.lifetimeCommits ? '&include_all_commits=true' : '';
    const privateCom = stats.privateCommits ? '&count_private=true' : '';
    return `${host}?username=${githubUsername}&show_icons=true${border}${themeStr}${lifetime}${privateCom}`;
  };

  const getStreakUrl = () => {
    const host = getStatsHost();
    const border = stats.showBorder ? '' : '&hide_border=true';
    const themeStr = stats.theme ? `&theme=${stats.theme}` : '&theme=radical';
    return `${host}/pin/?username=${githubUsername}${border}${themeStr}`; // Using pin as streak fallback if streak is complex, but wait, usually streak is /api/pin or streak-stats. Let's use standard github-readme-streak-stats url:
    // Actually, devdrip markdownGenerator uses github-readme-streak-stats.herokuapp.com
  };

  return (
    <div className={`w-full min-h-full rounded-2xl p-6 md:p-12 overflow-y-auto ${theme === 'dark' ? 'bg-[#0d1117] text-white' : theme === 'glassmorphism' ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white' : 'bg-white text-gray-900'} transition-all duration-500`}>
      
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 text-accent-primary font-mono text-sm border border-accent-primary/20">
              <Terminal size={16} /> Hello World, I'm
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-purple-500">
              {name || 'Anonymous Developer'}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium opacity-80">
              {title || 'Software Engineer'}
            </h2>
            <p className="text-lg opacity-60 max-w-2xl">
              {catchphrase || 'Building cool things with code.'}
            </p>
            
            {/* Socials */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              {socials.github && (
                <a href={`https://github.com/${socials.github}`} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel-bg border border-border-main hover:border-accent-primary transition-all hover:-translate-y-1 group">
                  <Github className="group-hover:text-accent-primary transition-colors" />
                </a>
              )}
              {socials.twitter && (
                <a href={`https://twitter.com/${socials.twitter}`} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel-bg border border-border-main hover:border-accent-primary transition-all hover:-translate-y-1 group">
                  <Twitter className="group-hover:text-accent-primary transition-colors" />
                </a>
              )}
              {socials.linkedin && (
                <a href={`https://linkedin.com/in/${socials.linkedin}`} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel-bg border border-border-main hover:border-accent-primary transition-all hover:-translate-y-1 group">
                  <Linkedin className="group-hover:text-accent-primary transition-colors" />
                </a>
              )}
              {socials.portfolio && (
                <a href={socials.portfolio} target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-panel-bg border border-border-main hover:border-accent-primary transition-all hover:-translate-y-1 group">
                  <Globe className="group-hover:text-accent-primary transition-colors" />
                </a>
              )}
            </div>
          </div>
          
          {/* Avatar / Profile Graphic */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-gradient-to-br from-accent-primary to-purple-600 p-1 rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl shrink-0 hidden md:block">
            <div className="w-full h-full bg-panel-bg rounded-[22px] overflow-hidden flex items-center justify-center">
              <img src={`https://github.com/${githubUsername}.png?size=400`} alt={name} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>

        {/* About Me Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.currentFocus && (
            <div className="glass-panel p-6 rounded-2xl border border-border-main flex flex-col gap-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center text-accent-primary">
                <Code size={20} />
              </div>
              <h3 className="font-bold opacity-70 text-sm uppercase tracking-wider">Currently Working On</h3>
              <p className="font-medium text-lg">{about.currentFocus}</p>
            </div>
          )}
          {about.learning && (
            <div className="glass-panel p-6 rounded-2xl border border-border-main flex flex-col gap-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                <Cpu size={20} />
              </div>
              <h3 className="font-bold opacity-70 text-sm uppercase tracking-wider">Currently Learning</h3>
              <p className="font-medium text-lg">{about.learning}</p>
            </div>
          )}
          {about.askMe && (
            <div className="glass-panel p-6 rounded-2xl border border-border-main flex flex-col gap-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                <MessageSquare size={20} />
              </div>
              <h3 className="font-bold opacity-70 text-sm uppercase tracking-wider">Ask Me About</h3>
              <p className="font-medium text-lg">{about.askMe}</p>
            </div>
          )}
          {about.funFact && (
            <div className="glass-panel p-6 rounded-2xl border border-border-main flex flex-col gap-3 hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-500">
                <Coffee size={20} />
              </div>
              <h3 className="font-bold opacity-70 text-sm uppercase tracking-wider">Fun Fact</h3>
              <p className="font-medium text-lg">{about.funFact}</p>
            </div>
          )}
        </div>

        {/* Tech Stack */}
        {tech.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-accent-primary">#</span> Tech Stack
            </h3>
            <div className="flex flex-wrap gap-4">
              {tech.map((t, i) => (
                <div key={i} className="glass-panel px-6 py-3 rounded-xl border border-border-main flex items-center gap-3 hover:-translate-y-1 transition-transform group hover:border-accent-primary cursor-default">
                  <img src={`https://cdn.simpleicons.org/${t.logo}/${t.color}`} alt={t.name} className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GitHub Stats */}
        {githubUsername && stats.showStats && (
          <div className="space-y-6 pb-20">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-accent-primary">#</span> GitHub Stats
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-panel rounded-2xl border border-border-main p-4 overflow-hidden flex items-center justify-center hover:border-accent-primary transition-colors">
                <img src={getStatsUrl()} alt="GitHub Stats" className="w-full h-auto max-w-[450px]" />
              </div>
              {stats.showTopLangs && (
                <div className="glass-panel rounded-2xl border border-border-main p-4 overflow-hidden flex items-center justify-center hover:border-accent-primary transition-colors">
                  <img src={`${getStatsHost()}/top-langs/?username=${githubUsername}&layout=compact${!stats.showBorder ? '&hide_border=true' : ''}${stats.theme ? `&theme=${stats.theme}` : '&theme=radical'}`} alt="Top Languages" className="w-full h-auto max-w-[450px]" />
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default WebProfile;
