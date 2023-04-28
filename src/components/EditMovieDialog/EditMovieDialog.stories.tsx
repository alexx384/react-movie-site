import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditMovieContext, EditMovieDialog } from '.';
import { action } from '@storybook/addon-actions';
import { withRouter } from 'storybook-addon-react-router-v6';
import { Outlet } from 'react-router-dom';
import { UPDATE_MOVIE_URI } from '../../constants/request.constants';
import { movieByIdLoader } from '../../utils/test.utils';
import { ROOT_MOVIE_ID } from '../../constants/router.constants';
import { rest } from 'msw';

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
  msw: {
    handlers: [
      rest.put(UPDATE_MOVIE_URI, async (request, response, context) => {
        const body = await request.json();
        action('Responding to request')(body);
        return response(
          context.status(200),
          context.set('Content-Type', 'text/plain'),
          context.json(body)
        );
      }),
    ],
  },
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
