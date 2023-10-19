import { useEffect, useRef } from "react"

import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

export function MyMarkdownEditor(props:{
    initialValue?: string
}) {


    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const easyMdeRef = useRef<EasyMDE | null>(null);

    useEffect(() => {

        if(!textareaRef.current){
            throw new Error("Textarea ref not found.")
        }

        // We only ever want EasyMDE to instantiate itself once.
        // ie. We're doing this to avoid double render problems that show themselves in React 18. 
        if(!easyMdeRef.current){
            easyMdeRef.current= new EasyMDE({element: textareaRef.current, 
            initialValue: props.initialValue});

            const widthToBe = easyMdeRef.current.codemirror.getWrapperElement().clientWidth;
            const existingStyle = easyMdeRef.current.codemirror.getInputField().getAttribute("style")
            easyMdeRef.current.codemirror.getInputField().setAttribute('style', existingStyle + `width: ${widthToBe}px; z-index:100; border: solid 1px red;`)
            easyMdeRef.current.codemirror.getInputField().value = props.initialValue ?? '';
            const parent =  easyMdeRef.current.codemirror.getInputField().parentElement
            const parentStyle = parent?.getAttribute("style"); 
            parent?.setAttribute("style", parentStyle + "overflow: visible;");
        }

    }, [])

    return <textarea ref={textareaRef}/>
}