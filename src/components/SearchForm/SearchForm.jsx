import React from 'react';
import './SearchForm.css';

export const SearchForm = ({ initialSearchQuery, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  function onSearchClickHandle() {
    onSearch(searchQuery);
  }

  function onInputKeydownHandle(event) {
    if (event.key === 'Enter') {
      onSearchClickHandle(event);
    }
  }

  function onSearchQueryChangeHandle(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="searchForm">
      <h1>FIND YOUR MOVIE</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchQueryChangeHandle}
        onKeyDown={onInputKeydownHandle}
      />
      <button type="button" onClick={onSearchClickHandle}>
        SEARCH
      </button>
    </div>
  );
};
