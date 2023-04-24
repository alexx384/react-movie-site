import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieListPage } from '.';
import { withRouter } from 'storybook-addon-react-router-v6';
import { MovieListPageError } from './MovieListPageError';
import { TEST_ROOT_RESPONSE } from '../../constants/movieListPage.constants';
import { SearchFormHeader } from './SearchFormHeader';
import { LoaderFunctionArgs } from 'react-router-dom';
import { ROOT_MOVIE_ID } from '../../constants/router.constants';
import { MovieDetailsHeader } from './MovieDetailsHeader';
import { MovieDetailsHeaderError } from './MovieDetailsHeader/MovieDetailsHeaderError';

export default {
  title: 'Pages/MovieListPage',
  component: MovieListPage,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MovieListPage>;

const movieByIdLoader = ({ params }: LoaderFunctionArgs) => {
  const movieId = Number(params[ROOT_MOVIE_ID]);
  const movieData = TEST_ROOT_RESPONSE.data.filter(
    (movieData) => movieData.id === movieId
  )?.[0];
  if (movieData) {
    return movieData;
  } else {
    throw new Response('Something went wrong', { status: 400 });
  }
};

const Template: ComponentStory<typeof MovieListPage> = (args) => (
  <MovieListPage />
);

export const MovieDetails = Template.bind({});
MovieDetails.story = {
  parameters: {
    reactRouter: {
      browserPath: '/10191',
      routePath: '/*',
      loader: () => TEST_ROOT_RESPONSE,
      errorElement: <MovieListPageError />,
      outlet: {
        element: <MovieDetailsHeader />,
        path: `:${ROOT_MOVIE_ID}`,
        loader: movieByIdLoader,
        errorElement: <MovieDetailsHeaderError />,
      },
    },
  },
};

export const SearchForm = Template.bind({});
SearchForm.story = {
  parameters: {
    reactRouter: {
      browserPath: '/',
      routePath: '/',
      loader: () => TEST_ROOT_RESPONSE,
      errorElement: <MovieListPageError />,
      outlet: {
        element: <SearchFormHeader />,
        path: '/',
      },
    },
  },
};
