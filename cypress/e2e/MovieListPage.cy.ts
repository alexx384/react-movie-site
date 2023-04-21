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
  QUERY_GENRE_FILTER_PARAM,
  QUERY_SEARCH,
  QUERY_SORT_BY,
  SORT_OPTIONS,
} from '../../src/constants/movieListPage.constants';
import {
  GENRE_ITEM_SELECTED,
  GENRE_ITEM_UNSELECTED,
} from '../../src/constants/tests.constants';
import { MovieData, MovieDataResponse } from '../../src/pages/MovieListPage';
import { createSearchParams } from 'react-router-dom';

describe('Movie search', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('REQUEST_URI')}/movies*`, {
      fixture: 'movieListResponse.json',
    }).as('movieResponse');
    cy.fixture('movieListResponse.json').then(
      (movieResponse: MovieDataResponse) => {
        cy.intercept(
          'GET',
          `${Cypress.env('REQUEST_URI')}/movies/*`,
          (request) => {
            const movieIdStr = (
              request.url.match('.+\\/movies/(\\d+)') as RegExpMatchArray
            )[1];
            const movieId = Number(movieIdStr);
            const filteredMovieData = movieResponse.data.filter(
              (data) => data.id === movieId
            );
            request.reply(filteredMovieData[0] as MovieData);
          }
        ).as('movieByIdResponse');
      }
    );
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
    const userRequest = 'you';
    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('REQUEST_URI')}/movies*`,
        query: {
          search: userRequest,
        },
      },
      { fixture: 'movieListResponse.json' }
    ).as('userQueryResponse');

    cy.get(`[data-testid="${SEARCH_FORM_INPUT}"]`).type(userRequest);
    cy.contains('button', 'SEARCH').click();

    cy.wait('@userQueryResponse')
      .its('request.url')
      .should('include', `search=${userRequest}`);
    cy.location().should(
      'have.property',
      'search',
      `?${QUERY_SEARCH}=${userRequest}`
    );
  });

  it('sends movie request with unselected genre after click on the selected element', () => {
    cy.visit('/');
    const dramaGenre = 'Drama';
    cy.intercept(
      {
        method: 'GET',
        url: `${Cypress.env('REQUEST_URI')}/movies*`,
        query: {
          filter: dramaGenre,
        },
      },
      { fixture: 'movieListResponse.json' }
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
    cy.location().should(
      'have.property',
      'search',
      `?${QUERY_GENRE_FILTER_PARAM}=${dramaGenre}`
    );
  });

  it('sends movie request with selected sort option after click on the sort option', () => {
    cy.visit('/');
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
        url: `${Cypress.env('REQUEST_URI')}/movies*`,
        query: {
          sortBy: unselectedSortOptionSetting,
        },
      },
      { fixture: 'movieListResponse.json' }
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
    cy.location().should(
      'have.property',
      'search',
      `?${QUERY_SORT_BY}=${unselectedSortOptionText}`
    );
  });

  it('gets movie details after click on the first image', () => {
    cy.visit('/');
    cy.get(`[data-testid="${MOVIE_TILE_IMAGE}"]`).eq(0).click();

    cy.fixture('movieListResponse.json').then(
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
        cy.location().should(
          'have.property',
          'pathname',
          `/:${firstMovieResponse.id}`
        );
      }
    );
  });

  it('gets movie details and switches to search after click on the search icon', () => {
    cy.visit('/');
    cy.get(`[data-testid="${MOVIE_HEADER_SEARCH_ICON}"]`).should('not.exist');

    cy.get(`[data-testid="${MOVIE_TILE_IMAGE}"]`).eq(0).click();
    cy.get(`[data-testid="${MOVIE_DETAILS_NAME}"]`).should('exist');
    cy.contains('button', 'SEARCH').should('not.exist');

    cy.get(`[data-testid="${MOVIE_HEADER_SEARCH_ICON}"]`).click();
    cy.get(`[data-testid="${MOVIE_DETAILS_NAME}"]`).should('not.exist');
    cy.get(`[data-testid="${SEARCH_FORM_INPUT}"]`).should('exist');
    cy.contains('button', 'SEARCH').should('exist');
  });

  it('shows selected options on visit url with query options', () => {
    const searchText = 'you';
    const selectedGenre = 'Drama';
    const sortBy = 'TITLE';
    const queryParams = createSearchParams({
      [QUERY_SEARCH]: searchText,
      [QUERY_GENRE_FILTER_PARAM]: selectedGenre,
      [QUERY_SORT_BY]: sortBy,
    });

    cy.visit(`/?${queryParams}`);

    cy.get(`[data-testid="${SEARCH_FORM_INPUT}"]`).should(
      'have.value',
      searchText
    );
    cy.get(`[data-testid="${GENRE_ITEM_SELECTED}"]`).should(
      'have.text',
      selectedGenre
    );
    cy.get(`[data-testid="${MOVIE_SELECTED_SORT_OPTION}"]`).should(
      'have.text',
      sortBy
    );
  });

  it('shows selected options with movie details on visit url with query options', () => {
    const searchText = 'you';
    const selectedGenre = 'Drama';
    const sortBy = 'TITLE';
    const movieId = '82702';
    const queryParams = createSearchParams({
      [QUERY_SEARCH]: searchText,
      [QUERY_GENRE_FILTER_PARAM]: selectedGenre,
      [QUERY_SORT_BY]: sortBy,
    });

    cy.visit(`/:${movieId}?${queryParams}`);

    cy.get(`[data-testid="${GENRE_ITEM_SELECTED}"]`).should(
      'have.text',
      selectedGenre
    );
    cy.get(`[data-testid="${MOVIE_SELECTED_SORT_OPTION}"]`).should(
      'have.text',
      sortBy
    );
    cy.fixture('movieListResponse.json').then(
      (movieResponse: MovieDataResponse) => {
        const firstMovieResponse = movieResponse.data.filter(
          (data) => data.id === Number(movieId)
        )[0] as MovieData;
        cy.get(`[data-testid="${MOVIE_DETAILS_NAME}"]`).should(
          'have.text',
          firstMovieResponse.title
        );
      }
    );
  });
});
