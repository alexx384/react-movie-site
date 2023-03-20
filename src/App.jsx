import React from 'react';
import './App.css';
import { Counter } from './components/Counter';
import { SearchForm } from './components/SearchForm';
import { GenreSelect } from './components/GenreSelect';

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
        onSelect={(genreName) => console.log('Genre is', genreName)}
      />
    </main>
  );
};
