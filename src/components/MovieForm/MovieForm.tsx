import React from 'react';
import { Multiselect, MultiselectHandle } from '../Multiselect';
import styles from './MovieForm.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import { MOVIE_TITLE_INPUT } from '../../constants/tests.constants';
import {
  MOVIE_URL,
  RATING,
  GENRE,
  RUNTIME,
  OVERVIEW,
  SUBMIT_BUTTON,
  RESET_BUTTON,
} from '../../constants/movieForm.constants';

export type MovieInfo = {
  title?: string;
  releaseDate?: Date;
  movieURL?: string;
  rating?: number;
  genre?: Set<string>;
  runtime?: number;
  overview?: string;
};

export type MovieFormProps = {
  movieInfo?: MovieInfo;
  onSubmit?: (movieInfo: MovieInfo) => void;
};

const DEFAULT_MOVIE_GENRES = [
  { id: 'crime', value: 'Crime', isChecked: false },
  { id: 'documentary', value: 'Documentary', isChecked: false },
  { id: 'horror', value: 'Horror', isChecked: false },
  { id: 'comedy', value: 'Comedy', isChecked: false },
];

export const MovieForm = ({ movieInfo, onSubmit }: MovieFormProps) => {
  const titleRef = React.useRef<HTMLInputElement>(null);
  const releaseDateRef = React.useRef<HTMLInputElement>(null);
  const movieURLRef = React.useRef<HTMLInputElement>(null);
  const ratingRef = React.useRef<HTMLInputElement>(null);
  const genreRef = React.useRef<MultiselectHandle>(null);
  const runtimeRef = React.useRef<HTMLInputElement>(null);
  const overviewRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const releaseDate =
      releaseDateRef.current && releaseDateRef.current.value
        ? new Date(releaseDateRef.current.value)
        : undefined;
    onSubmit?.({
      title: titleRef.current?.value,
      releaseDate: releaseDate,
      movieURL: movieURLRef.current?.value,
      rating: Number(ratingRef.current?.value),
      genre: genreRef.current?.getSelectedGenreIds() ?? new Set(),
      runtime: Number(runtimeRef.current?.value),
      overview: overviewRef.current?.value,
    });
  };
  const movieGenres = DEFAULT_MOVIE_GENRES.map((genre) =>
    Object.assign({}, genre)
  );
  movieGenres
    .filter((genre) => movieInfo?.genre?.has(genre.id) ?? false)
    .forEach((genre) => (genre.isChecked = true));
  const handleResetInput = () => {
    genreRef.current?.resetSelection();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles['input-row-container']}>
        <div
          className={classNames(
            styles['label-and-input'],
            styles['movie-title']
          )}
        >
          <label className={fontStyles['form-label']} htmlFor="title">
            TITLE
          </label>
          <input
            ref={titleRef}
            defaultValue={movieInfo?.title}
            className={fontStyles.input}
            type="text"
            name="title"
            id="title"
            placeholder="Movie Title"
            data-testid={MOVIE_TITLE_INPUT}
          />
        </div>
        <div
          className={classNames(
            fontStyles['form-label'],
            styles['label-and-input'],
            styles['release-date']
          )}
        >
          <label className={fontStyles['form-label']} htmlFor="releaseDate">
            RELEASE DATE
          </label>
          <input
            ref={releaseDateRef}
            defaultValue={movieInfo?.releaseDate?.toISOString().slice(0, 10)}
            className={fontStyles.input}
            type="date"
            name="releaseDate"
            id="releaseDate"
            placeholder="Select Date"
            style={{ content: 'attr(placeholder)' }}
          />
        </div>
      </div>
      <div className={styles['input-row-container']}>
        <div
          className={classNames(styles['label-and-input'], styles['movie-url'])}
        >
          <label className={fontStyles['form-label']} htmlFor="movieURL">
            {MOVIE_URL}
          </label>
          <input
            ref={movieURLRef}
            defaultValue={movieInfo?.movieURL}
            className={fontStyles.input}
            type="url"
            name="movieURL"
            id="movieURL"
            pattern="https://.*"
            placeholder="https://"
          />
        </div>
        <div className={classNames(styles['label-and-input'], styles.rating)}>
          <label className={fontStyles['form-label']} htmlFor="rating">
            {RATING}
          </label>
          <input
            ref={ratingRef}
            defaultValue={movieInfo?.rating}
            className={fontStyles.input}
            type="number"
            step={0.1}
            name="rating"
            id="rating"
            placeholder="7.8"
          />
        </div>
      </div>
      <div className={styles['input-row-container']}>
        <div className={classNames(styles['label-and-input'], styles.genre)}>
          <label className={fontStyles['form-label']} htmlFor="genre">
            {GENRE}
          </label>
          <Multiselect
            ref={genreRef}
            options={movieGenres}
            placeholder="Select Genre"
          />
        </div>
        <div className={classNames(styles['label-and-input'], styles.runtime)}>
          <label className={fontStyles['form-label']} htmlFor="runtime">
            {RUNTIME}
          </label>
          <input
            ref={runtimeRef}
            defaultValue={movieInfo?.runtime}
            className={fontStyles.input}
            type="number"
            name="runtime"
            id="runtime"
            placeholder="minutes"
          />
        </div>
      </div>
      <div className={classNames(styles['label-and-input'])}>
        <label className={fontStyles['form-label']} htmlFor="overview">
          {OVERVIEW}
        </label>
        <textarea
          ref={overviewRef}
          defaultValue={movieInfo?.overview}
          className={classNames(fontStyles.input, styles['movie-description'])}
          name="overview"
          id="overview"
          placeholder="Movie description"
        />
      </div>
      <div className={styles['btn-block']}>
        <input
          onClick={handleResetInput}
          className={fontStyles['submit-btn']}
          type="reset"
          value={RESET_BUTTON}
        />
        <input
          className={fontStyles['submit-btn']}
          type="submit"
          value={SUBMIT_BUTTON}
        />
      </div>
    </form>
  );
};
