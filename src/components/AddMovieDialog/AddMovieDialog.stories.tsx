import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { AddMovieDialog } from '.';
import { action } from '@storybook/addon-actions';
import { MovieInfo } from '../MovieForm';

export default {
  title: 'Stories/AddMovieDialog',
  component: AddMovieDialog,
} as ComponentMeta<typeof AddMovieDialog>;

const Template: ComponentStory<typeof AddMovieDialog> = (args) => {
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
      <AddMovieDialog
        {...args}
        isOpened={isDialogOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export const Primary = Template.bind({});
