import React from 'react'
import ReactDOM from 'react-dom/client'
import { MyMarkdownEditor as MyMarkdownEditor1 } from "./examples/01_gettingStarted/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor1b } from "./examples/01b_textarea-fixed/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor2 } from "./examples/02_initialText/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor3 } from "./examples/03_initialText_fix/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor4 } from "./examples/04_use_within_a_form/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor5 } from "./examples/05_contenteditable/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor6 } from "./examples/06_contenteditable-with-improvements/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor7 } from "./examples/07_use_within_a_form_contenteditable/MyMarkdownEditor";


function Example(props: React.PropsWithChildren<{
  title: string
}>) {
  return <div>
    <h2>{props.title}</h2>
    {props.children}
  </div>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
hello
     {/* <Example title="01 - Initial">
      <MyMarkdownEditor1 />
    </Example>
     <Example title="01b - Initial">
      <MyMarkdownEditor1b />
    </Example> 
    <Example title="02 - ContentEditable">
      <MyMarkdownEditor2 />
    </Example>
    <Example title="03 - ContentEditable With Improvements">
      <MyMarkdownEditor3 />
    </Example> */}
    <Example title="04 - Use Within Forms">
      <form onSubmit={(e) => {
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget); 
        const value = formData.get("foo"); 
        alert(value);
      }} 
      onReset={(e) => {
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget); 
        const value = formData.get("foo"); 
        alert(value);
      }} 
      >
      <MyMarkdownEditor4 name ="foo" initialValue='foo'/>
      <button type ="submit">Submit</button>
      <button type ="reset">Reset</button>
      </form>
    </Example> 

  </React.StrictMode>,
)
