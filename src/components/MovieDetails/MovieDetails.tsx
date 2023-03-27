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
    <div>
      <div>
        <img src={imageUrl} alt={movieName} />
      </div>
      <div>
        <div>
          <h1>{movieName}</h1>
          <h3>{rating}</h3>
        </div>
        <h4>{stringListToString(genres)}</h4>
        <div>
          <h2>{releaseYear}</h2>
          <h2>{secondsToHoursAndMinutesString(durationInSeconds)}</h2>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};
