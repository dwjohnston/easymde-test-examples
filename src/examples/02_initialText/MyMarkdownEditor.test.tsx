// @vitest-environment jsdom

import { render, screen, userEvent } from '../../testUtils/testUtils'
import { expect, test } from 'vitest'
import { MyMarkdownEditor } from "./MyMarkdownEditor";


test("Sanity test - textarea", async () => {
    render(<input />);
    await userEvent.type(screen.getByRole("textbox"), "Hello World!");
    expect(screen.getByRole("textbox")).toHaveValue("Hello World!")
});

test("MyMarkdownEditor", async () => {

    render(<MyMarkdownEditor initialText='Foo' />)

    //   Expected the element to have value:
    //   Foo
    //   Received:
    //expect(screen.getByRole("textbox")).toHaveValue("Foo");

    await userEvent.clear(screen.getByRole("textbox"))
    await userEvent.type(screen.getByRole("textbox"), "Goodbye World!");
    expect(screen.getByRole("textbox")).toHaveValue("Goodbye World!");
})
