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

        if (!easyMdeRef.current) {
            easyMdeRef.current = new EasyMDE({
                element: textareaRef.current,
                inputStyle: "contenteditable", 
                

            });
            easyMdeRef.current.codemirror.getInputField().setAttribute("role", "textbox");
        }
        return () => {

        }
    }, [])

    return <textarea ref={textareaRef} />
}