// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    performTaskWithinElement(options: {
      parentSelector: string;
      selector: string;
      elementType: "button" | "input" | "select";
      content?: string;
    }): Chainable;
  }
}

// Finally add the custom command

Cypress.Commands.add(
  "performTaskWithinElement",
  ({ parentSelector, selector, elementType, content }) => {
    cy.wait(100);
    cy.get("body").then(($body) => {
      cy.get(parentSelector, { timeout: 10000 })
        .last()
        .within(($el) => {
          if (elementType == "button") {
            cy.get(selector, { timeout: 10000 })
              .scrollIntoView()
              .click({ force: true, multiple: true });
          } else if (elementType == "input") {
            cy.get(selector, { timeout: 10000 })
              .eq(0)
              .scrollIntoView()
              .click({ force: true })
              .type(content!, { force: true });
          } else if (elementType == "select") {
            cy.get(selector, { timeout: 10000 })
              .eq(0)
              .scrollIntoView()
              .select(content!);
          }
        });
    });
  }
);
