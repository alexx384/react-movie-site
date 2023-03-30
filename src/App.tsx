import { Counter } from './components/Counter';
import { SearchForm } from './components/SearchForm';
import { GenreSelect } from './components/GenreSelect';
import './App.module.css';

export const App = () => {
  return (
    <main>
      <Counter initialValue={0} />
      <SearchForm
        initialSearchQuery={'Hello World'}
        onSearch={(serachText) => console.log(serachText)}
      />
      <GenreSelect
        listOfGenres={['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME']}
        initiallySelectedGenreName={'COMEDY'}
        onSelectGenre={(genreName) => console.log('Genre is', genreName)}
      />
    </main>
  );
};
