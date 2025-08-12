import { Note } from "@/types/db"
import Link from "next/link"
import { useEffect, useRef, MouseEvent } from "react";

const NoteLi = ({ note, handleAction }: { note: Note, handleAction: (type: string, event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void }) => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const linkElement = linkRef.current;
        const tooltip = tooltipRef.current;

        if (!linkElement || !tooltip) return;

        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            tooltip.style.left = e.clientX + 10 + 'px';
            tooltip.style.top = e.clientY + 10 + 'px';

            tooltip.classList.remove("hidden");
            tooltip.classList.add("block");
        };

        const handleDocumentClick = (e: Event) => {
            const target = e.target as Node;
            if (tooltip.contains(target)) return;

            tooltip.classList.add("hidden");
            tooltip.classList.remove("block");
        };

        linkElement.addEventListener('contextmenu', handleContextMenu as any);
        document.addEventListener('click', handleDocumentClick);

        return () => {
            linkElement.removeEventListener('contextmenu', handleContextMenu as any);
            document.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
        const tooltip = tooltipRef.current;
        if (tooltip) {
            tooltip.classList.add("hidden");
            tooltip.classList.remove("block");
        }
    };

    return (
        <>
            <Link 
                ref={linkRef}
                href={`/notes/${note.id}`} 
                onClick={handleLinkClick}
                className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
                <svg className="shrink-0 w-3 h-3 mr-1 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                {note.title}
            </Link>
            <div
                ref={tooltipRef}
                role="tooltip"
                className="absolute hidden z-50 px-2 py-2 text-sm font-medium text-white bg-[#403c3c] rounded-sm shadow-lg tooltip"
            >
                <div data-note-id={note.id} className="flex flex-col text-white gap-2 justify-start">
                    <button 
                        onClick={(e) => handleAction("delete-note", e)} 
                        className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 30 30">
                            <path stroke="#fff" fill="#fff" d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                        <p>Delete</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default NoteLi