import { useEffect, useRef } from "react"

import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

export function MyMarkdownEditor() {


    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const easyMdeRef = useRef<EasyMDE | null>(null);

    useEffect(() => {

        if (!textareaRef.current) {
            throw new Error("Textarea ref not found.")
        }

        // We only ever want EasyMDE to instantiate itself once.
        // ie. We're doing this to avoid double render problems that show themselves in React 18. 
        if (!easyMdeRef.current) {
            easyMdeRef.current = new EasyMDE({
                element: textareaRef.current,
                inputStyle: "contenteditable"
            });
        }
    }, [])

    return <textarea ref={textareaRef} />
}