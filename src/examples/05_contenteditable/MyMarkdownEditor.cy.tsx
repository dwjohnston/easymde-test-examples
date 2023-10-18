import {MyMarkdownEditor} from './MyMarkdownEditor';

describe('MyMarkdownEditor', () => {


  it("Can interact with straight class name selectors - no need for force", () => {
      cy.mount(<MyMarkdownEditor/>);
      cy.get(".CodeMirror-code").type("Hello World!");
      cy.get(".CodeMirror-code").should("have.text", "Hello World!");

      // But have.value won't work.
      //cy.get(".CodeMirror-code").should("have.value", "Hello World!");

      cy.get(".CodeMirror-code").clear().type("Goodbye World!");
      cy.get(".CodeMirror-code").should("have.text", "Goodbye World!");
  })
  it('Can find by role and type - if we use force', () => {
    cy.mount(<MyMarkdownEditor/>);

    // However, we can't find by role now    
    cy.findByRole("textbox").should("not.exist");
  });
});