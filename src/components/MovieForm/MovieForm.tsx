import { Multiselect } from '../Multiselect';
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
  DEFAULT_MOVIE_GENRES,
} from '../../constants/movieForm.constants';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export type MovieInfo = {
  id?: string;
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

type FormValues = {
  title: string;
  releaseDate: Date;
  movieURL: string;
  rating: number;
  genre: Set<string>;
  runtime: number;
  overview: string;
};

export const MovieForm = ({ movieInfo, onSubmit }: MovieFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const selectedMovieGenreIds: Set<string> = DEFAULT_MOVIE_GENRES.filter(
    (genre) => movieInfo?.genre?.has(genre.id) ?? false
  ).reduce((genreSet, genre) => genreSet.add(genre.id), new Set<string>());
  const handleFormSubmit = (data: FormValues) => {
    onSubmit?.({
      id: movieInfo?.id,
      ...data,
    });
  };
  const errorMessage = ({ message }: { message: string }) => (
    <p className={classNames(fontStyles.subtitle, styles['error-input'])}>
      {message}
    </p>
  );
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            defaultValue={movieInfo?.title}
            className={fontStyles.input}
            type="text"
            {...register('title', { required: 'Title required' })}
            id="title"
            placeholder="Movie Title"
            data-testid={MOVIE_TITLE_INPUT}
          />
          <ErrorMessage errors={errors} name="title" render={errorMessage} />
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
            defaultValue={movieInfo?.releaseDate?.toISOString().slice(0, 10)}
            className={fontStyles.input}
            type="date"
            {...register('releaseDate', {
              required: 'Release date required',
              valueAsDate: true,
            })}
            id="releaseDate"
            placeholder="Select Date"
            style={{ content: 'attr(placeholder)' }}
          />
          <ErrorMessage
            errors={errors}
            name="releaseDate"
            render={errorMessage}
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
            defaultValue={movieInfo?.movieURL}
            className={fontStyles.input}
            type="url"
            {...register('movieURL', { required: 'Movie URL required' })}
            id="movieURL"
            pattern="https://.*"
            placeholder="https://"
          />
          <ErrorMessage errors={errors} name="movieURL" render={errorMessage} />
        </div>
        <div className={classNames(styles['label-and-input'], styles.rating)}>
          <label className={fontStyles['form-label']} htmlFor="rating">
            {RATING}
          </label>
          <input
            defaultValue={movieInfo?.rating}
            className={fontStyles.input}
            type="number"
            step={0.1}
            {...register('rating', {
              required: 'Rating required',
              valueAsNumber: true,
            })}
            id="rating"
            placeholder="7.8"
          />
          <ErrorMessage errors={errors} name="rating" render={errorMessage} />
        </div>
      </div>
      <div className={styles['input-row-container']}>
        <div className={classNames(styles['label-and-input'], styles.genre)}>
          <label className={fontStyles['form-label']} htmlFor="genre">
            {GENRE}
          </label>
          <Controller
            name="genre"
            control={control}
            rules={{ required: true }}
            defaultValue={selectedMovieGenreIds}
            render={({ field: { onChange, value } }) => (
              <Multiselect
                options={DEFAULT_MOVIE_GENRES}
                initiallySelectedOptions={value}
                onChange={onChange}
                placeholder="Select Genre"
              />
            )}
          />
          <ErrorMessage errors={errors} name="genre" render={errorMessage} />
        </div>
        <div className={classNames(styles['label-and-input'], styles.runtime)}>
          <label className={fontStyles['form-label']} htmlFor="runtime">
            {RUNTIME}
          </label>
          <input
            defaultValue={movieInfo?.runtime}
            className={fontStyles.input}
            type="number"
            {...register('runtime', {
              required: 'Runtime required',
              valueAsNumber: true,
            })}
            id="runtime"
            placeholder="minutes"
          />
          <ErrorMessage errors={errors} name="runtime" render={errorMessage} />
        </div>
      </div>
      <div className={classNames(styles['label-and-input'])}>
        <label className={fontStyles['form-label']} htmlFor="overview">
          {OVERVIEW}
        </label>
        <textarea
          defaultValue={movieInfo?.overview}
          className={classNames(fontStyles.input, styles['movie-description'])}
          {...register('overview', { required: 'Overview required' })}
          id="overview"
          placeholder="Movie description"
        />
        <ErrorMessage errors={errors} name="overview" render={errorMessage} />
      </div>
      <div className={styles['btn-block']}>
        <input
          onClick={() => reset()}
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
