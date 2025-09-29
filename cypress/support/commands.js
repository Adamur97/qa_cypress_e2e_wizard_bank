// cypress/support/commands.js

Cypress.Commands.add('loginAsHermione', () => {
  cy.contains('Customer Login').should('be.visible').click();
  cy.get('#userSelect').should('be.visible')
    .select('Hermione Granger');
  cy.contains('.btn', 'Login').click();
});
