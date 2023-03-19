import React from 'react';

export const SearchForm = ({ initialSearchQuery, onSearch }) => {
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  function executeOnSearch() {
    onSearch(searchQuery);
  }

  function onInputKeydown(event) {
    if (event.key === 'Enter') {
      executeOnSearch(event);
    }
  }

  function updateSeachQuery(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div>
      <input
        type={'text'}
        value={searchQuery}
        onChange={updateSeachQuery}
        onKeyDown={onInputKeydown}
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
        onClick={executeOnSearch}
      >
        SEARCH
      </button>
    </div>
  );
};
