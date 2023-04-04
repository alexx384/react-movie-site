import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Dialog } from '.';
import fontStyles from '../../Font.module.css';
import searchFormStyles from '../SearchForm/SearchForm.module.css';
import classNames from 'classnames';

export default {
  title: 'Stories/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Click to open modal</button>
      {isOpen && (
        <Dialog {...args} onClose={() => setIsOpen(false)}>
          <p style={{ margin: '0 0 3rem 0' }}>
            Are you sure you want to delete this movie?
          </p>
          <div style={{ textAlign: 'right' }}>
            <button
              className={classNames(
                fontStyles['submit-btn'],
                searchFormStyles['submit-btn']
              )}
            >
              CONFIRM
            </button>
          </div>
        </Dialog>
      )}
    </>
  );
};

export const DeleteMovie = Template.bind({});
DeleteMovie.args = {
  title: 'DELETE MOVIE',
};
