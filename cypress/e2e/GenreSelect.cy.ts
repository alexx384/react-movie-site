import {
  GENRE_ITEM_SELECTED,
  GENRE_ITEM_UNSELECTED,
} from '../../src/constants/tests.constants';

describe('Genre Select', () => {
  it('receives console log output after click on the selected element', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });

    cy.get(`[data-testid=${GENRE_ITEM_SELECTED}]`).click();

    cy.get(`[data-testid=${GENRE_ITEM_SELECTED}]`).then((item) => {
      cy.get('@consoleLog').should('be.calledWith', 'Genre is', item.text());
    });
  });

  it('receives console log output and updates attributes after click on the unselected element', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.console, 'log').as('consoleLog');
      },
    });
    let selectedGenreText;
    cy.get(`[data-testid=${GENRE_ITEM_UNSELECTED}]`)
      .eq(0)
      .then((item) => (selectedGenreText = item.text()));

    cy.get(`[data-testid=${GENRE_ITEM_UNSELECTED}]`).eq(0).click();

    cy.get(`[data-testid=${GENRE_ITEM_SELECTED}]`)
      .should((item) => {
        expect(item).have.text(selectedGenreText);
      })
      .then((item) => {
        cy.get('@consoleLog').should('be.calledWith', 'Genre is', item.text());
      });
  });
});
