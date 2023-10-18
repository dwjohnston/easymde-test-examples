import { MyMarkdownEditor } from './MyMarkdownEditor';

describe('MyMarkdownEditor', () => {

  it("Sanity test - textarea", () => {
    cy.mount(<textarea/>);
    cy.findByRole("textbox").type("Hello World!");
    cy.findByRole("textbox").should("have.value", "Hello World!")

  }); 

  it("Sanity test 2 - textarea with initial", () => {
    cy.mount(<textarea defaultValue="foo"/>);
    cy.findByRole("textbox").clear().type("Hello World!");
    cy.findByRole("textbox").should("have.value", "Hello World!")

  }); 


  it("Can interact with straight css selectors - if we use force", () => {
      cy.mount(<MyMarkdownEditor/>);

      // Note that there are two, so we can't just select it that way
      cy.get('textarea').should("have.length", 2);

      // Be specific about which one we want to interact with   
      cy.get(".CodeMirror textarea").type("Hello World!", {force:true});
      cy.get(".CodeMirror textarea").should("have.value", "Hello World!")

      // Checking that `.clear` works.
      cy.get(".CodeMirror textarea").clear().type("Goodbye World!", {force: true});
      cy.get(".CodeMirror textarea").should("have.value", "Goodbye World!")


  })
it('Can find by role and type - if we use force', () => {
  cy.mount(<MyMarkdownEditor/>);

  cy.findByRole("textbox").type("Hello World!", {force: true});
  cy.findByRole("textbox").should("have.value", "Hello World!")

  cy.findByRole("textbox").clear().type("Goodbye World!", {force: true});
  cy.findByRole("textbox").should("have.value", "Goodbye World!")
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

    cy.findByRole("textbox").type("Hello World!", {force:true});
    cy.findByRole("textbox").should("have.value", "Hello World!")
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
  });


  it.only("Initial Value + extra text works", () => {

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

    cy.findByRole("textbox", {name: "Enter Text"}).type("Hello World!", {force:true});

    // The textarea won't be updated until form submission so we can't make these assertions. 
    // cy.findByRole("textbox", {name: "Enter Text"}).should("have.value", "Hello World!Foo Bar");

    cy.findByRole("button", { name: "Submit" }).click();


    // Sanity test - seeing what the text editor is actually showing.
    cy.get(".CodeMirror-line").should("have.text", "Hello World!Foo Bar"); 


    // expected submitSpy to have been called with arguments "Hello World!Foo Bar"
    // The following calls were made:
    // submitSpy("Foo Bar")
    // submitSpy("Hello World!") at submitSpy
    cy.get("@submitSpy").should("have.been.calledWith", "Hello World!Foo Bar")

  });

  it("Reset works - resets the text, calls reset with current value", () => {

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
      <MyMarkdownEditor name="markdown" label="My Label" />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>);

    cy.findByRole("textbox", {name: "My Label"}).type("Hello World!", {force:true});
    cy.findByRole("textbox", {name: "My Label"}).should("have.value", "Hello World!")

    cy.findByRole("button", { name: "Reset" }).click();
    cy.get("@resetSpy").should("have.been.calledWith", "Hello World!")
    cy.findByRole("textbox", {name: "My Label"}).should("not.have.value", "Hello World!")
    cy.findByRole("textbox", {name: "My Label"}).should("have.value", "")


  });

  it("Reset works (initial value) - resets the text, calls reset with current value", () => {

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
      <MyMarkdownEditor name="markdown" label="My Label" initialValue='Foo'/>
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>);

    cy.findByRole("button", { name: "Reset" }).click();
    cy.get("@resetSpy").should("have.been.calledWith", "Foo")



    cy.findByRole("textbox").type("Hello World!", {force:true});
    cy.findByRole("textbox").should("have.value", "Hello World!")

    cy.findByRole("button", { name: "Reset" }).click();
    cy.get("@resetSpy").should("have.been.calledWith", "Hello World!")
    cy.findByRole("textbox").should("not.have.text", "Hello World!")
    cy.findByRole("textbox").should("have.text", "")

  });
});