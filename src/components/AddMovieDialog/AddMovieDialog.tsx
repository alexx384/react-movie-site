import { MovieForm, MovieInfo } from '../MovieForm';
import { Dialog } from '../Dialog';
import { ADD_MOVIE_TITLE } from '../../constants/movieDialog.constants';

type Props = {
  isOpened: boolean;
  onClose?: () => void;
  onSubmit?: (movieInfo: MovieInfo) => void;
};

export const AddMovieDialog = ({ isOpened, onClose, onSubmit }: Props) => {
  return (
    <Dialog isOpened={isOpened} title={ADD_MOVIE_TITLE} onClose={onClose}>
      <MovieForm onSubmit={onSubmit} />
    </Dialog>
  );
};
