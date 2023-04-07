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
  const handleSubmit = (movieInfo: MovieInfo) => {
    onSubmit?.(movieInfo);
  };
  const handleClose = () => {
    onClose?.();
  };
  return (
    <>
      <Dialog
        isOpened={isOpened}
        title={EDIT_MOVIE_TITLE}
        onClose={handleClose}
      >
        <MovieForm movieInfo={movieInfo} onSubmit={handleSubmit} />
      </Dialog>
    </>
  );
};
