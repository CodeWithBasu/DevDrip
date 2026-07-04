export const generateMarkdown = (state) => {
  let md = '';

  // 1. Header & Title
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
  if (state.stats && state.stats.showStats) {
    md += `## 📊 GitHub Stats\n\n`;
    md += `<p align="center">\n`;
    const theme = state.stats.theme || 'radical';
    md += `  <img src="https://github-readme-stats.vercel.app/api?username=${state.githubUsername}&show_icons=true&theme=${theme}" alt="GitHub Stats" />\n`;
    md += `</p>\n\n`;
  }

  // 5. Social Links
  if (state.socials && Object.values(state.socials).some(val => val !== '')) {
    md += `## 🌐 Connect with me\n\n<p align="left">\n`;
    if (state.socials.twitter) {
      md += `  <a href="https://twitter.com/${state.socials.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" /></a>\n`;
    }
    if (state.socials.linkedin) {
      md += `  <a href="https://linkedin.com/in/${state.socials.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>\n`;
    }
    if (state.socials.portfolio) {
      md += `  <a href="${state.socials.portfolio}"><img src="https://img.shields.io/badge/Portfolio-2563EB?style=for-the-badge&logo=globe&logoColor=white" alt="Portfolio" /></a>\n`;
    }
    md += `</p>\n\n`;
  }

  // 6. Latest Blog Posts (RSS Feed)
  if (state.blog && state.blog.rssUrl) {
    md += `## 📝 Latest Blog Posts\n\n`;
    md += `<!-- BLOG-POST-LIST:START -->\n`;
    md += `<!-- You can use github-readme-blog-post-action to auto-update this section -->\n`;
    md += `<!-- BLOG-POST-LIST:END -->\n\n`;
  }

  return md;
};
