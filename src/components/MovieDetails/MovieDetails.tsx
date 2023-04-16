import styles from './MovieDetails.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import { MovieBasicInfo } from '../MovieTile';
import { minutesToHoursAndMinutesString } from '../../utils/string.utils';
import {
  MOVIE_DETAILS_DESCRIPTION,
  MOVIE_DETAILS_IMAGE,
  MOVIE_DETAILS_NAME,
  MOVIE_DETAILS_RATING,
} from '../../constants/tests.constants';

export interface MovieDetailsInfo extends MovieBasicInfo {
  rating: number;
  genre: string;
  durationInMinutes: number;
  description: string;
}

export const MovieDetails = ({
  imageUrl,
  movieName,
  releaseYear,
  rating,
  genre,
  durationInMinutes,
  description,
}: MovieDetailsInfo) => {
  return (
    <div className={styles.block}>
      <img
        className={styles.poster}
        src={imageUrl}
        alt={movieName}
        data-testid={MOVIE_DETAILS_IMAGE}
      />
      <div>
        <div className={styles['title-and-rating']}>
          <h1
            className={classNames(fontStyles.title, styles.title)}
            data-testid={MOVIE_DETAILS_NAME}
          >
            {movieName}
          </h1>
          <h3
            className={classNames(fontStyles.rating, styles.rating)}
            data-testid={MOVIE_DETAILS_RATING}
          >
            {rating}
          </h3>
        </div>
        <h4 className={classNames(fontStyles.subtitle, styles.genre)}>
          {genre}
        </h4>
        <div className={styles['year-and-timing']}>
          <h2 className={classNames(fontStyles['key-detail'], styles.year)}>
            {releaseYear}
          </h2>
          <h2 className={classNames(fontStyles['key-detail'], styles.timing)}>
            {minutesToHoursAndMinutesString(durationInMinutes)}
          </h2>
        </div>
        <p
          className={classNames(fontStyles.description, styles.description)}
          data-testid={MOVIE_DETAILS_DESCRIPTION}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
