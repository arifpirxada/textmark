import { useState, useEffect, useCallback } from "react";
import { dbService } from "../services/db";
import { Data, Folder, Note } from "../types/db";

export const useIndexedDB = () => {
  const [isDBReady, setIsDBReady] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    initializeDB();
  }, []);

  const initializeDB = async () => {
    try {
      await dbService.initDB();
      setIsDBReady(true);
      await loadData();
    } catch (error) {
      console.error("Failed to initialize database:", error);
    }
  };

  const loadData = async () => {
    try {
      const [allFolders, allNotes] = await Promise.all([
        dbService.getAllFolders(),
        dbService.getAllNotes(),
      ]);
      setFolders(allFolders);
      setNotes(allNotes);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  const addFolder = useCallback(async (folder: Folder) => {
    try {
      await dbService.addFolder(folder);
      await loadData();
    } catch (error) {
      console.error("Failed to add folder:", error);
      throw error;
    }
  }, []);

  const deleteFolder = useCallback(async (id: string) => {
    try {
      await dbService.deleteFolder(id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete folder:", error);
      throw error;
    }
  }, []);

  const addNote = useCallback(async (note: Note) => {
    try {
      await dbService.addNote(note);
      await loadData();
    } catch (error) {
      console.error("Failed to add note:", error);
      throw error;
    }
  }, []);

  const getNote = useCallback(async (id: string) => {
    try {
      const note = await dbService.getNote(id);
      return note;
    } catch (error) {
      console.error("Failed to get note:", error);
      throw error;
    }
  }, []);

  const updateNote = useCallback(async (note: Note) => {
    try {
      await dbService.updateNote(note);
      await loadData();
    } catch (error) {
      console.error("Failed to update note:", error);
      throw error;
    }
  }, []);

  const deleteNote = useCallback(async (id: string) => {
    try {
      await dbService.deleteNote(id);
      await loadData();
    } catch (error) {
      console.error("Failed to delete note:", error);
      throw error;
    }
  }, []);

  const exportData = useCallback(async () => {
    try {
      const data = await dbService.export();
      const json = JSON.stringify(data);
      console.log(data)
      // Download file
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      link.download = "textmark-backup.json";

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export data:", error);
      throw error;
    }
  }, []);

  const importData = useCallback(async (data: Data) => {
    try {
      data.folders.forEach(folder => dbService.addFolder(folder));
      data.notes.forEach(note => dbService.addNote(note));
      await loadData();
    } catch (error) {
      console.error("Failed to export data:", error);
      throw error;
    }
  }, []);

  return {
    isDBReady,
    folders,
    notes,
    addFolder,
    deleteFolder,
    addNote,
    getNote,
    updateNote,
    deleteNote,
    refreshData: loadData,
    exportData,
    importData
  };
};
