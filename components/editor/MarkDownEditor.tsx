"use client"
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { CodeProps } from 'react-markdown/lib/ast-to-react';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');

  const formatButtons = [
    { name: 'B', syntax: '**Bold**', title: 'Bold' },
    { name: 'I', syntax: '*Italic*', title: 'Italic' },
    { name: 'H1', syntax: '# ', title: 'Heading 1' },
    { name: 'H2', syntax: '## ', title: 'Heading 2' },
    { name: 'Link', syntax: '[Link Text](URL)', title: 'Link' },
    { name: 'Code', syntax: '`code`', title: 'Inline Code' }
  ];

  const insertSyntax = (syntax: string) => {
    setMarkdown(prev => prev + syntax);
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-end gap-2 px-3 py-1 bg-black border-b border-[#8080804d]">
        {formatButtons.map(btn => (
          <button
            key={btn.syntax}
            className="px-2 cursor-pointer bg-[#545454b0] text-white rounded hover:bg-[#545454]"
            onClick={() => insertSyntax(btn.syntax)}
            title={btn.title}
          >
            {btn.name}
          </button>
        ))}
      </header>

      <div className="flex flex-1">
        <div className="w-1/2 border-r border-[#8080804d]">
          <textarea
            className="w-full h-full p-4 text-white resize-none focus:outline-none font-mono"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
          />
        </div>
        
        <div className="w-1/2 p-4 overflow-auto text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props: CodeProps) {
                const { children, className, node, inline, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;