"use client"
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useIndexedDB } from '@/hooks/useIndexedDB';

const MarkdownEditor = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
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

  const { isDBReady, folders, notes, addFolder, deleteFolder, addNote, refreshData: loadData } = useIndexedDB();

  useEffect(() => {
    if (isDBReady) {
      // addFolder({ id: 'folder-1', name: 'Folder 1', parentId: null, path: 'Folder 1' });
      // addFolder({ id: 'folder-2', name: 'Folder 2', parentId: null, path: 'Folder 2' });
      // addFolder({ id: 'folder-2-1', name: 'Folder 2-1', parentId: 'folder-2', path: 'Folder 2/Folder 2-1' });
      // addFolder({ id: 'folder-2-2', name: 'Folder 2-2', parentId: 'folder-2', path: 'Folder 2/Folder 2-2' });
      // addFolder({ id: 'folder-3', name: 'Folder 3', parentId: null, path: 'Folder 3' });
      // addFolder({ id: 'folder-3-1', name: 'Folder 3-1', parentId: 'folder-3', path: 'Folder 3/Folder 3-1' });
      // addFolder({ id: 'folder-3-2', name: 'Folder 3-2', parentId: 'folder-3', path: 'Folder 3/Folder 3-2' });
      // addFolder({ id: 'folder-3-3', name: 'Folder 3-3', parentId: 'folder-3', path: 'Folder 3/Folder 3-3' });
      // addFolder({ id: 'folder-4', name: 'Folder 4', parentId: null, path: 'Folder 4' });

      // addNote({ id: 'note-1', title: 'Note 1', content: 'Content for Note 1', folderId: 'folder-1', tags: ['tag1', 'tag2'] });
      // addNote({ id: 'note-2', title: 'Note 2', content: 'Content for Note 4', folderId: 'folder-1', tags: ['tag4'] });
      // addNote({ id: 'note-3', title: 'Note 3', content: 'Content for Note 2', folderId: 'folder-2', tags: ['tag2', 'tag3'] });
      // addNote({ id: 'note-4', title: 'Note 4', content: 'Content for Note 3', folderId: 'folder-2-1', tags: ['tag1', 'tag3'] });

      loadData();
    }
  }, [isDBReady]);

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

        <div className="w-1/2 p-4 overflow-auto text-white">
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