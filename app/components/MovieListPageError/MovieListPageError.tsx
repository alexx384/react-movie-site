import styles from './MovieListPageError.module.css';
import fontStyles from '~/assets/css/Font.module.css';
import classNames from 'classnames';

export type MovieListPageErrorProps = {
  error: unknown;
};

export const MovieListPageError = ({ error }: MovieListPageErrorProps) => {
  return (
    <div className={classNames(fontStyles.title, styles['error-block'])}>
      <h1>Whoops. Server is not available</h1>
      <h2>{String(error)}</h2>
    </div>
  );
};
