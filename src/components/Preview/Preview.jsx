import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Copy, Download, CheckCircle2 } from 'lucide-react';

const Preview = ({ markdown }) => {
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
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'preview' ? 'bg-accentPrimary text-white' : 'text-textSecondary hover:bg-black/10'}`}
          >
            Preview
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === 'code' ? 'bg-accentPrimary text-white' : 'text-textSecondary hover:bg-black/10'}`}
          >
            Raw Code
          </button>
        </div>
        
        <div className="flex gap-2">
          <button onClick={handleCopy} className="flex items-center gap-2 bg-panelBg text-textPrimary px-4 py-2 rounded-lg border border-borderMain hover:bg-black/20 transition-colors">
            {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={handleDownload} className="flex items-center gap-2 bg-accentPrimary hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className="glass-panel flex-1 p-8 overflow-y-auto">
        {activeTab === 'preview' ? (
          <div className="markdown-body prose prose-invert max-w-none text-textPrimary">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
          </div>
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm text-textSecondary m-0">
            {markdown}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Preview;
