import React from 'react';
import styles from './MovieListPage.module.css';
import { SearchForm } from '../SearchForm';
import { SortControl } from '../SortControl';
import { GenreSelect } from '../GenreSelect';
import { MovieTile } from '../MovieTile';
import { MovieDetails } from '../MovieDetails';
import classNames from 'classnames';

export const MovieListPage = () => {
  const movies = [
    {
      id: '1',
      imageUrl: 'https://test-9mn.pages.dev/1.png',
      movieName: 'Pulp Fiction',
      releaseYear: 2004,
      genre: 'Action & Adventure',
    },
    {
      id: '2',
      imageUrl: 'https://test-9mn.pages.dev/1.png',
      movieName: 'Pulp Fiction',
      releaseYear: 2004,
      genre: 'Action & Adventure',
    },
    {
      id: '3',
      imageUrl: 'https://test-9mn.pages.dev/1.png',
      movieName: 'Pulp Fiction',
      releaseYear: 2004,
      genre: 'Action & Adventure',
    },
    {
      id: '4',
      imageUrl: 'https://test-9mn.pages.dev/1.png',
      movieName: 'Pulp Fiction',
      releaseYear: 2004,
      genre: 'Action & Adventure',
    },
    {
      id: '5',
      imageUrl: 'https://test-9mn.pages.dev/1.png',
      movieName: 'Pulp Fiction',
      releaseYear: 2004,
      genre: 'Action & Adventure',
    },
    {
      id: '6',
      imageUrl: 'https://test-9mn.pages.dev/1.png',
      movieName: 'Pulp Fiction',
      releaseYear: 2004,
      genre: 'Action & Adventure',
    },
  ];

  return (
    <>
      <div
        className={classNames(
          styles.heading,
          styles['heading-with-background']
        )}
      >
        <MovieDetails
          imageUrl="https://test-9mn.pages.dev/1.png"
          movieName="Pulp Fiction"
          releaseYear={2004}
          rating={8.9}
          genre="Adventure"
          durationInSeconds={9240}
          description="Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra"
        />
        {/* <SearchForm initialSearchQuery="" /> */}
      </div>
      <div className={styles['header-body-separator']}></div>
      <div className={styles.body}>
        <div className={styles['body-settings']}>
          <GenreSelect
            listOfGenres={['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME']}
            initiallySelectedGenreName="ALL"
          />
          <SortControl
            options={['RELEASE DATE', 'TITLE']}
            selectedOption={'RELEASE DATE'}
          />
        </div>
        <h3>39 movies found</h3>
        <ul className={styles['movie-list']}>
          {movies.map((movieInfo) => (
            <li>
              <MovieTile
                id={movieInfo.id}
                imageUrl={movieInfo.imageUrl}
                movieName={movieInfo.movieName}
                releaseYear={movieInfo.releaseYear}
                genre={movieInfo.genre}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
