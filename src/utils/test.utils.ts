import { LoaderFunctionArgs } from 'react-router-dom';
import { TEST_ROOT_RESPONSE } from '../constants/movieListPage.constants';
import { ROOT_MOVIE_ID } from '../constants/router.constants';

export const movieByIdLoader = ({ params }: LoaderFunctionArgs) => {
  const movieId = Number(params[ROOT_MOVIE_ID]);
  const movieData = TEST_ROOT_RESPONSE.data.filter(
    (movieData) => movieData.id === movieId
  )?.[0];
  if (movieData) {
    return movieData;
  } else {
    throw new Response('Something went wrong', { status: 400 });
  }
};
