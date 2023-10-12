import { useEffect, useRef } from "react"

import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

export function MyMarkdownEditor() {


    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {

        if(!textareaRef.current){
            throw new Error("Textarea ref not found.")
        }
        let easyMde = new EasyMDE({element: textareaRef.current});
        return () => {
            easyMde.toTextArea();
            easyMde.cleanup()
        }
    }, [])

    return <textarea ref={textareaRef}/>
}