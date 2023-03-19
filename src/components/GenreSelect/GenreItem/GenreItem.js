import { useState } from 'react';

export const GenreItem = ({
  genreName,
  isInitiallySelected,
  onSelect,
  onInitiallySelected,
}) => {
  const [isSelected, setSelected] = useState(isInitiallySelected);
  if (isInitiallySelected === true) {
    onInitiallySelected({ genreName: genreName, deselect: deselect });
  }
  function select() {
    onSelect({ genreName: genreName, deselect: deselect });
    setSelected(() => true);
  }
  function deselect() {
    setSelected(() => false);
  }
  return (
    <div
      style={{
        backgroundColor: isSelected ? '#FF6666' : '#f1f1f1',
        padding: '20px',
        margin: '10px',
        fontSize: '30px',
      }}
      onClick={select}
    >
      {genreName}
    </div>
  );
};
