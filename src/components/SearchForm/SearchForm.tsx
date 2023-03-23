import React from 'react';
import styles from './SearchForm.module.css';

type SearchFormProps = {
  initialSearchQuery: string;
  onSearch?: (searchQuery: string) => void;
};

export const SearchForm = ({
  initialSearchQuery,
  onSearch,
}: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  function onSearchClickHandle() {
    onSearch?.(searchQuery);
  }

  function onInputKeydownHandle(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onSearchClickHandle();
    }
  }

  function onSearchQueryChangeHandle(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={styles.searchForm}>
      <h1>FIND YOUR MOVIE</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchQueryChangeHandle}
        onKeyDown={onInputKeydownHandle}
        data-testid="searchMovieInput"
      />
      <button type="button" onClick={onSearchClickHandle}>
        SEARCH
      </button>
    </div>
  );
};
