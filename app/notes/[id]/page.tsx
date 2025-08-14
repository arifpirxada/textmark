import EditorPage from '@/components/editor/EditorPage'

interface NotePageProps {
    params: { id: string };
}

const NotePage = ({ params }: NotePageProps) => {
    const { id } = params;

    return (
        <EditorPage id={ id } />
    )
}

export default NotePage