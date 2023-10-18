import React from 'react'
import ReactDOM from 'react-dom/client'
import { MyMarkdownEditor as MyMarkdownEditor1 } from "./examples/01_initial/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor1b } from "./examples/01b_textarea-fixed/MyMarkdownEditor";

import { MyMarkdownEditor as MyMarkdownEditor2 } from "./examples/02_contenteditable/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor3 } from "./examples/03_contenteditable-with-improvements/MyMarkdownEditor";
import { MyMarkdownEditor as MyMarkdownEditor4 } from "./examples/04_use_within_a_form/MyMarkdownEditor";


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
    </Example> */}
    <Example title="01b - Initial">
      <MyMarkdownEditor1b />
    </Example>
    {/* <Example title="02 - ContentEditable">
      <MyMarkdownEditor2 />
    </Example>
    <Example title="03 - ContentEditable With Improvements">
      <MyMarkdownEditor3 />
    </Example>
    <Example title="04 - Use Within Forms">
      <MyMarkdownEditor4 />
    </Example> */}

  </React.StrictMode>,
)
