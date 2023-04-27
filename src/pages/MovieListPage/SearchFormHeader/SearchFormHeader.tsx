import styles from './SearchFormHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { SearchForm } from '../../../components/SearchForm';
import { Outlet, useOutletContext } from 'react-router-dom';
import { AddMovieContext } from '../../../components/AddMovieDialog';
import { EditMovieContext } from '../../../components/EditMovieDialog';

export interface AddAndEditMovieContext
  extends AddMovieContext,
    EditMovieContext {}

export interface SearchFormContext extends AddAndEditMovieContext {
  initialSearchQuery: string;
  onSendSearchQuery: (searchQUery: string) => void;
  onAddMovieClick: () => void;
}

export const SearchFormHeader = () => {
  const {
    initialSearchQuery,
    onSendSearchQuery,
    onAddMovieClick,
    ...callbacks
  } = useOutletContext<SearchFormContext>();
  const outletContext: AddAndEditMovieContext = {
    ...callbacks,
  };
  return (
    <>
      <div
        className={classNames(
          headerStyles.header,
          styles['header-with-background']
        )}
      >
        <SearchForm
          initialSearchQuery={initialSearchQuery}
          onSearch={onSendSearchQuery}
          onAddMovieClick={onAddMovieClick}
        />
      </div>
      <Outlet context={outletContext} />
    </>
  );
};
