import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { EditMovieDialog } from '.';
import { action } from '@storybook/addon-actions';
import { MovieInfo } from '../MovieForm';
import { TEST_MOVIE_INFO } from '../../constants/movieForm.constants';

export default {
  title: 'Stories/EditMovieDialog',
  component: EditMovieDialog,
} as ComponentMeta<typeof EditMovieDialog>;

const Template: ComponentStory<typeof EditMovieDialog> = (args) => {
  const [isDialogOpened, setIsDialogOpened] = React.useState(true);
  const handleOpenModalDialog = () => {
    setIsDialogOpened(() => true);
  };
  const handleClose = () => {
    action('onClose')();
    setIsDialogOpened(() => false);
  };
  const handleSubmit = (movieInfo: MovieInfo) => {
    action('onSubmit')(movieInfo);
    setIsDialogOpened(() => false);
  };
  return (
    <>
      <button onClick={handleOpenModalDialog}>Click to open modal</button>
      <EditMovieDialog
        {...args}
        isOpened={isDialogOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  movieInfo: TEST_MOVIE_INFO,
};
