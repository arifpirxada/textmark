"use client"
import FolderSidebar from '@/components/editor/FolderSidebar'
import MarkdownEditor from '@/components/editor/MarkdownEditor'
import { use, useEffect, useState } from 'react';

const EditorPage = ({ id }: { id: string }) => {
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
        <FolderSidebar sidebarOpen={ sidebarOpen } toggleSidebar={ toggleSidebar }>
            <MarkdownEditor id={ id } toggleSidebar={ toggleSidebar } />
        </FolderSidebar>
    )
}

export default EditorPage