import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieListPage } from '.';
import { withRouter } from 'storybook-addon-react-router-v6';
import { MovieListPageError } from './MovieListPageError';
import { TEST_ROOT_RESPONSE } from '../../constants/movieListPage.constants';
import { SearchFormHeader } from './SearchFormHeader';
import { ROOT_MOVIE_ID } from '../../constants/router.constants';
import { MovieDetailsHeader } from './MovieDetailsHeader';
import { MovieDetailsHeaderError } from './MovieDetailsHeader/MovieDetailsHeaderError';
import { movieByIdLoader } from '../../utils/test.utils';

export default {
  title: 'Pages/MovieListPage',
  component: MovieListPage,
  decorators: [withRouter],
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MovieListPage>;

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
