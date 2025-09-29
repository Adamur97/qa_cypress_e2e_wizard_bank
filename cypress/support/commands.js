// cypress/support/commands.js

Cypress.Commands.add('loginAsHermione', () => {
  cy.contains('Customer Login').click();
  cy.get('#userSelect').select('Hermione Granger');
  cy.contains('Login').click();
});
