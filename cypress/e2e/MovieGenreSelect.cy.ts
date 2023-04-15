import {
  GENRE_ITEM_SELECTED,
  GENRE_ITEM_UNSELECTED,
} from '../../src/constants/tests.constants';
import { REQUEST_URI } from '../../src/constants/movieListPage.constants';

describe('Move genre select', () => {
  beforeEach(() => {
    cy.intercept('GET', `${REQUEST_URI}/movies*`, {
      fixture: 'movieResponse.json',
    }).as('movieResponse');
    cy.intercept('GET', '/test/media/how_to_train_your_dragon_2.jpg', {
      fixture: 'media/how_to_train_your_dragon_2.jpg',
    }).as('howToTrainYouDragon2Image');
    cy.intercept('GET', '/test/media/how_to_train_your_dragon.jpg', {
      fixture: 'media/how_to_train_your_dragon.jpg',
    }).as('howToTrainYouDragonImage');
    cy.intercept('GET', '/test/media/thank_you_for_smoking.jpg', {
      fixture: 'media/thank_you_for_smoking.jpg',
    }).as('thankYouForSmokingImage');
    cy.intercept('GET', '/test/media/now_you_see_me_2.jpg', {
      fixture: 'media/now_you_see_me_2.jpg',
    }).as('nowYouSeeMe2Image');
    cy.intercept('GET', '/test/media/he_is_just_not_that_into_you.jpg', {
      fixture: 'media/he_is_just_not_that_into_you.jpg',
    }).as('heIsJustNotThatIntoYouImage');
    cy.intercept('GET', '/test/media/now_you_see_me.jpg', {
      fixture: 'media/now_you_see_me.jpg',
    }).as('nowYouSeeMeImage');
  });

  it('sends movie request with unselected genre after click on the selected element', () => {
    cy.visit('/');

    cy.wait('@movieResponse');
    // Second time due to React strict mode
    cy.wait('@movieResponse');

    const dramaGenre = 'Drama';
    cy.get(`[data-testid=${GENRE_ITEM_UNSELECTED}]`)
      .contains(dramaGenre)
      .click();

    cy.get(`[data-testid=${GENRE_ITEM_SELECTED}]`).should(
      'have.text',
      dramaGenre
    );
    cy.wait('@movieResponse')
      .its('request.url')
      .should('include', `filter=${dramaGenre}`);
  });
});
