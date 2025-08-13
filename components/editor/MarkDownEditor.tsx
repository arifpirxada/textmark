"use client"
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useIndexedDB } from '@/hooks/useIndexedDB';
import { Note } from '@/types/db';

const MarkdownEditor = ({ id, toggleSidebar }: { id: string, toggleSidebar: () => void }) => {
  const [note, setNote] = useState<Note | null>(null);
  const [markdown, setMarkdown] = useState('');

  const formatButtons = [
    { name: 'B', syntax: '**Bold**', title: 'Bold (Ctrl+B)' },
    { name: 'I', syntax: '*Italic*', title: 'Italic (Ctrl+I)' },
    { name: 'H1', syntax: '\n# ', title: 'Heading 1' },
    { name: 'H2', syntax: '\n## ', title: 'Heading 2' },
    { name: 'H3', syntax: '\n### ', title: 'Heading 3' },
    { name: 'Quote', syntax: '\n> ', title: 'Blockquote' },
    { name: 'List', syntax: '\n- ', title: 'Bullet List' },
    { name: 'Numbered', syntax: '\n1. ', title: 'Numbered List' },
    { name: 'Link', syntax: '[Link Text](URL)', title: 'Link' },
    { name: 'Image', syntax: '![Alt Text](image-url)', title: 'Image' },
    { name: 'Code', syntax: '`code`', title: 'Inline Code' },
    { name: 'Block', syntax: '\n``````\n', title: 'Code Block' },
    { name: 'Table', syntax: '\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n', title: 'Table' },
    { name: 'HR', syntax: '\n---\n', title: 'Horizontal Rule' }
  ];

  const insertSyntax = (syntax: string) => {
    setMarkdown(prev => prev + syntax);
  };

  const { isDBReady, getNote, updateNote } = useIndexedDB();

  useEffect(() => {
    if (isDBReady) {
      const fetchNote = async () => {
        const note = await getNote(id);
        if (note) {
          setMarkdown(note.content);
          setNote(note)
        }
      };
      fetchNote();
    }
  }, [isDBReady]);

  useEffect(() => {
    if (markdown && isDBReady) {
      const updateNoteContent = async () => {
        if (note) {
          await updateNote({ ...note, content: markdown });
        }
      };
      updateNoteContent();
    }
  }, [markdown, isDBReady]);

  return (
    <div className="h-screen flex flex-col overflow-x-scroll md:overflow-x-auto hide-scrollbar">
      <header className="flex gap-2 px-3 py-2 rounded mb-2 bg-[#0c0c0c] border-b">
        <button onClick={ toggleSidebar } className="inline-flex cursor-pointer items-center p-2 justify-center text-sm text-gray-500 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className='ml-auto flex gap-2'>
          { formatButtons.map(btn => (
            <button
              key={ btn.syntax }
              className="px-2 cursor-pointer bg-[#545454b0] text-white rounded-sm hover:bg-[#545454]"
              onClick={ () => insertSyntax(btn.syntax) }
              title={ btn.title }
            >
              { btn.name }
            </button>
          )) }
        </div>
      </header>

      <div className="flex flex-1 w-[150vw] md:w-full">
        <div className="w-1/2 border-r border-[#8080804d]">
          <textarea
            className="w-full h-full p-4 text-white resize-none focus:outline-none font-mono"
            value={ markdown }
            onChange={ (e) => setMarkdown(e.target.value) }
            placeholder="Type your markdown here..."
          />
        </div>

        <div className="w-1/2 p-4 overflow-auto text-white markdown-content">
          <ReactMarkdown
            remarkPlugins={ [remarkGfm] }
            components={ {
              code(props: any) {
                const { children, className, node, inline, ...rest } = props;
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={ dark }
                    language={ match[1] }
                    PreTag="div"
                    { ...props }
                  >
                    { String(children).replace(/\n$/, '') }
                  </SyntaxHighlighter>
                ) : (
                  <code className={ className } { ...props }>
                    { children }
                  </code>
                );
              }
            } }
          >
            { markdown }
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;