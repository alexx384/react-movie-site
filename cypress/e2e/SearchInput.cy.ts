describe('template spec', () => {
  it('receives console log output after click on search button', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });

    cy.get('[data-testid=searchMovieInput]').type('hello');
    cy.contains('button', 'SEARCH').click();

    cy.get('[data-testid=searchMovieInput]').then((input) => {
      cy.get('@consoleLog').should('be.calledWith', input.val());
    });
  });
});
