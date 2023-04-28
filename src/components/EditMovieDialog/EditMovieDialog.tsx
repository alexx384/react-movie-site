import { MovieForm } from '../MovieForm';
import { Dialog } from '../Dialog';
import { EDIT_MOVIE_TITLE } from '../../constants/movieDialog.constants';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { GetMovieByIdResponse } from '../../loaders/GetMovieByIdLoader';
import { FullMovieInfo } from '../../interfaces/movieInfo';
import {
  mapFullMovieInfoToUpdateMovieResponse,
  mapMovieDataResponseToRequiredFullMovieInfo,
} from '../../utils/mapper.utils';
import { updateMovieData } from '../../api/movieApi';

export type EditMovieContext = {
  onEditMovie: (movieId: number) => void;
  onCloseEditMovie: (movieId: number) => void;
};

export const EditMovieDialog = () => {
  const movieData = useLoaderData() as GetMovieByIdResponse;
  const movieInfo = mapMovieDataResponseToRequiredFullMovieInfo(movieData);
  const { onEditMovie, onCloseEditMovie } =
    useOutletContext<EditMovieContext>();

  const handleSubmit = async (formMovieInfo: FullMovieInfo) => {
    const formMovieData = mapFullMovieInfoToUpdateMovieResponse(formMovieInfo);
    const newMovieData = await updateMovieData(formMovieData);
    onEditMovie(newMovieData.id);
  };
  const handleCloseEditMovie = () => {
    if (!movieInfo.id) {
      throw new Error('Passed ID is undefined');
    }
    onCloseEditMovie(movieInfo.id);
  };
  return (
    <Dialog
      isOpened={true}
      title={EDIT_MOVIE_TITLE}
      onClose={handleCloseEditMovie}
    >
      <MovieForm movieInfo={movieInfo} onSubmit={handleSubmit} />
    </Dialog>
  );
};
