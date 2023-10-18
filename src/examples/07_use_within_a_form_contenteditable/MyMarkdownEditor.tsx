import { useEffect, useRef } from "react"

import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

function findNearestFormAncestor(element: HTMLElement) {
    let currentElement = element as HTMLElement | null;

    while (currentElement) {
        if (currentElement.tagName === 'FORM') {
            return currentElement; // Found a form element, return it
        }

        currentElement = currentElement.parentElement; // Move up to the parent element
    }

    return null; // No form element found in the ancestor chain
}

export function MyMarkdownEditor(props: {
    name?: string;
    label?: string;
    initialValue?: string;
}) {


    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const easyMdeRef = useRef<EasyMDE | null>(null);

    useEffect(() => {

        if (!textareaRef.current) {
            throw new Error("Textarea ref not found.")
        }

        if (!easyMdeRef.current) {
            easyMdeRef.current = new EasyMDE({
                element: textareaRef.current,
                initialValue: props.initialValue,
                inputStyle: "contenteditable",  
                
            });

            const codeMirrorCodeEl = easyMdeRef.current.codemirror.getInputField()
            if (props.label) {
                codeMirrorCodeEl.setAttribute("aria-label", props.label);
            }
            codeMirrorCodeEl.setAttribute("data-testid", "markdown-editor");
           
            const formElement = findNearestFormAncestor(textareaRef.current);

            if (formElement) {
                const hiddenInput = document.createElement("input");
                if (props.name) {
                    hiddenInput.setAttribute("name", props.name);
                }
                hiddenInput.setAttribute("type", "hidden");
                
                easyMdeRef.current.codemirror.getWrapperElement().appendChild(hiddenInput);

                // Fix for: https://github.com/Ionaru/easy-markdown-editor/issues/559
                formElement.addEventListener("reset", () => {
                    hiddenInput.value= easyMdeRef.current?.value() ?? '';
                    setTimeout(() => {
                        easyMdeRef.current?.value(props.initialValue ??'')
                        
                    }, 0)
                })
                
                formElement.addEventListener("submit", () => {
                    hiddenInput.value= easyMdeRef.current?.value() ?? '';
                })

            }
        }
        return () => {

        }
    }, [])

    return <textarea ref={textareaRef}></textarea>
}