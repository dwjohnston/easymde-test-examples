import {MyMarkdownEditor} from './MyMarkdownEditor';

describe('MyMarkdownEditor', () => {


    it("Can interact with straight class name selectors", () => {
        cy.mount(<MyMarkdownEditor/>);
        cy.get(".CodeMirror-code").type("Hello World!");
        cy.get(".CodeMirror-code").should("have.text", "Hello World!");
        // Will not work
        // cy.get(".CodeMirror-code").should("have.value", "Hello World!");

        cy.get(".CodeMirror-code").clear().type("Goodbye World!");
        cy.get(".CodeMirror-code").should("have.text", "Goodbye World!");
    })
  it('Can find by role and type - we do not need force', () => {
    cy.mount(<MyMarkdownEditor/>);

    cy.findByRole("textbox").type("Hello World!");
    cy.findByRole("textbox").should("have.text", "Hello World!")

    // Will not work
    // cy.findByRole("textbox").should("have.value", "Hello World!")

   
    cy.findByRole("textbox").clear().type("Goodbye World!");
    cy.findByRole("textbox").should("have.text", "Goodbye World!")
    // Will not work
    // cy.findByRole("textbox").should("have.value", "Goodbye World!")

  });


});