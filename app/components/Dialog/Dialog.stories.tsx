import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Dialog } from '.';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Stories/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => {
  const [isDialogOpened, setIsDialogOpened] = React.useState(true);
  const handleOpenModalDialog = () => {
    setIsDialogOpened(() => true);
  };
  const handleClose = () => {
    action('onClose')();
    setIsDialogOpened(() => false);
  };
  return (
    <>
      <button onClick={handleOpenModalDialog}>Click to open modal</button>
      <Dialog isOpened={isDialogOpened} {...args} onClose={handleClose} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  title: 'TEST',
};
