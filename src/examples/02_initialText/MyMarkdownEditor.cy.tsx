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

        cy.get(".CodeMirror textarea").clear().type("Goodbye World!", {force: true});
        cy.get(".CodeMirror textarea").should("have.value", "Goodbye World!")


    })
  it.only('Can find by role and type - if we use force', () => {
    cy.mount(<MyMarkdownEditor initialText='Foo'/>);

    cy.findByRole("textbox").should("have.value", "Foo")

    cy.findByRole("textbox").clear().type("Goodbye World!", {force: true});
    cy.findByRole("textbox").should("have.value", "Goodbye World!")
  });
});