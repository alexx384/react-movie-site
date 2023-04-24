import styles from './SearchFormHeader.module.css';
import headerStyles from '../MovieListHeader.module.css';
import classNames from 'classnames';
import { SearchForm } from '../../../components/SearchForm';
import { useSearchFormContext } from '../MovieListPage.utils';

export const SearchFormHeader = () => {
  const { initialSearchQuery, onSendSearchQuery } = useSearchFormContext();
  return (
    <div
      className={classNames(
        headerStyles.header,
        styles['header-with-background']
      )}
    >
      <SearchForm
        initialSearchQuery={initialSearchQuery}
        onSearch={onSendSearchQuery}
      />
    </div>
  );
};
