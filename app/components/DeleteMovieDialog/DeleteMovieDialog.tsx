import { Dialog } from '../Dialog';
import {
  DELETE_MOVIE_BUTTON,
  DELETE_MOVIE_TITLE,
  DELETE_MOVIE_QUESTION,
} from '../../constants/movieDialog.constants';
import fontStyles from '~/assets/css/Font.module.css';
import searchFormStyles from '../SearchForm/SearchForm.module.css';
import classNames from 'classnames';
import styles from './DeleteMovieDialog.module.css';

type Props = {
  isOpened: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
};

export const DeleteMovieDialog = ({ isOpened, onClose, onSubmit }: Props) => {
  return (
    <Dialog isOpened={isOpened} title={DELETE_MOVIE_TITLE} onClose={onClose}>
      <p className={styles.question}>{DELETE_MOVIE_QUESTION}</p>
      <div className={styles['btn-block']}>
        <button
          className={classNames(
            fontStyles['submit-btn'],
            searchFormStyles['submit-btn']
          )}
          onClick={onSubmit}
        >
          {DELETE_MOVIE_BUTTON}
        </button>
      </div>
    </Dialog>
  );
};
