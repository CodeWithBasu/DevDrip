export const generateMarkdown = (state) => {
  let md = '';

  // 1. Header & Title
  if (state.aesthetics?.topBanner) {
    md += `<p align="center">\n  <img src="${state.aesthetics.topBanner}" alt="Banner" width="100%" />\n</p>\n\n`;
  }
  
  if (state.name) {
    md += `<h1 align="center">Hi 👋, I'm ${state.name}</h1>\n`;
  }
  if (state.title) {
    md += `<h3 align="center">${state.title}</h3>\n\n`;
  }
  if (state.catchphrase) {
    md += `<p align="center"><em>${state.catchphrase}</em></p>\n\n`;
  }

  if (state.name || state.title || state.catchphrase) {
    md += `---\n\n`;
  }

  // 2. About Me
  if (state.about) {
    md += `## 👨‍💻 About Me\n\n`;
    if (state.about.currentFocus) md += `- 🔭 I'm currently working on **${state.about.currentFocus}**\n`;
    if (state.about.learning) md += `- 🌱 I'm currently learning **${state.about.learning}**\n`;
    if (state.about.askMe) md += `- 💬 Ask me about **${state.about.askMe}**\n`;
    if (state.about.funFact) md += `- ⚡ Fun fact: **${state.about.funFact}**\n`;
    md += `\n`;
  }

  // 3. Tech Stack
  if (state.tech && state.tech.length > 0) {
    md += `## 🛠 Tech Stack\n\n<p align="left">\n`;
    state.tech.forEach(tech => {
      // using simple icons
      const badgeUrl = `https://img.shields.io/badge/${tech.name}-${tech.color}?style=for-the-badge&logo=${tech.logo}&logoColor=white`;
      md += `  <img src="${badgeUrl}" alt="${tech.name}" />\n`;
    });
    md += `</p>\n\n`;
  }

  // 4. GitHub Stats
  if (state.stats && (state.stats.showStats || state.stats.showStreak || state.stats.showTopLangs || state.stats.showVisitors) && state.githubUsername) {
    md += `## 📊 GitHub Stats\n\n`;
    
    if (state.stats.showVisitors) {
      md += `<p align="center">\n`;
      md += `  <img src="https://komarev.com/ghpvc/?username=${state.githubUsername}&label=Profile%20views&color=0e75b6&style=flat" alt="Profile Views" />\n`;
      md += `</p>\n\n`;
    }

    md += `<p align="center">\n`;
    
    const theme = state.stats.theme || 'radical';
    const hideBorder = state.stats.showBorder === false ? '&hide_border=true' : '';
    const lifetime = state.stats.lifetimeCommits ? '&include_all_commits=true' : '';
    const privateCommits = state.stats.privateCommits ? '&count_private=true' : '';
    const statsHost = state.stats.customHostUrl ? state.stats.customHostUrl.replace(/\/$/, '') : 'https://github-readme-stats-three-sandy-45.vercel.app';
    
    if (state.stats.showStats !== false) { // defaulting to true if undefined
      md += `  <img src="${statsHost}/api?username=${state.githubUsername}&show_icons=true&theme=${theme}${hideBorder}${lifetime}${privateCommits}" alt="GitHub Stats" />\n`;
    }
    
    if (state.stats.showStreak !== false) {
      // Streak stats is a separate project, usually hosted on Heroku or a separate Vercel deployment
      md += `  <img src="https://github-readme-streak-stats.herokuapp.com/?user=${state.githubUsername}&theme=${theme}${hideBorder}" alt="GitHub Streak Stats" />\n`;
    }
    
    md += `</p>\n\n`;
    
    if (state.stats.showTopLangs !== false) {
      md += `<p align="center">\n`;
      md += `  <img src="${statsHost}/api/top-langs/?username=${state.githubUsername}&theme=${theme}${hideBorder}&layout=compact" alt="Top Languages" />\n`;
      md += `</p>\n\n`;
    }
  }

  // 5. Social Links
  if (state.socials && Object.values(state.socials).some(val => val !== '')) {
    md += `## 🌐 Connect with me\n\n<p align="left">\n`;
    
    const socialConfig = [
      { id: 'github', name: 'GitHub', color: '181717', logo: 'github', prefix: 'https://github.com/' },
      { id: 'twitter', name: 'Twitter', color: '000000', logo: 'x', prefix: 'https://twitter.com/' },
      { id: 'devto', name: 'Dev.to', color: '0A0A0A', logo: 'devdotto', prefix: 'https://dev.to/' },
      { id: 'codepen', name: 'CodePen', color: '000000', logo: 'codepen', prefix: 'https://codepen.io/' },
      { id: 'codesandbox', name: 'CodeSandbox', color: '151515', logo: 'codesandbox', prefix: 'https://codesandbox.io/u/' },
      { id: 'stackoverflow', name: 'StackOverflow', color: 'F58025', logo: 'stackoverflow', prefix: 'https://stackoverflow.com/users/' },
      { id: 'linkedin', name: 'LinkedIn', color: '0077B5', logo: 'linkedin', prefix: 'https://linkedin.com/in/' },
      { id: 'kaggle', name: 'Kaggle', color: '20BEFF', logo: 'kaggle', prefix: 'https://kaggle.com/' },
      { id: 'facebook', name: 'Facebook', color: '1877F2', logo: 'facebook', prefix: 'https://facebook.com/' },
      { id: 'instagram', name: 'Instagram', color: 'E4405F', logo: 'instagram', prefix: 'https://instagram.com/' },
      { id: 'dribbble', name: 'Dribbble', color: 'EA4C89', logo: 'dribbble', prefix: 'https://dribbble.com/' },
      { id: 'behance', name: 'Behance', color: '1769FF', logo: 'behance', prefix: 'https://behance.net/' },
      { id: 'hashnode', name: 'Hashnode', color: '2962FF', logo: 'hashnode', prefix: 'https://hashnode.com/' },
      { id: 'medium', name: 'Medium', color: '12100E', logo: 'medium', prefix: 'https://medium.com/' },
      { id: 'youtube', name: 'YouTube', color: 'FF0000', logo: 'youtube', prefix: 'https://youtube.com/c/' },
      { id: 'codechef', name: 'CodeChef', color: '5B4638', logo: 'codechef', prefix: 'https://codechef.com/users/' },
      { id: 'hackerrank', name: 'HackerRank', color: '00EA64', logo: 'hackerrank', prefix: 'https://hackerrank.com/' },
      { id: 'codeforces', name: 'Codeforces', color: '1F8ACB', logo: 'codeforces', prefix: 'https://codeforces.com/profile/' },
      { id: 'leetcode', name: 'LeetCode', color: 'FFA116', logo: 'leetcode', prefix: 'https://leetcode.com/' },
      { id: 'hackerearth', name: 'HackerEarth', color: '2C3454', logo: 'hackerearth', prefix: 'https://hackerearth.com/' },
      { id: 'geeksforgeeks', name: 'GeeksforGeeks', color: '2F8D46', logo: 'geeksforgeeks', prefix: 'https://auth.geeksforgeeks.org/user/' },
      { id: 'discord', name: 'Discord', color: '5865F2', logo: 'discord', prefix: 'https://discord.gg/' },
      { id: 'portfolio', name: 'Portfolio', color: '2563EB', logo: 'globe', prefix: '' }
    ];

    socialConfig.forEach(social => {
      const value = state.socials[social.id];
      if (value) {
        const url = social.prefix ? `${social.prefix}${value}` : value;
        md += `  <a href="${url}"><img src="https://img.shields.io/badge/${social.name.replace('.','%2E')}-${social.color}?style=for-the-badge&logo=${social.logo}&logoColor=white" alt="${social.name}" /></a>\n`;
      }
    });

    md += `</p>\n\n`;
  }

  // 6. Support
  if (state.support && (state.support.buyMeACoffee || state.support.kofi)) {
    md += `## 💖 Support Me\n\n<p align="left">\n`;
    if (state.support.buyMeACoffee) {
      md += `  <a href="https://www.buymeacoffee.com/${state.support.buyMeACoffee}"><img src="https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy Me A Coffee" /></a>\n`;
    }
    if (state.support.kofi) {
      md += `  <a href="https://ko-fi.com/${state.support.kofi}"><img src="https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=kofi&logoColor=white" alt="Ko-fi" /></a>\n`;
    }
    md += `</p>\n\n`;
  }

  // 7. Latest Blog Posts (RSS Feed)
  if (state.blog && state.blog.rssUrl) {
    md += `## 📝 Latest Blog Posts\n\n`;
    md += `<!-- BLOG-POST-LIST:START -->\n`;
    md += `<!-- You can use github-readme-blog-post-action to auto-update this section -->\n`;
    md += `<!-- BLOG-POST-LIST:END -->\n\n`;
  }

  // 8. Footer Aesthetics
  if (state.aesthetics?.bottomGif && state.aesthetics.bottomGif !== 'none') {
    const gifs = {
      typingCat: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
      coffeeDev: 'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif',
      matrix: 'https://media.giphy.com/media/3ov9jOJSQhGCcj2D62/giphy.gif',
      codingAnime: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif'
    };
    
    if (gifs[state.aesthetics.bottomGif]) {
      md += `<br />\n<p align="center">\n  <img src="${gifs[state.aesthetics.bottomGif]}" alt="Aesthetic" width="300" />\n</p>\n\n`;
    }
  }

  return md;
};
