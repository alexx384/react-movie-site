import styles from './SearchFormHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { SearchForm } from '../../SearchForm';
import { useSearchParams } from 'react-router-dom';
import {
  getSearchQueryFromUrlSearchParams,
  setSearchQueryToUrlSearchParams,
} from '../MovieListPage.utils';

export const SearchFormHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = getSearchQueryFromUrlSearchParams(searchParams);
  const handleSearch = (query: string) => {
    setSearchParams((prev) => setSearchQueryToUrlSearchParams(prev, query));
  };
  return (
    <div
      className={classNames(
        headerStyles.header,
        styles['header-with-background']
      )}
    >
      <SearchForm initialSearchQuery={searchQuery} onSearch={handleSearch} />
    </div>
  );
};
