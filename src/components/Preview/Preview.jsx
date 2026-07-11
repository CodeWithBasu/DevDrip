import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Copy, Download, CheckCircle2 } from 'lucide-react';

const Preview = ({ markdown, theme }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'code'

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col animate-slide-up shadow-2xl rounded-2xl overflow-hidden bg-panel-bg backdrop-blur-3xl">
      {/* Mac Window Header */}
      <div className="flex justify-between items-center px-6 py-4 bg-[#0d0e12]/80">
        
        <div className="flex gap-2 items-center">
          <div className="w-3.5 h-3.5 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-green-500/90 shadow-[0_0_5px_rgba(34,197,94,0.5)]"></div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-5 py-1.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'preview' ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'text-text-secondary hover:bg-hover-bg hover:text-text-primary'}`}
          >
            Visual Preview
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`px-5 py-1.5 rounded-lg font-bold text-sm transition-all ${activeTab === 'code' ? 'bg-accent-primary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'text-text-secondary hover:bg-hover-bg hover:text-text-primary'}`}
          >
            Raw Code
          </button>
        </div>
        
        <div className="flex gap-3">
          <button onClick={handleCopy} className="flex items-center gap-2 text-sm font-semibold bg-input-bg text-text-primary px-4 py-2 rounded-lg border border-border-main hover:bg-hover-bg transition-colors">
            {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button onClick={handleDownload} className="flex items-center gap-2 text-sm font-bold bg-accent-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-[0_0_10px_rgba(99,102,241,0.4)]">
            <Download size={16} />
            Download .md
          </button>
        </div>
      </div>

      <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
        {activeTab === 'preview' ? (
          <div className={`markdown-body prose max-w-none text-text-primary ${theme !== 'minimalist' ? 'prose-invert' : ''}`}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-[15px] leading-relaxed text-text-secondary m-0 selection:bg-accent-primary/30">
            {markdown}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Preview;
