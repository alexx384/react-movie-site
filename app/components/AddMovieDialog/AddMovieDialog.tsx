import { MovieForm } from '../MovieForm';
import { Dialog } from '../Dialog';
import { ADD_MOVIE_TITLE } from '../../constants/movieDialog.constants';
import { FullMovieInfo } from '../../interfaces/movieInfo';
import { mapFullMovieInfoToCreateMovieResponse } from '../../utils/mapper.utils';
import { addMovieData } from '../../api/movieApi';

export type AddMovieProps = {
  onAddMovie: (movieId: number) => void;
  onCloseAddMovie: () => void;
};

export const AddMovieDialog = ({
  onAddMovie,
  onCloseAddMovie,
}: AddMovieProps) => {
  const handleSubmit = async (movieInfo: FullMovieInfo) => {
    const formMovieData = mapFullMovieInfoToCreateMovieResponse(movieInfo);
    const newMovieData = await addMovieData(formMovieData);
    onAddMovie(newMovieData.id);
  };
  return (
    <Dialog isOpened={true} title={ADD_MOVIE_TITLE} onClose={onCloseAddMovie}>
      <MovieForm onSubmit={handleSubmit} />
    </Dialog>
  );
};
