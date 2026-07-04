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
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setActiveTab('preview')}
            style={{ 
              background: activeTab === 'preview' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'preview' ? 'white' : 'var(--text-secondary)',
              padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold'
            }}
          >
            Preview
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            style={{ 
              background: activeTab === 'code' ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === 'code' ? 'white' : 'var(--text-secondary)',
              padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold'
            }}
          >
            Raw Code
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--panel-bg)', color: 'var(--text-primary)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            {copied ? <CheckCircle2 size={16} color="green" /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--gradient-primary)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px' }}>
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: 'var(--panel-bg)' }}>
        {activeTab === 'preview' ? (
          <div className="markdown-body" style={{ color: 'var(--text-primary)' }}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
          </div>
        ) : (
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', color: 'var(--text-secondary)', margin: 0 }}>
            {markdown}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Preview;
