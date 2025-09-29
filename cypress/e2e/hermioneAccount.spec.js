/// <reference types="cypress" />

describe('Hermione Granger Bank Account Flow', () => {
  beforeEach(() => {
    cy.visit(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login'
    );
    cy.loginAsHermione();
  });

  it('should display correct account information after login', () => {
    cy.get('.center strong').eq(0).should('contain.text', '1001'); // Account number
    cy.get('.center strong').eq(1).should('contain.text', '0'); // Initial balance
    cy.get('.center strong').eq(2).should('contain.text', 'Rupee'); // Currency
  });

  it('should allow Hermione to deposit money', () => {
    cy.contains('Deposit').click();
    cy.get('input[type="number"]').type('100');
    cy.get('form button').click();

    cy.get('.error').should('contain.text', 'Deposit Successful');
    cy.get('.center strong').eq(1).should('contain.text', '100'); // Balance updated
  });

  it('should allow Hermione to withdraw money', () => {
    // Najpierw deponujemy, żeby mieć saldo
    cy.contains('Deposit').click();
    cy.get('input[type="number"]').type('100');
    cy.get('form button').click();

    cy.contains('Withdrawl').click();
    cy.get('input[type="number"]').type('50');
    cy.get('form button').click();

    cy.get('.error').should('contain.text', 'Transaction successful');
    cy.get('.center strong').eq(1).should('contain.text', '50'); // Balance after withdrawal
  });

  it('should display transactions after deposit and withdrawal', () => {
    // Najpierw deponujemy i wypłacamy
    cy.contains('Deposit').click();
    cy.get('input[type="number"]').type('100');
    cy.get('form button').click();

    cy.contains('Withdrawl').click();
    cy.get('input[type="number"]').type('50');
    cy.get('form button').click();

    // Sprawdzamy historię
    cy.contains('Transactions').click();
    cy.get('table tbody tr').should('have.length', 2);

    cy.get('table tbody tr')
      .first()
      .should('contain.text', 'Credit')
      .and('contain.text', '100');
    cy.get('table tbody tr')
      .last()
      .should('contain.text', 'Debit')
      .and('contain.text', '50');
  });

  it('should not show transactions after switching account', () => {
    // Najpierw deponujemy dla pewności
    cy.contains('Deposit').click();
    cy.get('input[type="number"]').type('100');
    cy.get('form button').click();

    cy.contains('Back').click();
    cy.get('#accountSelect').select('1002'); // Zmiana konta

    cy.contains('Transactions').click();
    cy.get('table tbody tr').should('have.length', 0); // brak transakcji
  });

  it('should log out Hermione successfully', () => {
    cy.contains('Logout').click();
    cy.contains('Your Name :').should('be.visible'); // powrót do loginu
  });
});
