"use client"
import FolderSidebar from "@/components/editor/FolderSidebar";
import { useEffect, useState } from "react";
import OpenNote from "@/components/editor/OpenNote";

export default function Home() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);

    localStorage.setItem("sidebarState", JSON.stringify(!sidebarOpen));
  }

  useEffect(() => {
    const sidebarState = localStorage.getItem("sidebarState");

    if (sidebarState && window.innerWidth > 768) {
      setSidebarOpen(JSON.parse(sidebarState));
    }
  }, [])

  return (
    <>
      <FolderSidebar sidebarOpen={ sidebarOpen } toggleSidebar={ toggleSidebar }>
        <OpenNote toggleSidebar={ toggleSidebar } />
      </FolderSidebar>
    </>
  );
}
