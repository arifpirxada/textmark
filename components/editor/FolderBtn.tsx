import { Folder } from "@/types/db"
import { useRef, useEffect } from "react";
import { MouseEvent } from 'react';

const FolderBtn = ({ folder, toggleFolder, handleAction }: { 
    folder: Folder, 
    toggleFolder: (e: React.MouseEvent<HTMLButtonElement>, folderId: string) => void, 
    handleAction: (type: string, event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void 
}) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const button = btnRef.current;
        const tooltip = tooltipRef.current;

        if (!button || !tooltip) return;

        // Use native DOM event types for addEventListener
        const handleContextMenu = (e: Event) => {
            e.preventDefault();
            
            // Cast to MouseEvent for accessing mouse properties
            const mouseEvent = e as globalThis.MouseEvent;
            
            tooltip.style.left = mouseEvent.clientX + 10 + 'px';
            tooltip.style.top = mouseEvent.clientY + 10 + 'px';

            tooltip.classList.remove("hidden");
            tooltip.classList.add("block");
        };

        const handleDocumentClick = (e: Event) => {
            const target = e.target as Node;
            if (tooltip.contains(target)) return;

            tooltip.classList.add("hidden");
            tooltip.classList.remove("block");
        };

        button.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('click', handleDocumentClick);

        return () => {
            button.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    return (
        <>
            <button
                ref={btnRef}
                onClick={(e) => toggleFolder(e, `folder-${folder.id}`)}
                data-collapse-toggle={`folder-${folder.id}`}
                className="flex cursor-pointer items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
                <svg className="w-2 h-2 mr-1 -rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
                {folder.name}
            </button>
            <div
                ref={tooltipRef}
                role="tooltip"
                className="absolute hidden z-50 px-2 py-2 text-sm font-medium text-white bg-[#403c3c] rounded-sm shadow-lg tooltip"
            >
                <div data-folder-id={folder.id} className="flex flex-col text-white gap-2 justify-start">
                    <button onClick={(e) => handleAction("add-folder", e)} className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 32 32">
                            <path stroke="#fff" fill="#fff" d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path>
                        </svg>
                        <p>Folder</p>
                    </button>
                    <button onClick={(e) => handleAction("add-note", e)} className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 32 32">
                            <path stroke="#fff" fill="#fff" d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path>
                        </svg>
                        <p>Note</p>
                    </button>
                    <button onClick={(e) => handleAction("delete-folder", e)} className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 30 30">
                            <path stroke="#fff" fill="#fff" d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                        <p>Delete</p>
                    </button>
                </div>
            </div>
        </>
    );
};

export default FolderBtn;