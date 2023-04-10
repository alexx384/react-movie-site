import { MovieForm, MovieInfo } from '../MovieForm';
import { Dialog } from '../Dialog';
import { EDIT_MOVIE_TITLE } from '../../constants/movieDialog.constants';

type Props = {
  movieInfo: MovieInfo;
  isOpened: boolean;
  onClose?: () => void;
  onSubmit?: (movieInfo: MovieInfo) => void;
};

export const EditMovieDialog = ({
  movieInfo,
  isOpened,
  onClose,
  onSubmit,
}: Props) => {
  return (
    <Dialog isOpened={isOpened} title={EDIT_MOVIE_TITLE} onClose={onClose}>
      <MovieForm movieInfo={movieInfo} onSubmit={onSubmit} />
    </Dialog>
  );
};
