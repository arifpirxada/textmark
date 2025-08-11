import { DBSchema } from "idb";

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  path: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string | null;
  tags: string[];
}

export interface MyDB extends DBSchema {
  folders: {
    key: string;
    value: Folder;
    indexes: { 'by-name': string };
  };
  notes: {
    key: string;
    value: Note;
    indexes: { 'by-title': string };
  };
}
