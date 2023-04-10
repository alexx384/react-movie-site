import React from 'react';
import styles from './SearchForm.module.css';
import { SEARCH_FORM_INPUT } from '../../constants/tests.constants';
import fontStyles from '../../Font.module.css';
import classNames from 'classnames';

export type SearchFormProps = {
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
    <div className={styles.form}>
      <h1 className={classNames(fontStyles.title, styles.title)}>
        FIND YOUR MOVIE
      </h1>
      <div className={styles.block}>
        <input
          className={classNames(fontStyles.input, styles.input)}
          type="text"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          onKeyDown={handleInputKeydown}
          data-testid={SEARCH_FORM_INPUT}
        />
        <button
          className={classNames(fontStyles['submit-btn'], styles['submit-btn'])}
          type="button"
          onClick={handleSearchClick}
        >
          SEARCH
        </button>
      </div>
    </div>
  );
};
