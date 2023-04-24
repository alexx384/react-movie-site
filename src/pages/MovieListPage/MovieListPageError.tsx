import { useRouteError } from 'react-router-dom';
import styles from './MovieListPage.module.css';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';

export const MovieListPageError = () => {
  const error = useRouteError() as { status: string };
  return (
    <div className={classNames(fontStyles.title, styles['error-block'])}>
      <h1>Whoops. Server is not available</h1>
      <h2>{error.status}</h2>
    </div>
  );
};
