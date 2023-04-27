import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditMovieContext, EditMovieDialog } from '.';
import { action } from '@storybook/addon-actions';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Outlet } from 'react-router-dom';
import { UPDATE_MOVIE_URI } from '../../constants/request.constants';
import { movieByIdLoader } from '../../utils/test.utils';
import { ROOT_MOVIE_ID } from '../../constants/router.constants';

export default {
  title: 'Stories/EditMovieDialog',
  decorators: [withRouter],
  component: EditMovieDialog,
} as ComponentMeta<typeof EditMovieDialog>;

const Template: ComponentStory<typeof EditMovieDialog> = (args) => {
  const outletContext: EditMovieContext = {
    onCloseEditMovie: action('Closing edit movie dialog'),
    onEditMovie: action('Editing movie'),
  };
  return <Outlet context={outletContext} />;
};

export const Primary = Template.bind({});
Primary.parameters = {
  mockData: [
    {
      url: UPDATE_MOVIE_URI,
      method: 'PUT',
      status: 200,
      response: (request: Request) => {
        action('Responding to request')(request);
        const { body } = request;
        return { ...body };
      },
    },
  ],
  reactRouter: {
    browserPath: '/10191/edit',
    routerPath: '/*',
    outlet: {
      element: <EditMovieDialog />,
      loader: movieByIdLoader,
      path: `:${ROOT_MOVIE_ID}/edit`,
    },
  },
};
