import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import type{JSONContent} from  "@tiptap/react"

function BasicEditor({ content }: { content: JSONContent | undefined }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({ placeholder: "Write something..." }),
            Underline,
            Link,
        ],
        content: content,
    })
    if(content===undefined){
        return(
            <div className=" w-full h-full flex justify-center items-center">
                No Data Available
            </div>
        )
    }
    return (
        <div className="w-full h-full">
            <div className="w-full flex flex-wrap gap-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => editor.chain().focus().toggleBold().run()}>
                Bold
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => editor.chain().focus().toggleItalic().run()}>
                Italic
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => editor.chain().focus().toggleUnderline().run()}>
                Underline
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                H1
            </button>
            <button onClick={()=>console.log(editor.getJSON())}>get JSON</button>
            </div>
        <EditorContent editor={editor}  className="border-0"/>
        </div>
    )
}
export default BasicEditor;