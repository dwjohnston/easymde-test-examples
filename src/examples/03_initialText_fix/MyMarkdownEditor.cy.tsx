import {MyMarkdownEditor} from './MyMarkdownEditor';

describe('MyMarkdownEditor', () => {


    it("Sanity test - textarea", () => {
      cy.mount(<textarea/>);
      cy.findByRole("textbox").type("Hello World!");
      cy.findByRole("textbox").should("have.value", "Hello World!")

    }); 

    it("Can interact with straight css selectors - if we use force", () => {
        cy.mount(<MyMarkdownEditor initialText='Foo'/>);

        // Note that there are two, so we can't just select it that way
        cy.get('textarea').should("have.length", 2);


        cy.get(".CodeMirror textarea").should("have.value", "Foo")

        cy.get(".CodeMirror textarea").clear({force: true}).type("Goodbye World!", {force: true});
        cy.get(".CodeMirror textarea").should("have.value", "Goodbye World!")


    })
  it.only('Can find by role and type - if we use force', () => {
    cy.mount(<MyMarkdownEditor initialText='Foo'/>);

    cy.findByRole("textbox").should("have.value", "Foo")

    cy.findByRole("textbox").clear({force:true}).type("Goodbye World!", {force: true});
    // These are fine, the text in the textarea is clear and entered fine. 
    // The text that remains is in easymde, but is not part of the text area
    cy.findByRole("textbox").should("have.value", "Goodbye World!")
    cy.findByRole("textbox").should("not.have.value", "Goodbye World!oo")

    // Errors 
    cy.get(".CodeMirror-line").should("have.text", "Goodbye World!")
    cy.get(".CodeMirror-line").should("not.have.text", "Goodbye World!oo")

  });
});