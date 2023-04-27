import { MovieListDataResponse } from '../interfaces/movieData';
import { Tuple } from '../utils';

export const MOVIE_GENRES: Tuple<string, 6> = [
  'All',
  'Drama',
  'Documentary',
  'Comedy',
  'Horror',
  'Crime',
];
export const DEFAULT_MOVIE_GENRE: string = MOVIE_GENRES[0];

export const SORT_OPTION_ENTRIES: Tuple<Tuple<string, 2>, 2> = [
  ['RELEASE DATE', 'release_date'],
  ['TITLE', 'title'],
];
export const SORT_OPTIONS: { [key: string]: string } =
  Object.fromEntries(SORT_OPTION_ENTRIES);
export const DEFAULT_SORT_OPTION_KEY: string = SORT_OPTION_ENTRIES[0][0];

export const QUERY_GENRE_FILTER_PARAM = 'filter';
export const QUERY_SORT_BY = 'sortBy';
export const QUERY_SEARCH = 'search';
export const QUERY_SEARCH_BY = 'searchBy';

export const DEFAULT_SEARCH_QUERY = '';
export const DEFAULT_SEARCH_BY_FIELD = 'title';

export const MOVIE_TILE_EDIT_OPTION = 'Edit';
export const MOVIE_TILE_DELETE_OPTION = 'Delete';
export const MOVIE_TILE_OPTIONS = [
  MOVIE_TILE_EDIT_OPTION,
  MOVIE_TILE_DELETE_OPTION,
];

export const TEST_ROOT_RESPONSE: MovieListDataResponse = {
  totalAmount: 23,
  data: [
    {
      id: 82702,
      title: 'How to Train Your Dragon 2',
      tagline: 'The training is over.',
      vote_average: 7.6,
      vote_count: 3829,
      release_date: '2014-06-12',
      poster_path:
        'https://image.tmdb.org/t/p/w600_and_h900_bestv2/d13Uj86LdbDLrfDoHR5aDOFYyJC.jpg',
      overview:
        "The thrilling second chapter of the epic How To Train Your Dragon trilogy brings back the fantastical world of Hiccup and Toothless five years later. While Astrid, Snotlout and the rest of the gang are challenging each other to dragon races (the island's new favorite contact sport), the now inseparable pair journey through the skies, charting unmapped territories and exploring new worlds. When one of their adventures leads to the discovery of a secret ice cave that is home to hundreds of new wild dragons and the mysterious Dragon Rider, the two friends find themselves at the center of a battle to protect the peace.",
      budget: 145000000,
      revenue: 609123048,
      genres: ['Comedy'],
      runtime: 102,
    },
    {
      id: 10191,
      title: 'How to Train Your Dragon',
      tagline: 'One adventure will change two worlds',
      vote_average: 7.6,
      vote_count: 5233,
      release_date: '2010-03-05',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ygGmAO60t8GyqUo9xYeYxSZAR3b.jpg',
      overview:
        'As the son of a Viking leader on the cusp of manhood, shy Hiccup Horrendous Haddock III faces a rite of passage: he must kill a dragon to prove his warrior mettle. But after downing a feared dragon, he realizes that he no longer wants to destroy it, and instead befriends the beast – which he names Toothless – much to the chagrin of his warrior father',
      budget: 165000000,
      revenue: 494878759,
      genres: ['Comedy'],
      runtime: 98,
    },
    {
      id: 9388,
      title: 'Thank You for Smoking',
      tagline: 'Tobacco lobbyist Nick Naylor is trying to SAVE YOUR ASH!',
      vote_average: 7.2,
      vote_count: 852,
      release_date: '2005-09-05',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/yuJtEgVZ9TCWaOSN41hcMiCdz26.jpg',
      overview:
        "Nick Naylor is a charismatic spin-doctor for Big Tobacco who'll fight to protect America's right to smoke -- even if it kills him -- while still remaining a role model for his 12-year old son. When he incurs the wrath of a senator bent on snuffing out cigarettes, Nick's powers of \"filtering the truth\" will be put to the test.",
      budget: 6500000,
      revenue: 24793509,
      genres: ['Comedy', 'Drama'],
      runtime: 92,
    },
    {
      id: 291805,
      title: 'Now You See Me 2',
      tagline: "You Haven't Seen Anything Yet",
      vote_average: 6.7,
      vote_count: 4501,
      release_date: '2016-06-02',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/A81kDB6a1K86YLlcOtZB27jriJh.jpg',
      overview:
        'One year after outwitting the FBI and winning the public’s adulation with their mind-bending spectacles, the Four Horsemen resurface only to find themselves face to face with a new enemy who enlists them to pull off their most dangerous heist yet.',
      budget: 90000000,
      revenue: 334901337,
      genres: ['Comedy', 'Crime'],
      runtime: 129,
    },
    {
      id: 10184,
      title: "He's Just Not That Into You",
      tagline: 'Are you the exception... or the rule?',
      vote_average: 6.2,
      vote_count: 1295,
      release_date: '2009-02-06',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ruc33YnCrmCL8PHdPQVzfa4shWX.jpg',
      overview:
        "Remember that really cute guy who said he'd call – and didn't? Maybe he lost your number. Maybe he's in the hospital. Maybe he's awed by your beauty, brains or success. Or maybe... he's just not that into you.",
      budget: 40000000,
      revenue: 177259441,
      genres: ['Comedy', 'Drama'],
      runtime: 129,
    },
    {
      id: 75656,
      title: 'Now You See Me',
      tagline:
        '4 amazing magicians. 3 impossible heists. 1 billion dollars. This is no illusion.',
      vote_average: 7.3,
      vote_count: 7117,
      release_date: '2013-05-29',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tWsNYbrqy1p1w6K9zRk0mSchztT.jpg',
      overview:
        'An FBI agent and an Interpol detective track a team of illusionists who pull off bank heists during their performances and reward their audiences with the money.',
      budget: 75000000,
      revenue: 117698894,
      genres: ['Crime'],
      runtime: 115,
    },
  ],
};
