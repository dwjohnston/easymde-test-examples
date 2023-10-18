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
                
            });

            const codeMirrorCodeEl = easyMdeRef.current.codemirror.getInputField()
            if (props.label) {
                codeMirrorCodeEl.setAttribute("aria-label", props.label);
            }

            if (props.name) {
                codeMirrorCodeEl.setAttribute("name", props.name);
            }

            codeMirrorCodeEl.value = props.initialValue ??'';        
            const formElement = findNearestFormAncestor(textareaRef.current);

            if (formElement) {
                // Fix for: https://github.com/Ionaru/easy-markdown-editor/issues/559


                formElement.addEventListener("submit", () => {
                    codeMirrorCodeEl.value= easyMdeRef.current?.value() ?? '';
                }); 

                formElement.addEventListener("reset", () => {
                    codeMirrorCodeEl.value= easyMdeRef.current?.value() ?? '';

                    setTimeout(() => {
                        easyMdeRef.current?.value(props.initialValue ??'')
                        codeMirrorCodeEl.value = props.initialValue ??''
                    }, 0)
                })


            }
        }
        return () => {

        }
    }, [])

    return <textarea ref={textareaRef}></textarea>
}