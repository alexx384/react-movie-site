import React from 'react';

export const SearchForm = ({ initialSearchQuery, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  function executeOnSearch(event) {
    event.preventDefault();
    onSearch(searchQuery);
  }

  function updateSeachQuery(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <form onSubmit={executeOnSearch}>
      <input
        type={'text'}
        value={searchQuery}
        onChange={updateSeachQuery}
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
      <button type="submit" style={{ color: '#F65261' }}>
        SEARCH
      </button>
    </form>
  );
};
