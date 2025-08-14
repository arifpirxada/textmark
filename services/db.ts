import { openDB, IDBPDatabase, deleteDB } from "idb";
import { MyDB, Folder, Note } from "../types/db";

class DatabaseService {
  private dbName = "TextMarkDB";
  private dbVersion = 1;
  private db: IDBPDatabase<MyDB> | null = null;

  async initDB(): Promise<IDBPDatabase<MyDB>> {
    if (this.db) {
      return this.db;
    }

    this.db = await openDB<MyDB>(this.dbName, this.dbVersion, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(
          "Upgrading database from version",
          oldVersion,
          "to",
          newVersion
        );

        if (!db.objectStoreNames.contains("folders")) {
          const folderStore = db.createObjectStore("folders", {
            keyPath: "id",
          });
          folderStore.createIndex("by-name", "name", { unique: true });
        }

        if (!db.objectStoreNames.contains("notes")) {
          const noteStore = db.createObjectStore("notes", {
            keyPath: "id",
          });
          noteStore.createIndex("by-title", "title");
        }
      },
    });

    return this.db;
  }

  async addFolder(folder: Folder): Promise<string> {
    const db = await this.initDB();
    return await db.add("folders", folder);
  }

  async getFolder(id: string): Promise<Folder | undefined> {
    const db = await this.initDB();
    return await db.get("folders", id);
  }

  async getAllFolders(): Promise<Folder[]> {
    const db = await this.initDB();
    const folders = await db.getAll("folders");
    return folders.sort((a, b) => a.name.localeCompare(b.name));
  }

  async updateFolder(folder: Folder): Promise<string> {
    const db = await this.initDB();
    return await db.put("folders", folder);
  }

  async deleteFolder(id: string): Promise<void> {
    const db = await this.initDB();
    const allFolders = await db.getAll("folders");
    const allNotes = await db.getAll("notes");

    allFolders.forEach((folder) => {
      if (folder.parentId === id) {
        db.delete("folders", folder.id);
      }
    });
    allNotes.forEach((note) => {
      if (note.folderId === id) {
        db.delete("notes", note.id);
      }
    });
    await db.delete("folders", id);
  }

  async getFolderByName(name: string): Promise<Folder | undefined> {
    const db = await this.initDB();
    return await db.getFromIndex("folders", "by-name", name);
  }

  // Note operations
  async addNote(note: Note): Promise<string> {
    const db = await this.initDB();
    return await db.add("notes", note);
  }

  async updateNote(note: Note): Promise<string> {
    const db = await this.initDB();
    return await db.put("notes", note);
  }

  async deleteNote(id: string): Promise<void> {
    const db = await this.initDB();
    await db.delete("notes", id);
  }

  async getNote(id: string): Promise<Note | undefined> {
    const db = await this.initDB();
    return await db.get("notes", id);
  }

  async getAllNotes(): Promise<Note[]> {
    const db = await this.initDB();
    return await db.getAll("notes");
  }

  async getNotesByTitle(title: string): Promise<Note[]> {
    const db = await this.initDB();
    return await db.getAllFromIndex("notes", "by-title", title);
  }

  // Bulk operations with transactions
  async addMultipleNotes(notes: Note[]): Promise<void> {
    const db = await this.initDB();
    const tx = db.transaction("notes", "readwrite");

    await Promise.all([...notes.map((note) => tx.store.add(note)), tx.done]);
  }

  // Clear all data
  async clearStore(storeName: keyof MyDB): Promise<void> {
    const db = await this.initDB();
    const tx = db.transaction(storeName as "notes" | "folders", "readwrite");
    await tx.store.clear();
    await tx.done;
  }

  // Delete the entire database
  async deleteDatabase(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
    await deleteDB(this.dbName);
  }

  async export() {
    const db = await this.initDB();
    const folders = await db.getAll("folders");
    const notes = await db.getAll("notes");
    return { folders, notes };
  }
}

export const dbService = new DatabaseService();
