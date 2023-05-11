import {
  SEARCH_FORM_INPUT,
  MOVIE_SORT_CONTROL,
  MOVIE_SELECTED_SORT_OPTION,
  MENU_CONTEXT_CONTAINER,
  MOVIE_TILE_IMAGE,
  MOVIE_DETAILS_NAME,
  MOVIE_HEADER_SEARCH_ICON,
  FORM_MOVIE_TITLE_INPUT,
  FORM_MOVIE_RELEASE_DATE,
  FORM_MOVIE_URL,
  FORM_MOVIE_RATING,
  FORM_MOVIE_GENRE,
  FORM_MOVIE_RUNTIME,
  FORM_MOVIE_OVERVIEW,
} from '~/constants/tests.constants';
import {
  DEFAULT_SORT_OPTION_KEY,
  QUERY_GENRE_FILTER_PARAM,
  QUERY_SEARCH,
  QUERY_SORT_BY,
  SORT_OPTIONS,
} from '~/constants/movieListPage.constants';
import {
  GENRE_ITEM_SELECTED,
  GENRE_ITEM_UNSELECTED,
} from '~/constants/tests.constants';
import { createSearchParams } from 'react-router-dom';
import {
  MovieDataResponse,
  MovieListDataResponse,
} from '~/interfaces/movieData';
import {
  ADD_MOVIE_TITLE,
  EDIT_MOVIE_TITLE,
} from '~/constants/movieDialog.constants';

describe('Movie search', () => {
  beforeEach(() => {
    cy.intercept('GET', `${Cypress.env('REQUEST_URI')}/movies*`, {
      fixture: 'movieListResponse.json',
    }).as('movieResponse');
    cy.fixture('movieListResponse.json').then(
      (movieResponse: MovieListDataResponse) => {
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
            request.reply(filteredMovieData[0] as MovieDataResponse);
          }
        ).as('movieByIdResponse');
      }
    );
    cy.intercept('GET', '/test/media/*', (request) => {
      const filename = (
        request.url.match('\\/(\\w+\\.\\w+)') as RegExpMatchArray
      )[1];
      request.reply({ fixture: `media/${filename}` });
    });
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
    cy.location().should(
      'have.property',
      'search',
      `?${QUERY_SORT_BY}=${unselectedSortOptionText}`
    );
  });

  it('gets movie details after click on the first image', () => {
    cy.visit('/');
    cy.get(`[data-testid="${MOVIE_TILE_IMAGE}"]`).eq(0).click();
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

    cy.visit(`/${movieId}?${queryParams}`);

    cy.get(`[data-testid="${GENRE_ITEM_SELECTED}"]`).should(
      'have.text',
      selectedGenre
    );
    cy.get(`[data-testid="${MOVIE_SELECTED_SORT_OPTION}"]`).should(
      'have.text',
      sortBy
    );
    cy.fixture('movieListResponse.json').then(
      (movieResponse: MovieListDataResponse) => {
        const firstMovieResponse = movieResponse.data.filter(
          (data) => data.id === Number(movieId)
        )[0] as MovieDataResponse;
        cy.get(`[data-testid="${MOVIE_DETAILS_NAME}"]`).should(
          'have.text',
          firstMovieResponse.title
        );
      }
    );
  });

  it('opens empty "Add Movie" form by the link', () => {
    cy.visit(`/new`);

    cy.contains('h1', ADD_MOVIE_TITLE);
    cy.get(`[data-testid="${FORM_MOVIE_TITLE_INPUT}"]`).should(
      'have.value',
      ''
    );
    cy.get(`[data-testid="${FORM_MOVIE_RELEASE_DATE}"]`).should(
      'have.value',
      ''
    );
    cy.get(`[data-testid="${FORM_MOVIE_URL}"]`).should('have.value', '');
    cy.get(`[data-testid="${FORM_MOVIE_RATING}"]`).should('have.value', '');
    cy.get(`[data-testid="${FORM_MOVIE_GENRE}"]`).should(
      'have.text',
      'Select Genre'
    );
    cy.get(`[data-testid="${FORM_MOVIE_RUNTIME}"]`).should('have.value', '');
    cy.get(`[data-testid="${FORM_MOVIE_OVERVIEW}"]`).should('have.value', '');
  });

  it('opens filled "Edit Movie" form by the link', () => {
    const movieId = 82702;
    cy.visit(`/${movieId}/edit`);

    cy.contains('h1', EDIT_MOVIE_TITLE);
    cy.fixture('movieListResponse.json').then(
      (movieResponse: MovieListDataResponse) => {
        const movieData = movieResponse.data.filter(
          (data) => data.id === movieId
        )[0]!;
        cy.get(`[data-testid="${FORM_MOVIE_TITLE_INPUT}"]`).should(
          'have.value',
          movieData.title
        );
        cy.get(`[data-testid="${FORM_MOVIE_RELEASE_DATE}"]`).should(
          'have.value',
          movieData.release_date
        );
        cy.get(`[data-testid="${FORM_MOVIE_RATING}"]`).should(
          'have.value',
          movieData.vote_average
        );
        cy.get(`[data-testid="${FORM_MOVIE_GENRE}"]`).should((element) => {
          movieData.genres.forEach((genre) =>
            expect(element)['to'].contain(genre)
          );
        });
        cy.get(`[data-testid="${FORM_MOVIE_RUNTIME}"]`).should(
          'have.value',
          String(movieData.runtime)
        );
        cy.get(`[data-testid="${FORM_MOVIE_OVERVIEW}"]`).should(
          'have.value',
          movieData.overview
        );
      }
    );
  });

  it('can add a new movie', () => {
    cy.visit(`/new`);

    cy.fixture('newMovie.json').then((newMovieData: MovieDataResponse) => {
      cy.fixture('movieListResponse.json').then(
        (movieListData: MovieListDataResponse) => {
          cy.intercept(
            'GET',
            `${Cypress.env('REQUEST_URI')}/movies*`,
            (request) => {
              const newList: MovieListDataResponse = {
                totalAmount: movieListData.totalAmount + 1,
                data: [...movieListData.data, newMovieData],
              };
              request.reply(newList);
            }
          );
        }
      );
    });
    cy.intercept('POST', `${Cypress.env('REQUEST_URI')}/movies*`, {
      fixture: 'newMovie.json',
    }).as('newMovieResponse');
    cy.intercept('GET', `${Cypress.env('REQUEST_URI')}/movies/*`, {
      fixture: 'newMovie.json',
    });

    cy.fixture('newMovie.json').then((movieData: MovieDataResponse) => {
      cy.get(`[data-testid="${FORM_MOVIE_TITLE_INPUT}"]`).type(movieData.title);
      cy.get(`[data-testid="${FORM_MOVIE_RELEASE_DATE}"]`).type(
        movieData.release_date
      );
      cy.get(`[data-testid="${FORM_MOVIE_URL}"]`).type(movieData.poster_path);
      cy.get(`[data-testid="${FORM_MOVIE_RATING}"]`).type(
        String(movieData.vote_average)
      );
      cy.get(`[data-testid="${FORM_MOVIE_GENRE}"]`).click();
      movieData.genres.forEach((genre) => {
        cy.get(`input[name="${genre}"]`).check();
      });
      cy.get(`[data-testid="${FORM_MOVIE_RUNTIME}"]`).type(
        String(movieData.runtime)
      );
      cy.get(`[data-testid="${FORM_MOVIE_OVERVIEW}"]`).type(movieData.overview);
    });
  });
});
