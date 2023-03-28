import React from 'react';
import {
  stringListToString,
  secondsToHoursAndMinutesString,
} from '../utils/string';
import styles from './MovieDetails.module.css';

type Props = {
  imageUrl: string;
  movieName: string;
  releaseYear: number;
  rating: number;
  genres: string[];
  durationInSeconds: number;
  description: string;
};

export const MovieDetails = ({
  imageUrl,
  movieName,
  releaseYear,
  rating,
  genres,
  durationInSeconds,
  description,
}: Props) => {
  return (
    <div className={styles.movieDetails}>
      <img className={styles.moviePoster} src={imageUrl} alt={movieName} />
      <div>
        <div className={styles.movieTitleAndRating}>
          <h1 className={styles.movieTitle}>{movieName}</h1>
          <h3 className={styles.movieRating}>{rating}</h3>
        </div>
        <h4 className={styles.movieGenres}>{stringListToString(genres)}</h4>
        <div className={styles.movieYearAndTiming}>
          <h2 className={styles.movieYear}>{releaseYear}</h2>
          <h2 className={styles.movieTiming}>
            {secondsToHoursAndMinutesString(durationInSeconds)}
          </h2>
        </div>
        <p className={styles.movieDescription}>{description}</p>
      </div>
    </div>
  );
};
