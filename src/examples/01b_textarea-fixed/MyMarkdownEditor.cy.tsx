import {MyMarkdownEditor} from './MyMarkdownEditor';

describe('MyMarkdownEditor', () => {


    it("Can interact with straight css selectors - if we use force", () => {
        cy.mount(<MyMarkdownEditor/>);

        // Note that there are two, so we can't just select it that way
        cy.get('textarea').should("have.length", 2);

        // Be specific about which one we want to interact with   
        cy.get(".CodeMirror textarea").type("Hello World!");
        // Will not work
        //cy.get(".CodeMirror textarea").should("have.text", "Hello World!")
        cy.get(".CodeMirror textarea").should("have.value", "Hello World!")

        // Checking that `.clear` works.
        cy.get(".CodeMirror textarea").clear().type("Goodbye World!", {force: true});
        // Will not work
        //cy.get(".CodeMirror textarea").should("have.text", "Goodbye World!")
        cy.get(".CodeMirror textarea").should("have.value", "Goodbye World!")


    })
  it('Can find by role and type - if we use force', () => {
    cy.mount(<MyMarkdownEditor/>);

    cy.findByRole("textbox").type("Hello World!", {force: true});
    // Will not work
    // cy.findByRole("textbox").should("have.text", "Hello World!")
    cy.findByRole("textbox").should("have.value", "Hello World!")


    cy.findByRole("textbox").click().clear().type("Goodbye World!", {force: true});
    // Will not work
    // cy.findByRole("textbox").should("have.text", "Goodbye World!")
    cy.findByRole("textbox").should("have.value", "Goodbye World!")


  });

  it.only('Initial value clears properly', () => {
    cy.mount(<MyMarkdownEditor initialValue='foo'/>);

    cy.findByRole("textbox").should("have.value", "foo")
    cy.findByRole("textbox").type("{selectall}")


    // cy.findByRole("textbox").type("Hello World!", {force: true});
    // // Will not work
    // // cy.findByRole("textbox").should("have.text", "Hello World!")
    // cy.findByRole("textbox").should("have.value", "Hello World!")


    // cy.findByRole("textbox").clear().type("Goodbye World!", {force: true});
    // // Will not work
    // // cy.findByRole("textbox").should("have.text", "Goodbye World!")
    // cy.findByRole("textbox").should("have.value", "Goodbye World!")


  });
});