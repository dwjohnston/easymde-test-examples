import { useEffect, useRef } from "react"

import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";

/**
 * This function generated by ChatGPT
 * Traverse the DOM upward and find our nearest <form> parent, if any.
 */
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

            // Add the aria-label, testid to the contenteditable div
            const codeMirrorCodeEl = easyMdeRef.current.codemirror.getInputField()
            if (props.label) {
                codeMirrorCodeEl.setAttribute("aria-label", props.label);
            }
            codeMirrorCodeEl.setAttribute("data-testid", "markdown-editor");
           
            const formElement = findNearestFormAncestor(textareaRef.current);

            if (formElement) {

                // Add a hidden input in, this is what will be submitted in forms
                const hiddenInput = document.createElement("input");
                if (props.name) {
                    hiddenInput.setAttribute("name", props.name);
                }
                hiddenInput.setAttribute("type", "hidden");                
                easyMdeRef.current.codemirror.getWrapperElement().appendChild(hiddenInput);

                // Fix for: https://github.com/Ionaru/easy-markdown-editor/issues/559
                formElement.addEventListener("reset", () => {
                    // First set the textarea value to be the current value, so that the reset event fires with that
                    hiddenInput.value= easyMdeRef.current?.value() ?? '';

                    // And then reset it 
                    setTimeout(() => {
                        easyMdeRef.current?.value(props.initialValue ??'')
                        
                    }, 0)
                })
                
                // When we submit a form set the value into the hidden input
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