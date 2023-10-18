import {MyMarkdownEditor} from './MyMarkdownEditor';

describe('MyMarkdownEditor', () => {


    it("Sanity test - textarea", () => {
      cy.mount(<textarea/>);
      cy.findByRole("textbox").type("Hello World!");
      cy.findByRole("textbox").should("have.value", "Hello World!")

    }); 

    it("Can interact with straight css selectors - if we use force", () => {
        cy.mount(<MyMarkdownEditor/>);

        // Note that there are two, so we can't just select it that way
        cy.get('textarea').should("have.length", 2);

        // Be specific about which one we want to interact with   
        cy.get(".CodeMirror textarea").type("Hello World!", {force: true});
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
});