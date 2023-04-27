import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Outlet } from 'react-router-dom';
import { withRouter } from 'storybook-addon-react-router-v6';
import { AddMovieContext, AddMovieDialog } from '.';
import { CREATE_MOVIE_URI } from '../../constants/request.constants';

export default {
  title: 'Stories/AddMovieDialog',
  decorators: [withRouter],
  component: AddMovieDialog,
} as ComponentMeta<typeof AddMovieDialog>;

const Template: ComponentStory<typeof AddMovieDialog> = (args) => {
  const outletContext: AddMovieContext = {
    onAddMovie: action('Adding movie'),
    onCloseAddMovie: action('Closing adding movie dialog'),
  };
  return <Outlet context={outletContext} />;
};

export const Primary = Template.bind({});
Primary.parameters = {
  mockData: [
    {
      url: CREATE_MOVIE_URI,
      method: 'POST',
      status: 201,
      response: (request: Request) => {
        action('Responding to request')(request);
        const { body } = request;
        return { ...body, id: 12345 };
      },
    },
  ],
  reactRouter: {
    browserPath: '/new',
    routerPath: '/*',
    outlet: {
      element: <AddMovieDialog />,
      path: 'new',
    },
  },
};
