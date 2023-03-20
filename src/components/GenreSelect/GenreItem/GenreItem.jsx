export const GenreItem = ({ genreName, isSelected, onSelect }) => {
  function onItemClickHandle() {
    onSelect(genreName);
  }
  return (
    <div
      style={{
        backgroundColor: isSelected ? '#FF6666' : '#f1f1f1',
        padding: '20px',
        margin: '10px',
        fontSize: '30px',
      }}
      onClick={onItemClickHandle}
    >
      {genreName}
    </div>
  );
};
