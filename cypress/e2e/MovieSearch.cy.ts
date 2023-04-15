import { SEARCH_FORM_INPUT } from '../../src/constants/tests.constants';
import { REQUEST_URI } from '../../src/constants/movieListPage.constants';

describe('Movie search', () => {
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

  it('sends movie request with search query after click on search button', () => {
    cy.visit('/');

    cy.wait('@movieResponse');
    // Second time due to React strict mode
    cy.wait('@movieResponse');

    const userRequest = 'you';
    cy.get(`[data-testid=${SEARCH_FORM_INPUT}]`).type(userRequest);
    cy.contains('button', 'SEARCH').click();

    cy.wait('@movieResponse')
      .its('request.url')
      .should('include', `search=${userRequest}`);
  });
});
