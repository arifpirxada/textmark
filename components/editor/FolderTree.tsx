import { Folder, Note } from "@/types/db";
import FolderBtn from "./FolderBtn";
import NoteLi from "./NoteLi";
import { MouseEvent } from "react";

const getChildren = (folders: Folder[], parentId: string | null) => {
    return folders.filter((folder) => folder.parentId === parentId);
};

const getNotes = (notes: Note[], folderId: string | null) => {
    return notes.filter((note) => note.folderId === folderId);
};

type PropType = {
    folders: Folder[];
    parentId?: string | null;
    notes: Note[];
    toggleFolder: (e: React.MouseEvent<HTMLButtonElement>, folderId: string) => void;
    handleAction: (type: string, event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}

const FolderTree: React.FC<PropType> = ({ folders, parentId = null, notes, toggleFolder, handleAction }) => {
    const children = getChildren(folders, parentId);
    const folderNotes = getNotes(notes, parentId);

    if (children.length === 0 && folderNotes.length === 0) return null;

    return (
        <ul id={ `folder-${parentId}` } className={ `space-y-2 font-medium text-xs ${parentId ? "pl-2 hidden" : "pl-0"}` }>
            { children.map((folder) => (
                <li key={ folder.id }>
                    <FolderBtn folder={ folder } toggleFolder={ toggleFolder } handleAction={ handleAction } />
                    {/* Recursively render children */ }
                    <FolderTree folders={ folders } parentId={ folder.id } notes={ notes } toggleFolder={ toggleFolder } handleAction={ handleAction } />
                </li>
            )) }
            { folderNotes.map((note) => (
                <li key={ note.id }>
                    <NoteLi note={ note } handleAction={ handleAction } />
                </li>
            )) }
        </ul>
    );
};

export default FolderTree;