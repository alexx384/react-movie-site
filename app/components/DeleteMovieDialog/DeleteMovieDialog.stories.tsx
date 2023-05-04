import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { DeleteMovieDialog } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Stories/DeleteMovieDialog',
  component: DeleteMovieDialog,
} as ComponentMeta<typeof DeleteMovieDialog>;

const Template: ComponentStory<typeof DeleteMovieDialog> = (args) => {
  const [isDialogOpened, setIsDialogOpened] = React.useState(true);
  const handleOpenModalDialog = () => {
    setIsDialogOpened(() => true);
  };
  const handleClose = () => {
    action('onClose')();
    setIsDialogOpened(() => false);
  };
  const handleSubmit = () => {
    action('onSubmit')();
    setIsDialogOpened(() => false);
  };
  return (
    <>
      <button onClick={handleOpenModalDialog}>Click to open modal</button>
      <DeleteMovieDialog
        {...args}
        isOpened={isDialogOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export const Primary = Template.bind({});
