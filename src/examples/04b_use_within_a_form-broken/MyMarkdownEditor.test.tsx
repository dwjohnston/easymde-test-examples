
import { render, screen, userEvent } from '../../testUtils/testUtils'
import { expect, test,vi } from 'vitest'
import { MyMarkdownEditor } from "./MyMarkdownEditor";

test("Sanity test - textarea", async () => {
    render(<input />);
    await userEvent.type(screen.getByRole("textbox"), "Hello World!");
    expect(screen.getByRole("textbox")).toHaveValue("Hello World!")
});

test("MyMarkdownEditor", async () => {

    render(<MyMarkdownEditor />)
    await userEvent.type(screen.getByRole("textbox"),"Hello World!");
    expect(screen.getByRole("textbox")).toHaveValue("Hello World!")

    await userEvent.clear(screen.getByRole("textbox"))
    await userEvent.type(screen.getByRole("textbox"), "Goodbye World!");
    expect(screen.getByRole("textbox")).toHaveValue("Goodbye World!");
})

test("MyMarkdownEditor - form submission", async  () => {
    const submitHandler = vi.fn();
    render(<form onSubmit = {(e) => {
        e.preventDefault(); 
        const formData = new FormData(e.currentTarget); 
        const markdown = formData.get("markdown");

        submitHandler(markdown);
    }}><MyMarkdownEditor name ="markdown" label ="Enter Markdown"/>
        <button type ="submit">Submit</button>
    </form>)

    await userEvent.type(screen.getByRole("textbox", {name: "Enter Markdown"}), "Hello World!"); 
    await userEvent.click(screen.getByRole("button", {name: "Submit"})); 

    expect(submitHandler).toHaveBeenCalledWith("Hello World!")

}); 