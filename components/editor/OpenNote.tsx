"use client"

import { useIndexedDB } from "@/hooks/useIndexedDB";
import { redirect } from "next/navigation";

const OpenNote = ({ toggleSidebar }: { toggleSidebar: () => void }) => {

    const { addNote } = useIndexedDB();

    const createNote = () => {
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
            folderId: null,
            tags: tags ? (tags as string).split(",").map(tag => tag.trim()) : []
        };
        addNote(note);
        redirect(`/notes/${note.id}`);
    }

    return (
        <div className="h-screen flex flex-col overflow-x-scroll md:overflow-x-auto hide-scrollbar">
            <header className="flex gap-2 px-3 py-2 rounded mb-2 bg-[#0c0c0c] border-b">
                <button onClick={ toggleSidebar } className="inline-flex cursor-pointer items-center p-2 justify-center text-sm text-gray-500 rounded-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-dropdown" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
            </header>

            <div className="text-white flex justify-center items-center flex-col h-full pb-16 gap-2">
                <h1 className="text-xl font-bold">Create or open an existing Note</h1>
                <div>
                    <button type="button" onClick={ createNote } className="text-gray-900 cursor-pointer bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Create</button>
                </div>
            </div>

        </div>
    );
};

export default OpenNote;