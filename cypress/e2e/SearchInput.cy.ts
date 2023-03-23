import { SEARCH_FORM_INPUT } from '../../src/constants/tests.constants';

describe('template spec', () => {
  it('receives console log output after click on search button', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });

    cy.get(`[data-testid=${SEARCH_FORM_INPUT}]`).type('hello');
    cy.contains('button', 'SEARCH').click();

    cy.get(`[data-testid=${SEARCH_FORM_INPUT}]`).then((input) => {
      cy.get('@consoleLog').should('be.calledWith', input.val());
    });
  });
});
