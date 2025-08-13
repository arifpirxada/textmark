import { useIndexedDB } from "@/hooks/useIndexedDB";
import { ReactNode, useEffect } from "react"
import FolderTree from "./FolderTree";
import { MouseEvent } from 'react';
import { redirect } from "next/navigation";

const FolderSidebar = ({ children, sidebarOpen, toggleSidebar }: { children: ReactNode, sidebarOpen: boolean, toggleSidebar: () => void }) => {

    const { isDBReady, folders, notes, addFolder, deleteFolder, addNote, deleteNote, refreshData: loadData } = useIndexedDB();

    useEffect(() => {
        if (isDBReady) {
            loadData();
        }
    }, [isDBReady]);

    const toggleFolder = (e: React.MouseEvent<HTMLButtonElement>, folderId: string) => {
        const folder = document.getElementById(folderId);
        const button = e.currentTarget;
        if (folder) {
            folder.classList.toggle("hidden");
        }
        if (button) {
            button.querySelector("svg")?.classList.toggle("-rotate-90");
        }
    }

    const handleAction = (type: string, event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        let folderId = event.currentTarget.parentElement?.getAttribute("data-folder-id");
        let noteId = event.currentTarget.parentElement?.getAttribute("data-note-id");
        switch (type) {
            case "add-folder":
                const folderPath = event.currentTarget.parentElement?.getAttribute("data-folder-path");
                if (folderId === undefined || !folderPath === null) {
                    alert("Folder ID or path is missing: " + folderId);
                    return;
                };
                const folderName = prompt("Enter folder name:");
                if (!folderName) {
                    alert("Folder name is required");
                    return;
                };
                const folder = {
                    id: crypto.randomUUID(),
                    name: folderName,
                    parentId: folderId,
                    path: folderPath + '/' + folderName
                }
                if (folderName) {
                    addFolder(folder);
                }
                break;
            case "delete-folder":
                if (!folderId) return;
                deleteFolder(folderId);
                break;
            case "add-note":
                if (folderId === undefined) return;
                const noteTitle = prompt("Enter note title:");
                if (!noteTitle) {
                    alert("Note title is required");
                    return;
                }
                const tags = prompt("Enter note tags (comma separated):");
                if (tags) {
                    tags.split(",").forEach(tag => {
                        tag.trim();
                    });
                }
                const note = {
                    id: crypto.randomUUID(),
                    title: noteTitle,
                    content: "",
                    folderId: folderId,
                    tags: tags ? (tags as string).split(",").map(tag => tag.trim()) : []
                };
                addNote(note);
                redirect(`/note/${note.id}`);
                break;
            case "delete-note":
                if (!noteId) return;
                deleteNote(noteId);
                break;
            default:
                break;
        }
    };


    return (
        <>
            <aside id="default-sidebar" className={ `fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ` } aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#0c0c0c]">
                    <div data-folder-id={ null } data-folder-path="" className="flex mb-2 text-xs text-white gap-2 justify-start">
                        <button onClick={ (e) => handleAction("add-folder", e) } className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 32 32">
                                <path stroke="#fff" fill="#fff" d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path>
                            </svg>
                            <p>Folder</p>
                        </button>
                        <button onClick={ (e) => handleAction("add-note", e) } className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 32 32">
                                <path stroke="#fff" fill="#fff" d="M 16 3 C 8.832031 3 3 8.832031 3 16 C 3 23.167969 8.832031 29 16 29 C 23.167969 29 29 23.167969 29 16 C 29 8.832031 23.167969 3 16 3 Z M 16 5 C 22.085938 5 27 9.914063 27 16 C 27 22.085938 22.085938 27 16 27 C 9.914063 27 5 22.085938 5 16 C 5 9.914063 9.914063 5 16 5 Z M 15 10 L 15 15 L 10 15 L 10 17 L 15 17 L 15 22 L 17 22 L 17 17 L 22 17 L 22 15 L 17 15 L 17 10 Z"></path>
                            </svg>
                            <p>Note</p>
                        </button>
                    </div>
                    <FolderTree folders={ folders } notes={ notes } toggleFolder={ toggleFolder } handleAction={ handleAction } />
                </div>
            </aside>
            { sidebarOpen && <div className="mobile-overlay w-screen h-screen bg-black opacity-50 absolute top-0 left-0 md:hidden" onClick={ toggleSidebar }></div> }

            <div id="main-content" className={ `p-4 ${sidebarOpen ? "sm:ml-64" : "sm:ml-0"}` }>
                { children }
            </div>

        </>
    )
}

export default FolderSidebar