import { MovieDetails, MovieDetailsInfo } from '../../MovieDetails';
import classNames from 'classnames';
import styles from './MovieListHeader.module.css';
import { SearchForm } from '../../SearchForm';
import '../../../Font.module.css';
import { MOVIE_HEADER_SEARCH_ICON } from '../../../constants/tests.constants';

type Props = {
  movieDetails?: MovieDetailsInfo;
  searchQuery: string;
  onSearch?: (searchQuery: string) => void;
  onShowSearchForm?: () => void;
};

export const MovieListHeader = ({
  movieDetails,
  searchQuery,
  onSearch,
  onShowSearchForm,
}: Props) => {
  return (
    <div
      className={classNames(styles.heading, {
        [styles['heading-with-background']]: !movieDetails,
      })}
    >
      {movieDetails && (
        <>
          <div className={styles.controls}>
            <button
              className={classNames(
                'material-symbols-outlined',
                styles['controls-search']
              )}
              onClick={onShowSearchForm}
              data-testid={MOVIE_HEADER_SEARCH_ICON}
            >
              search
            </button>
          </div>
          <MovieDetails {...movieDetails} />
        </>
      )}
      {!movieDetails && (
        <SearchForm initialSearchQuery={searchQuery} onSearch={onSearch} />
      )}
    </div>
  );
};
