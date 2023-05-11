import { AddMovieProps } from '~/components/AddMovieDialog';
import { EditMovieCallbacks } from '~/components/EditMovieDialog';
import { SearchFormHeaderProps } from '~/components/SearchFormHeader';
import { MovieDetailsCallbacks } from '~/components/MovieDetailsHeader';
import { MovieDataResponse } from './movieData';

export interface SearchFormHeaderContext
  extends SearchFormHeaderProps,
    AddMovieProps {}

export interface MovieIdCallbackContext
  extends MovieDetailsCallbacks,
    EditMovieCallbacks {}

export interface MovieListPageContext
  extends SearchFormHeaderContext,
    MovieIdCallbackContext {}

export interface MovieIdContext extends MovieIdCallbackContext {
  movieData: MovieDataResponse;
}
