import React from 'react';
import styles from './MovieListPage.module.css';
import { SortControl } from '../SortControl';
import { GenreSelect } from '../GenreSelect';
import { MovieDetailsInfo } from '../MovieDetails';
import { MovieListResult } from './MovieListResult';
import { MovieListHeader } from './MovieListHeader';
import { Tuple } from '../../utils';
import { MOVIE_LIST_ITEMS6 } from '../../constants/tests.constants';

const genres: Tuple<string, 5> = [
  'ALL',
  'DOCUMENTARY',
  'COMEDY',
  'HORROR',
  'CRIME',
];

const sortOptions: Tuple<string, 2> = ['RELEASE DATE', 'TITLE'];

export const MovieListPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedMovieId, setSelectedMovieId] = React.useState('');
  const [selectedGenre, setSelectedGenre] = React.useState(genres[0]);
  const [sortOption, setSortOption] = React.useState(sortOptions[0]);
  const handleShowSearchForm = () => {
    setSelectedMovieId('');
  };
  const movieMap = new Map<string, MovieDetailsInfo>(
    MOVIE_LIST_ITEMS6.map((entry) => [entry.id, entry])
  );
  const selectedMovie = movieMap.get(selectedMovieId);
  return (
    <>
      <MovieListHeader
        searchQuery={searchQuery}
        movieDetails={selectedMovie}
        onSearch={setSearchQuery}
        onShowSearchForm={handleShowSearchForm}
      />
      <div className={styles['header-body-separator']}></div>
      <div className={styles.body}>
        <div className={styles['body-settings']}>
          <GenreSelect
            listOfGenres={[...genres]}
            initiallySelectedGenreName={selectedGenre}
            onSelectGenre={setSelectedGenre}
          />
          <SortControl
            options={[...sortOptions]}
            selectedOption={sortOption}
            onSelect={setSortOption}
          />
        </div>
        <MovieListResult
          movieList={[...movieMap.values()]}
          totalMovieNumber={String(movieMap.size)}
          onMovieClick={setSelectedMovieId}
        />
      </div>
    </>
  );
};
