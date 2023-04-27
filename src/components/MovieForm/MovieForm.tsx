import { Multiselect } from '../Multiselect';
import styles from './MovieForm.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import {
  FORM_MOVIE_OVERVIEW,
  FORM_MOVIE_RATING,
  FORM_MOVIE_RELEASE_DATE,
  FORM_MOVIE_RUNTIME,
  FORM_MOVIE_TITLE_INPUT,
  FORM_MOVIE_URL,
} from '../../constants/tests.constants';
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
import { FullMovieInfo, MovieFormInfo } from '../../interfaces/movieInfo';

export type MovieFormProps = {
  movieInfo?: FullMovieInfo;
  onSubmit?: (movieInfo: FullMovieInfo) => void;
};

export const MovieForm = ({ movieInfo, onSubmit }: MovieFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<MovieFormInfo>({
    defaultValues: {
      ...movieInfo,
      genreIds: movieInfo?.genreIds ?? new Set<string>(),
      releaseDate: movieInfo?.releaseDate?.toISOString().slice(0, 10),
    },
  });
  const handleFormSubmit = async (data: MovieFormInfo) => {
    try {
      await onSubmit?.({
        id: movieInfo?.id,
        ...data,
        releaseDate: new Date(data.releaseDate),
      });
    } catch (e) {
      setError('root.serverError', {
        type: 'server',
        message: (e as Error).message,
      });
    }
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
            className={fontStyles.input}
            type="text"
            {...register('title', { required: 'Title required' })}
            id="title"
            placeholder="Movie Title"
            data-testid={FORM_MOVIE_TITLE_INPUT}
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
            className={fontStyles.input}
            type="date"
            {...register('releaseDate', {
              required: 'Release date required',
              valueAsDate: true,
            })}
            id="releaseDate"
            placeholder="Select Date"
            data-testid={FORM_MOVIE_RELEASE_DATE}
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
            className={fontStyles.input}
            type="url"
            {...register('movieURL', { required: 'Movie URL required' })}
            id="movieURL"
            pattern="https://.*"
            placeholder="https://"
            data-testid={FORM_MOVIE_URL}
          />
          <ErrorMessage errors={errors} name="movieURL" render={errorMessage} />
        </div>
        <div className={classNames(styles['label-and-input'], styles.rating)}>
          <label className={fontStyles['form-label']} htmlFor="rating">
            {RATING}
          </label>
          <input
            className={fontStyles.input}
            type="number"
            step={0.1}
            {...register('rating', {
              required: 'Rating required',
              valueAsNumber: true,
            })}
            id="rating"
            placeholder="7.8"
            data-testid={FORM_MOVIE_RATING}
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
            name="genreIds"
            control={control}
            rules={{ required: true }}
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
            className={fontStyles.input}
            type="number"
            {...register('runtime', {
              required: 'Runtime required',
              valueAsNumber: true,
            })}
            id="runtime"
            placeholder="minutes"
            data-testid={FORM_MOVIE_RUNTIME}
          />
          <ErrorMessage errors={errors} name="runtime" render={errorMessage} />
        </div>
      </div>
      <div className={classNames(styles['label-and-input'])}>
        <label className={fontStyles['form-label']} htmlFor="overview">
          {OVERVIEW}
        </label>
        <textarea
          className={classNames(fontStyles.input, styles['movie-description'])}
          {...register('overview', { required: 'Overview required' })}
          id="overview"
          placeholder="Movie description"
          data-testid={FORM_MOVIE_OVERVIEW}
        />
        <ErrorMessage errors={errors} name="overview" render={errorMessage} />
      </div>
      <p>{errors?.root?.['serverError']?.message}</p>
      <div className={styles['btn-block']}>
        <input
          onClick={() => reset()}
          className={fontStyles['submit-btn']}
          type="reset"
          value={RESET_BUTTON}
        />
        <input
          disabled={isSubmitting}
          className={fontStyles['submit-btn']}
          type="submit"
          value={SUBMIT_BUTTON}
        />
      </div>
    </form>
  );
};
