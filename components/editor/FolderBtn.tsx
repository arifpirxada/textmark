import { Folder } from "@/types/db"

const FolderBtn = ({ folder, toggleFolder }: { folder: Folder, toggleFolder: (e: React.MouseEvent<HTMLButtonElement>, folderId: string) => void }) => {
    return (
        <button onClick={ (e) => toggleFolder(e, `folder-${folder.id}`) } data-collapse-toggle={`folder-${folder.id}`} className="flex cursor-pointer items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg  group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <svg className="w-2 h-2 mr-1 -rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            { folder.name }
        </button>
    )
}

export default FolderBtn