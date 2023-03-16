import React from 'react';

export const SearchForm = ({ initialSearchQuery, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  function onFormSubmit(event) {
    event.preventDefault();
    onSearch(searchQuery);
  }

  function updateSeachQuery(query) {
    setSearchQuery(query.target.value);
  }

  return (
    <form onSubmit={(event) => onFormSubmit(event)}>
      <input
        type={'text'}
        value={searchQuery}
        onChange={(query) => updateSeachQuery(query)}
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
