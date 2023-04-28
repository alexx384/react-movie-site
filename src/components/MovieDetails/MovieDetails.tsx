import styles from './MovieDetails.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import {
  arrayToString,
  minutesToHoursAndMinutesString,
} from '../../utils/string.utils';
import {
  MOVIE_DETAILS_DESCRIPTION,
  MOVIE_DETAILS_IMAGE,
  MOVIE_DETAILS_NAME,
  MOVIE_DETAILS_RATING,
} from '../../constants/tests.constants';
import { RequiredFullMovieInfo } from '../../interfaces/movieInfo';
import { mapGenreIdsToGenreValues } from '../../utils/mapper.utils';

export const MovieDetails = ({
  movieURL,
  title,
  releaseDate,
  rating,
  genreIds,
  runtime,
  overview,
}: RequiredFullMovieInfo) => {
  const movieGenres = mapGenreIdsToGenreValues(genreIds);
  return (
    <div className={styles.block}>
      <img
        className={styles.poster}
        src={movieURL}
        alt={title}
        data-testid={MOVIE_DETAILS_IMAGE}
      />
      <div>
        <div className={styles['title-and-rating']}>
          <h1
            className={classNames(fontStyles.title, styles.title)}
            data-testid={MOVIE_DETAILS_NAME}
          >
            {title}
          </h1>
          <h3
            className={classNames(fontStyles.rating, styles.rating)}
            data-testid={MOVIE_DETAILS_RATING}
          >
            {rating}
          </h3>
        </div>
        <h4 className={classNames(fontStyles.subtitle, styles.genre)}>
          {arrayToString(movieGenres)}
        </h4>
        <div className={styles['year-and-timing']}>
          <h2 className={classNames(fontStyles['key-detail'], styles.year)}>
            {releaseDate.getFullYear()}
          </h2>
          <h2 className={classNames(fontStyles['key-detail'], styles.timing)}>
            {minutesToHoursAndMinutesString(runtime)}
          </h2>
        </div>
        <p
          className={classNames(fontStyles.description, styles.description)}
          data-testid={MOVIE_DETAILS_DESCRIPTION}
        >
          {overview}
        </p>
      </div>
    </div>
  );
};
