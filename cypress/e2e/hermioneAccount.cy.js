/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Bank app', () => {
  const depositAmount = faker.number.int({ min: 500, max: 1000 });
  const withdrawAmount = faker.number.int({ min: 50, max: 500 });
  const user = 'Harry Potter';
  const accountNumber = '1004';

  before(() => {
    cy.visit('/');
  });

  it('should provide the ability to work with bank account', () => {
    // Login
    cy.contains('.btn', 'Customer Login').click();
    cy.get('[name="userSelect"]').select(user);
    cy.contains('.btn', 'Login').click();

    const accountInfoSelector = '[ng-hide="noAccount"]';

    // Account number
    cy.get(accountInfoSelector)
      .contains('strong', accountNumber)
      .should('be.visible');
    cy.get(accountInfoSelector)
      .contains('strong', accountNumber);

    // Initial balance
    cy.get(accountInfoSelector)
      .contains('strong', '0')
      .should('be.visible');
    cy.get(accountInfoSelector)
      .contains('strong', '0');

    cy.contains('.ng-binding', 'Dollar').should('be.visible');

    // Deposit
    cy.get('[ng-click="deposit()"]').click();
    // Deposit
    cy.get('[ng-click="deposit()"]').click();
    cy.get('[ng-hide="noAccount"]')
      .contains('strong', accountNumber)
      .should('be.visible');

    cy.get('[ng-hide="noAccount"]')
      .contains('strong', accountNumber)
      .click();

    cy.contains('[type="submit"]', 'Deposit').click();

    cy.get('[type="submit"]').contains('Deposit').click();

    cy.get('[ng-show="message"]').should(
      'contain.text',
      'Deposit Successful'
    );

    // Najpierw sprawdzamy widoczność
    cy.get(accountInfoSelector)
      .contains('strong', depositAmount)
      .should('be.visible');

    // Jeśli potrzebujesz kliknąć lub dalej użyć tego elementu
    cy.get(accountInfoSelector)
      .contains('strong', depositAmount)
      .should('be.visible');
    cy.get(accountInfoSelector)
      .contains('strong', depositAmount)
      .click(); // np. kliknięcie lub inna akcja

    // Withdraw
    cy.get('[ng-click="withdrawl()"]').click();
    // Withdraw
    cy.get('[ng-click="withdrawl()"]').click();

    // Wpisanie kwoty do wypłaty
    // Wprowadzenie kwoty wypłaty
    // Wpisanie kwoty wypłaty
    cy.get('[placeholder="amount"]').clear();
    cy.get('[placeholder="amount"]').type(withdrawAmount);

    // Kliknięcie przycisku "Withdraw"
    cy.contains('[type="submit"]', 'Withdraw').click();

    // Sprawdzenie komunikatu o sukcesie
    // Sprawdzenie aktualnego salda po wypłacie
    const balance = depositAmount - withdrawAmount;
    cy.get(accountInfoSelector)
      .contains('strong', balance);

    cy.get(accountInfoSelector)
      .contains('strong', balance)
      .should('be.visible');
    cy.get(accountInfoSelector)
      .contains('strong', balance)
      .should('be.visible');

    cy.get('[type="submit"]').contains('Withdraw').click();

    cy.get('[ng-show="message"]').should(
      'contain.text',
      'Transaction successful'
    );

    const finalBalance = depositAmount - withdrawAmount;

    cy.get(accountInfoSelector)
      .contains('strong', finalBalance)
      .should('be.visible');
    cy.get(accountInfoSelector)
      .contains('strong', finalBalance);
  });
});
