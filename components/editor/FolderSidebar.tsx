import { useIndexedDB } from "@/hooks/useIndexedDB";
import { ReactNode, useEffect } from "react"
import FolderTree from "./FolderTree";
import { MouseEvent } from 'react';

const FolderSidebar = ({ children, sidebarOpen, toggleSidebar }: { children: ReactNode, sidebarOpen: boolean, toggleSidebar: () => void }) => {

    const { isDBReady, folders, notes, addFolder, deleteFolder, addNote, refreshData: loadData } = useIndexedDB();

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
        switch (type) {
            case "add-folder":
                // Handle adding a folder
                break;
            case "delete-folder":
                // Handle deleting a folder
                break;
            case "add-note":
                // Handle adding a note
                break;
            case "delete-note":
                // Handle deleting a note
                break;
            default:
                break;
        }
    };


    return (
        <>
            <aside id="default-sidebar" className={ `fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ` } aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-[#0c0c0c]">
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