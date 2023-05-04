import styles from './SearchFormHeader.module.css';
import classNames from 'classnames';
import { SearchForm } from '../SearchForm';

export type SearchFormHeaderProps = {
  initialSearchQuery: string;
  onSendSearchQuery: (searchQuery: string) => void;
  onAddMovieClick: () => void;
};

export const SearchFormHeader = ({
  initialSearchQuery,
  onSendSearchQuery,
  onAddMovieClick,
}: SearchFormHeaderProps) => {
  return (
    <>
      <div
        className={classNames(styles.header, styles['header-with-background'])}
      >
        <SearchForm
          initialSearchQuery={initialSearchQuery}
          onSearch={onSendSearchQuery}
          onAddMovieClick={onAddMovieClick}
        />
      </div>
    </>
  );
};
