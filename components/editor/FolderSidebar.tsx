import { useIndexedDB } from "@/hooks/useIndexedDB";
import { ReactNode, useEffect, useRef, useState } from "react"
import FolderTree from "./FolderTree";
import { MouseEvent } from 'react';
import { redirect } from "next/navigation";

const FolderSidebar = ({ children, sidebarOpen, toggleSidebar }: { children: ReactNode, sidebarOpen: boolean, toggleSidebar: () => void }) => {

    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileContainerRef = useRef<HTMLDivElement | null>(null);

    const { isDBReady, folders, notes, addFolder, deleteFolder, addNote, deleteNote, refreshData: loadData, exportData, importData } = useIndexedDB();

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
                redirect(`/notes/${note.id}`);
                break;
            case "delete-note":
                if (!noteId) return;
                deleteNote(noteId);
                break;
            default:
                break;
        }
    };

    const openFileDialog = () => {
        if (fileContainerRef.current) {
            fileContainerRef.current.classList.remove("hidden");
            fileContainerRef.current.classList.add("flex");
            setTimeout(() => {
                fileContainerRef.current?.classList.remove("opacity-0");
            }, 100);
        }
    }

    const closeFileDialog = (event: MouseEvent<HTMLDivElement>) => {
        if (fileContainerRef.current && event.target === fileContainerRef.current) {
            fileContainerRef.current?.classList.remove("opacity-0");
            setTimeout(() => {
                fileContainerRef.current?.classList.add("hidden");
                fileContainerRef.current?.classList.remove("flex");
            }, 100);
        }
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event?.target?.files?.[0];
        if (selectedFile && selectedFile.name.endsWith(".json")) {
            setFile(selectedFile);
        } else {
            setFile(null);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile && droppedFile.name.endsWith(".json")) {
            setFile(droppedFile);
        } else {
            setFile(null);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
    };

    const importDt = () => {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const json = e.target?.result;
            if (typeof json === "string") {
                const data = JSON.parse(json);
                await importData(data)
                fileContainerRef.current?.click()
            }
        };
        reader.readAsText(file);
    }


    return (
        <>
            <aside id="default-sidebar" className={ `default-sidebar fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} ` } aria-label="Sidebar">
                <div className="h-full hide-scrollbar px-3 py-4 overflow-y-auto bg-[#0c0c0c] mb-2">
                    <div data-folder-id={ null } data-folder-path="" className="flex mb-2 text-xs text-white gap-2 justify-start">
                        <button onClick={ exportData } className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded">
                            <svg fill="#fff" height="15" width="15" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 67.671 67.671" >
                                <g>
                                    <path d="M52.946,23.348H42.834v6h10.112c3.007,0,5.34,1.536,5.34,2.858v26.606c0,1.322-2.333,2.858-5.34,2.858H14.724
		c-3.007,0-5.34-1.536-5.34-2.858V32.207c0-1.322,2.333-2.858,5.34-2.858h10.11v-6h-10.11c-6.359,0-11.34,3.891-11.34,8.858v26.606
		c0,4.968,4.981,8.858,11.34,8.858h38.223c6.358,0,11.34-3.891,11.34-8.858V32.207C64.286,27.239,59.305,23.348,52.946,23.348z"/>
                                    <path d="M24.957,14.955c0.768,0,1.535-0.293,2.121-0.879l3.756-3.756v13.028v6v11.494c0,1.657,1.343,3,3,3s3-1.343,3-3V29.348v-6
		V10.117l3.959,3.959c0.586,0.586,1.354,0.879,2.121,0.879s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242l-8.957-8.957
		C35.492,0.291,34.725,0,33.958,0c-0.008,0-0.015,0-0.023,0s-0.015,0-0.023,0c-0.767,0-1.534,0.291-2.12,0.877l-8.957,8.957
		c-1.172,1.171-1.172,3.071,0,4.242C23.422,14.662,24.189,14.955,24.957,14.955z"/>
                                </g>
                            </svg>
                            <p>Export Data</p>
                        </button>
                        <button onClick={ openFileDialog } className="flex gap-1 hover:bg-gray-700 cursor-pointer items-center px-2 py-1 rounded">
                            <svg fill="#fff" height="15" width="15" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 67.671 67.671" >
                                <g>
                                    <path d="M52.946,23.348H42.834v6h10.112c3.007,0,5.34,1.536,5.34,2.858v26.606c0,1.322-2.333,2.858-5.34,2.858H14.724
		c-3.007,0-5.34-1.536-5.34-2.858V32.207c0-1.322,2.333-2.858,5.34-2.858h10.11v-6h-10.11c-6.359,0-11.34,3.891-11.34,8.858v26.606
		c0,4.968,4.981,8.858,11.34,8.858h38.223c6.358,0,11.34-3.891,11.34-8.858V32.207C64.286,27.239,59.305,23.348,52.946,23.348z"/>
                                    <path d="M24.957,14.955c0.768,0,1.535-0.293,2.121-0.879l3.756-3.756v13.028v6v11.494c0,1.657,1.343,3,3,3s3-1.343,3-3V29.348v-6
		V10.117l3.959,3.959c0.586,0.586,1.354,0.879,2.121,0.879s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242l-8.957-8.957
		C35.492,0.291,34.725,0,33.958,0c-0.008,0-0.015,0-0.023,0s-0.015,0-0.023,0c-0.767,0-1.534,0.291-2.12,0.877l-8.957,8.957
		c-1.172,1.171-1.172,3.071,0,4.242C23.422,14.662,24.189,14.955,24.957,14.955z"/>
                                </g>
                            </svg>
                            <p>Import Data</p>
                        </button>
                    </div>
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
            <div ref={ fileContainerRef } onClick={ (e) => closeFileDialog(e) } className="import-data-input hidden opacity-0 z-50 transition-opacity justify-center bg-[#00000054] items-center text-white flex-col gap-6 absolute top-0 left-0 w-full h-screen">
                <div className="flex items-center justify-center w-11/12 md:w-1/2">
                    <label htmlFor="dropzone-file" onDragOver={ handleDragOver } onDrop={ handleDrop } className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>

                            { file ? (
                                <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                    { file.name }
                                </p>
                            ) : (<><p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Please upload the exported JSON file</p></>) }
                        </div>
                        <input ref={ fileInputRef } onChange={ handleFileSelect } id="dropzone-file" type="file" className="hidden" accept=".json" />
                    </label>
                </div>
                <button onClick={ importDt } type="button" className="text-gray-900 cursor-pointer bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Import</button>
            </div>
            { sidebarOpen && <div className="mobile-overlay w-screen h-screen bg-black opacity-50 absolute top-0 left-0 md:hidden" onClick={ toggleSidebar }></div> }

            <div id="main-content" className={ `p-4 ${sidebarOpen ? "sm:ml-64" : "sm:ml-0"}` }>
                { children }
            </div>

        </>
    )
}

export default FolderSidebar