import React from 'react';
import styles from './SearchForm.module.css';
import { SEARCH_FORM_INPUT } from '../../constants/tests.constants';

type SearchFormProps = {
  initialSearchQuery: string;
  onSearch?: (searchQuery: string) => void;
};

export const SearchForm = ({
  initialSearchQuery,
  onSearch,
}: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  function handleSearchClick() {
    onSearch?.(searchQuery);
  }

  function handleInputKeydown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  }

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={styles.searchForm}>
      <h1>FIND YOUR MOVIE</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onKeyDown={handleInputKeydown}
        data-testid={SEARCH_FORM_INPUT}
      />
      <button type="button" onClick={handleSearchClick}>
        SEARCH
      </button>
    </div>
  );
};
