import { MovieForm } from '../MovieForm';
import { Dialog } from '../Dialog';
import { EDIT_MOVIE_TITLE } from '../../constants/movieDialog.constants';
import { FullMovieInfo } from '../../interfaces/movieInfo';
import { mapMovieDataResponseToRequiredFullMovieInfo } from '../../utils/mapper.utils';
import { MovieIdContext } from '~/interfaces/outletContext';

export interface EditMovieCallbacks {
  onEditMovie: (movieId: number) => void;
  onCloseEditMovie: (movieId: number) => void;
}

export interface EditMovieProps extends MovieIdContext {}

export const EditMovieDialog = ({
  onEditMovie,
  onCloseEditMovie,
  movieData,
}: EditMovieProps) => {
  const movieInfo = mapMovieDataResponseToRequiredFullMovieInfo(movieData);

  const handleSubmit = async (formMovieInfo: FullMovieInfo) => {
    if (movieInfo.id) {
      onEditMovie(movieInfo.id);
    } else {
      throw new Error(
        'There is no movie id in form response after update movie request'
      );
    }
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
      <MovieForm movieInfo={movieInfo} onFormSubmit={handleSubmit} />
    </Dialog>
  );
};
