import React from 'react';
import { arrayToString } from '../../utils/string.utils';
import { MovieData, MovieListFilterSettings } from '.';
import { MovieDetailsInfo } from '../MovieDetails';

export const useMovieData = <R>(
  url: string,
  queryParams: MovieListFilterSettings
): R | null => {
  const [data, setData] = React.useState<R | null>(null);
  React.useEffect(() => {
    const abortController = new AbortController();
    const startFetching = async (urlData: URL, abortSignal: AbortSignal) => {
      try {
        const response = await fetch(urlData, {
          headers: { accept: 'application/json' },
          signal: abortSignal,
        });
        if (response.status < 200 && 299 > response.status) {
          return;
        }
        const data = await response.json();
        setData(data);
      } catch (error) {}
    };

    const urlData = new URL(url);
    Object.entries(queryParams).forEach((entry) =>
      urlData.searchParams.append(entry[0], entry[1])
    );
    startFetching(urlData, abortController.signal);
    return () => {
      abortController.abort(
        `Aborted request: ${url}, reason: component rerender`
      );
    };
  }, [url, queryParams]);
  return data;
};

export const mapMovieDataToMovieDetailsInfo = (
  movieData: MovieData
): MovieDetailsInfo => ({
  id: movieData.id,
  imageUrl: movieData.poster_path,
  movieName: movieData.title,
  releaseYear: new Date(movieData.release_date).getFullYear(),
  genre: arrayToString(movieData.genres),
  description: movieData.overview,
  durationInMinutes: movieData.runtime,
  rating: movieData.vote_average,
});
