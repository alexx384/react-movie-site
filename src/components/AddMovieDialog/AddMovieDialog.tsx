import { MovieForm } from '../MovieForm';
import { Dialog } from '../Dialog';
import { ADD_MOVIE_TITLE } from '../../constants/movieDialog.constants';
import { CREATE_MOVIE_URI } from '../../constants/request.constants';
import { useOutletContext } from 'react-router-dom';
import {
  FullMovieInfo,
  RequiredFullMovieInfo,
} from '../../interfaces/movieInfo';
import { mapFullMovieInfoToCreateMovieResponse } from '../../utils/mapper.utils';

export type AddMovieContext = {
  onAddMovie: (movieId: number) => void;
  onCloseAddMovie: () => void;
};

export const AddMovieDialog = () => {
  const { onAddMovie, onCloseAddMovie } = useOutletContext<AddMovieContext>();
  const handleSubmit = async (movieInfo: FullMovieInfo) => {
    const movieData = mapFullMovieInfoToCreateMovieResponse(movieInfo);
    const response = await fetch(CREATE_MOVIE_URI, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(movieData),
    });
    if (!response.ok) {
      throw new Error(`The response is ${response.status}`);
    }
    const jsonData: RequiredFullMovieInfo = await response.json();
    if (!jsonData.id) {
      throw new Error('There is no ID for newly created record');
    }
    onAddMovie(jsonData.id);
  };
  return (
    <Dialog isOpened={true} title={ADD_MOVIE_TITLE} onClose={onCloseAddMovie}>
      <MovieForm onSubmit={handleSubmit} />
    </Dialog>
  );
};
