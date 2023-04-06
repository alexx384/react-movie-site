import React from 'react';
import { Multiselect, MultiselectHandle } from '../Multiselect';
import styles from './MovieForm.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';

type FormData = {
  title: string;
  releaseDate: string;
  movieURL: string;
  rating: string;
  genre: string[];
  runtime: string;
  overview: string;
};

type MovieInfo = {
  title: string;
  releaseDate: Date;
  movieURL: string;
  rating: number;
  genre: string[];
  runtime: number;
  overview: string;
};

type Props = {
  movieInfo?: MovieInfo;
  onSubmit: (movieInfo: MovieInfo) => void;
};

export const MovieForm = ({ onSubmit }: Props) => {
  const genreElementRef = React.useRef<MultiselectHandle>(null);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & FormData;
    onSubmit({
      title: target.title,
      releaseDate: new Date(target.releaseDate),
      movieURL: target.movieURL,
      rating: Number(target.rating),
      genre: target.genre,
      runtime: Number(target.runtime),
      overview: target.overview,
    });
  }
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
            className={fontStyles.input}
            type="text"
            name="title"
            id="title"
            placeholder="Movie Title"
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
            MOVIE URL
          </label>
          <input
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
            RATING
          </label>
          <input
            className={fontStyles.input}
            type="number"
            step={0.1}
            name="rating"
            id="rating"
            placeholder="minutes"
          />
        </div>
      </div>
      <div className={styles['input-row-container']}>
        <div className={classNames(styles['label-and-input'], styles.genre)}>
          <label className={fontStyles['form-label']} htmlFor="genre">
            GENRE
          </label>
          <Multiselect
            ref={genreElementRef}
            options={[
              { id: 'crime', value: 'Crime', isChecked: false },
              { id: 'documentary', value: 'Documentary', isChecked: false },
              { id: 'horror', value: 'Horror', isChecked: false },
              { id: 'comedy', value: 'Comedy', isChecked: false },
            ]}
            placeholder="Select Genre"
          />
        </div>
        <div className={classNames(styles['label-and-input'], styles.runtime)}>
          <label className={fontStyles['form-label']} htmlFor="runtime">
            RUNTIME
          </label>
          <input
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
          OVERVIEW
        </label>
        <textarea
          className={classNames(fontStyles.input, styles['movie-description'])}
          name="overview"
          id="overview"
          placeholder="Movie description"
        />
      </div>
      <div className={styles['btn-block']}>
        <input
          className={fontStyles['submit-btn']}
          type="reset"
          value="RESET"
        />
        <input
          className={fontStyles['submit-btn']}
          type="submit"
          value="SUBMIT"
        />
      </div>
    </form>
  );
};
