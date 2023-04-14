import { secondsToHoursAndMinutesString } from '../../utils';
import styles from './MovieDetails.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import { MovieBasicInfo } from '../MovieTile';

export interface MovieDetailsInfo extends MovieBasicInfo {
  rating: number;
  genre: string;
  durationInSeconds: number;
  description: string;
}

export const MovieDetails = ({
  imageUrl,
  movieName,
  releaseYear,
  rating,
  genre,
  durationInSeconds,
  description,
}: MovieDetailsInfo) => {
  return (
    <div className={styles.block}>
      <img className={styles.poster} src={imageUrl} alt={movieName} />
      <div>
        <div className={styles['title-and-rating']}>
          <h1 className={classNames(fontStyles.title, styles.title)}>
            {movieName}
          </h1>
          <h3 className={classNames(fontStyles.rating, styles.rating)}>
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
            {secondsToHoursAndMinutesString(durationInSeconds)}
          </h2>
        </div>
        <p className={classNames(fontStyles.description, styles.description)}>
          {description}
        </p>
      </div>
    </div>
  );
};
