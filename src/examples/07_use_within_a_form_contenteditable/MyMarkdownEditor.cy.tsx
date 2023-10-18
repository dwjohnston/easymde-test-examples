import { MyMarkdownEditor } from './MyMarkdownEditor';

describe('MyMarkdownEditor', () => {

  it("Sanity test - contentEditable div", () => {
    cy.mount(<div contentEditable data-testid="markdown-editor"/>);
    cy.findByTestId("markdown-editor").type("Hello World!");
    cy.findByTestId("markdown-editor").should("have.text", "Hello World!")

  }); 

  it("Sanity test 2 -contentEditable div with initial", () => {
    cy.mount(<div contentEditable data-testid="markdown-editor">Foo</div>);
    cy.findByTestId("markdown-editor").clear().type("Hello World!");
    cy.findByTestId("markdown-editor").should("have.text", "Hello World!")

  }); 

it('Can interact with assert on text - no need for force', () => {
  cy.mount(<MyMarkdownEditor/>);

  cy.findByTestId("markdown-editor").type("Hello World!");
  cy.findByTestId("markdown-editor").should("have.text", "Hello World!")

  cy.findByTestId("markdown-editor").clear().type("Goodbye World!");
  cy.findByTestId("markdown-editor").should("have.text", "Goodbye World!")
});
  it("Can be submitted in a form", () => {

    const submitSpy = cy.spy().as("submitSpy");
    cy.mount(<form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const markdownValue = formData.get("markdown");
        submitSpy(markdownValue);
      }}
    >
      <MyMarkdownEditor name="markdown" />
      <button type="submit">Submit</button>
    </form>);

    cy.findByTestId("markdown-editor").type("Hello World!" );
    cy.findByTestId("markdown-editor").should("have.text", "Hello World!")
    cy.findByRole("button", { name: "Submit" }).click();

    cy.get("@submitSpy").should("have.been.calledWith", "Hello World!")

  });

  it("Initial Value Works", () => {

    const submitSpy = cy.spy().as("submitSpy");
    cy.mount(<form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const markdownValue = formData.get("markdown");
        submitSpy(markdownValue);
      }}
    >
      <MyMarkdownEditor name="markdown" initialValue='Foo Bar' label ="Enter Text"/>
      <button type="submit">Submit</button>
    </form>);

    cy.findByRole("button", { name: "Submit" }).click();
    cy.get("@submitSpy").should("have.been.calledWith", "Foo Bar")

    cy.findByTestId("markdown-editor").clear().type("Hello World!"); 
    cy.findByTestId("markdown-editor").should("have.text", "Hello World!")

    cy.findByRole("button", { name: "Submit" }).click();
    cy.get("@submitSpy").should("have.been.calledWith", "Hello World!")
  });

  it("Reset works", () => {

    const submitSpy = cy.spy().as("submitSpy");
    const resetSpy = cy.spy().as("resetSpy");
    cy.mount(<form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const markdownValue = formData.get("markdown");
        submitSpy(markdownValue);
      }}

      onReset={(e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const markdownValue = formData.get("markdown");
        resetSpy(markdownValue);
      }}
    >
      <MyMarkdownEditor name="markdown" initialValue="foo" label="My Label" />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>);


    cy.findByTestId("markdown-editor").should("have.text", "foo")
    cy.findByRole("button", { name: "Reset" }).click();
    cy.get("@resetSpy").should("have.been.calledWith", "foo")

    cy.findByTestId("markdown-editor").clear().type("Hello World!" );
    cy.findByTestId("markdown-editor").should("have.text", "Hello World!")

    cy.findByRole("button", { name: "Reset" }).click();
    cy.get("@resetSpy").should("have.been.calledWith", "Hello World!")
    cy.findByTestId("markdown-editor").should("not.have.text", "Hello World!")
    cy.findByTestId("markdown-editor").should("have.text", "foo")

  });
});