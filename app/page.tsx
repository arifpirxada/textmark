"use client"
import MarkdownEditor from "@/components/editor/MarkdownEditor";
import FolderSidebar from "@/components/editor/FolderSidebar";
import { useEffect, useState } from "react";

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);

    localStorage.setItem("sidebarState", JSON.stringify(!sidebarOpen));
  }

  useEffect(() => {
    const sidebarState = localStorage.getItem("sidebarState");

    if(sidebarState) {
      setSidebarOpen(JSON.parse(sidebarState));
    }
  }, [])

  return (
    <>
      <FolderSidebar sidebarOpen={sidebarOpen}>
        <MarkdownEditor toggleSidebar={toggleSidebar} />
      </FolderSidebar>
    </>
  );
}
