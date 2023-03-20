import React from 'react';

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
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchQueryChangeHandle}
        onKeyDown={onInputKeydownHandle}
        style={{
          borderRadius: '4px',
          opacity: 0.7,
          mixBlendMode: 'normal',
          background: 'rgba(50, 50, 50, 0.8)',
          width: '288px',
          height: '24px',
          top: '17px',
          left: '19px',
        }}
      />
      <button
        type="button"
        style={{ color: '#F65261' }}
        onClick={onSearchClickHandle}
      >
        SEARCH
      </button>
    </div>
  );
};
