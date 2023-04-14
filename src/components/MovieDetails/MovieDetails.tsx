import styles from './MovieDetails.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';
import { MovieBasicInfo } from '../MovieTile';
import { minutesToHoursAndMinutesString } from '../../utils/string.utils';

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
            {minutesToHoursAndMinutesString(durationInMinutes)}
          </h2>
        </div>
        <p className={classNames(fontStyles.description, styles.description)}>
          {description}
        </p>
      </div>
    </div>
  );
};
