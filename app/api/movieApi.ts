import {
  CREATE_MOVIE_URI,
  UPDATE_MOVIE_URI,
} from '../constants/request.constants';
import {
  CreateMovieRequest,
  UpdateMovieRequest,
} from '../interfaces/movieData';
import { RequiredFullMovieInfo } from '../interfaces/movieInfo';

export const updateMovieData = async (
  requestObject: UpdateMovieRequest
): Promise<RequiredFullMovieInfo> => {
  const response = await fetch(UPDATE_MOVIE_URI, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(requestObject),
  });
  if (!response.ok) {
    throw new Error(`The response is ${response.status}`);
  }
  return await response.json();
};

export const addMovieData = async (
  requestObject: CreateMovieRequest
): Promise<RequiredFullMovieInfo> => {
  const response = await fetch(CREATE_MOVIE_URI, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(requestObject),
  });
  if (!response.ok) {
    throw new Error(`The response is ${response.status}`);
  }
  return await response.json();
};
