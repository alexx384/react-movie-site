import {
  SEARCH_FORM_INPUT,
  MOVIE_SORT_CONTROL,
  MOVIE_SELECTED_SORT_OPTION,
  MENU_CONTEXT_CONTAINER,
  MOVIE_TILE_IMAGE,
  MOVIE_DETAILS_NAME,
  MOVIE_DETAILS_RATING,
  MOVIE_DETAILS_DESCRIPTION,
  MOVIE_DETAILS_IMAGE,
  MOVIE_HEADER_SEARCH_ICON,
} from '../../src/constants/tests.constants';
import {
  DEFAULT_SORT_OPTION_KEY,
  REQUEST_URI,
  SORT_OPTIONS,
} from '../../src/constants/movieListPage.constants';
import {
  GENRE_ITEM_SELECTED,
  GENRE_ITEM_UNSELECTED,
} from '../../src/constants/tests.constants';
import {
  MovieData,
  MovieDataResponse,
} from '../../src/components/MovieListPage';

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
    cy.visit('/');
  });

  it('sends movie request with search query after click on search button', () => {
    const userRequest = 'you';
    cy.intercept(
      {
        method: 'GET',
        url: `${REQUEST_URI}/movies*`,
        query: {
          search: userRequest,
        },
      },
      { fixture: 'movieResponse.json' }
    ).as('userQueryResponse');

    cy.get(`[data-testid="${SEARCH_FORM_INPUT}"]`).type(userRequest);
    cy.contains('button', 'SEARCH').click();

    cy.wait('@userQueryResponse')
      .its('request.url')
      .should('include', `search=${userRequest}`);
  });

  it('sends movie request with unselected genre after click on the selected element', () => {
    const dramaGenre = 'Drama';
    cy.intercept(
      {
        method: 'GET',
        url: `${REQUEST_URI}/movies*`,
        query: {
          filter: dramaGenre,
        },
      },
      { fixture: 'movieResponse.json' }
    ).as('userQueryResponse');

    cy.get(`[data-testid="${GENRE_ITEM_UNSELECTED}"]`)
      .contains(dramaGenre)
      .click();

    cy.get(`[data-testid="${GENRE_ITEM_SELECTED}"]`).should(
      'have.text',
      dramaGenre
    );
    cy.wait('@userQueryResponse')
      .its('request.url')
      .should('include', `filter=${dramaGenre}`);
  });

  it('sends movie request with selected sort option after click on the sort option', () => {
    const unselectedSortOptionText =
      Object.keys(SORT_OPTIONS).filter(
        (option) => option !== DEFAULT_SORT_OPTION_KEY
      )[0] ??
      (() => {
        throw new Error('There is not unselected sortBy option');
      })();
    const unselectedSortOptionSetting = SORT_OPTIONS[
      unselectedSortOptionText
    ] as string;
    cy.intercept(
      {
        method: 'GET',
        url: `${REQUEST_URI}/movies*`,
        query: {
          sortBy: unselectedSortOptionSetting,
        },
      },
      { fixture: 'movieResponse.json' }
    ).as('userQueryResponse');

    cy.get(`[data-testid="${MOVIE_SORT_CONTROL}"]`).click();
    cy.get(`[data-testid="${MENU_CONTEXT_CONTAINER}"]`)
      .find('li')
      .contains(unselectedSortOptionText)
      .click();

    cy.get(`[data-testid="${MOVIE_SELECTED_SORT_OPTION}"]`).should(
      'have.text',
      unselectedSortOptionText
    );
    cy.wait('@userQueryResponse')
      .its('request.url')
      .should('include', `sortBy=${unselectedSortOptionSetting}`);
  });

  it('gets movie details after click on the first image', () => {
    cy.get(`[data-testid="${MOVIE_TILE_IMAGE}"]`).eq(0).click();

    cy.fixture('movieResponse.json').then(
      (movieResponse: MovieDataResponse) => {
        const firstMovieResponse = movieResponse.data[0] as MovieData;
        cy.get(`[data-testid="${MOVIE_DETAILS_NAME}"]`).should(
          'have.text',
          firstMovieResponse.title
        );
        cy.get(`[data-testid="${MOVIE_DETAILS_RATING}"]`).should(
          'have.text',
          firstMovieResponse.vote_average
        );
        cy.get(`[data-testid="${MOVIE_DETAILS_DESCRIPTION}"]`).should(
          'have.text',
          firstMovieResponse.overview
        );
        cy.get(`[data-testid="${MOVIE_DETAILS_IMAGE}"]`).should(
          'have.attr',
          'src',
          firstMovieResponse.poster_path
        );
      }
    );
  });

  it('gets movie details and switches to search after click on the search icon', () => {
    cy.get(`[data-testid="${MOVIE_HEADER_SEARCH_ICON}"]`).should('not.exist');

    cy.get(`[data-testid="${MOVIE_TILE_IMAGE}"]`).eq(0).click();
    cy.get(`[data-testid="${MOVIE_DETAILS_NAME}"]`).should('exist');
    cy.contains('button', 'SEARCH').should('not.exist');

    cy.get(`[data-testid="${MOVIE_HEADER_SEARCH_ICON}"]`).click();
    cy.get(`[data-testid="${MOVIE_DETAILS_NAME}"]`).should('not.exist');
    cy.get(`[data-testid="${SEARCH_FORM_INPUT}"]`).should('exist');
    cy.contains('button', 'SEARCH').should('exist');
  });
});
