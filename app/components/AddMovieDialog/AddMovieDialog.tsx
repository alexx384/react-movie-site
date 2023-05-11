import { MovieForm } from '../MovieForm';
import { Dialog } from '../Dialog';
import { ADD_MOVIE_TITLE } from '../../constants/movieDialog.constants';
import { FullMovieInfo } from '../../interfaces/movieInfo';

export type AddMovieProps = {
  onAddMovie: (movieId: number) => void;
  onCloseAddMovie: () => void;
};

export const AddMovieDialog = ({
  onAddMovie,
  onCloseAddMovie,
}: AddMovieProps) => {
  const handleSubmit = async (movieInfo: FullMovieInfo) => {
    if (movieInfo.id) {
      onAddMovie(movieInfo.id);
    } else {
      throw new Error(
        'There is no movie id in form response after add movie request'
      );
    }
  };
  return (
    <Dialog isOpened={true} title={ADD_MOVIE_TITLE} onClose={onCloseAddMovie}>
      <MovieForm onFormSubmit={handleSubmit} />
    </Dialog>
  );
};
