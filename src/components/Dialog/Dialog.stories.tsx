import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { Dialog } from '.';
import fontStyles from '../../Font.module.css';
import searchFormStyles from '../SearchForm/SearchForm.module.css';
import classNames from 'classnames';
import { action } from '@storybook/addon-actions';
import { MovieInfo } from '../MovieForm';
import {
  UnfilledMovieForm,
  FilledMovieForm,
} from '../MovieForm/MovieForm.stories';

export default {
  title: 'Stories/Dialog',
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const SimpleDialogTemplate: ComponentStory<typeof Dialog> = (args) => {
  const [isDialogOpened, setIsDialogOpened] = React.useState(true);
  const handleOpenModalDialog = () => {
    setIsDialogOpened(() => true);
  };
  const handleSubmit = () => {
    action('onSubmit')();
    setIsDialogOpened(() => false);
  };
  const handleClose = () => {
    action('onClose')();
    setIsDialogOpened(() => false);
  };
  return (
    <>
      <button onClick={handleOpenModalDialog}>Click to open modal</button>
      <Dialog isOpened={isDialogOpened} {...args} onClose={handleClose}>
        <p style={{ margin: '0 0 3rem 0' }}>
          Are you sure you want to delete this movie?
        </p>
        <div style={{ textAlign: 'right' }}>
          <button
            className={classNames(
              fontStyles['submit-btn'],
              searchFormStyles['submit-btn']
            )}
            onClick={handleSubmit}
          >
            CONFIRM
          </button>
        </div>
      </Dialog>
    </>
  );
};

export const DeleteMovie = SimpleDialogTemplate.bind({});
DeleteMovie.args = {
  title: 'DELETE MOVIE',
};

export const AddMovie: ComponentStory<typeof Dialog> = (args) => {
  const [isDialogOpened, setIsDialogOpened] = React.useState(true);
  const handleOpenModalDialog = () => {
    setIsDialogOpened(() => true);
  };
  const handleSubmit = (movieInfo: MovieInfo) => {
    action('onSubmit')(movieInfo);
    setIsDialogOpened(() => false);
  };
  const handleClose = () => {
    action('onClose')();
    setIsDialogOpened(() => false);
  };
  return (
    <>
      <button onClick={handleOpenModalDialog}>Click to open modal</button>
      <Dialog isOpened={isDialogOpened} {...args} onClose={handleClose}>
        <UnfilledMovieForm
          {...UnfilledMovieForm.args}
          onSubmit={handleSubmit}
        />
      </Dialog>
    </>
  );
};
AddMovie.args = {
  title: 'ADD MOVIE',
};

export const EditMovie: ComponentStory<typeof Dialog> = (args) => {
  const [isDialogOpened, setIsDialogOpened] = React.useState(true);
  const handleOpenModalDialog = () => {
    setIsDialogOpened(() => true);
  };
  const handleSubmit = (movieInfo: MovieInfo) => {
    action('onSubmit')(movieInfo);
    setIsDialogOpened(() => false);
  };
  const handleClose = () => {
    action('onClose')();
    setIsDialogOpened(() => false);
  };
  return (
    <>
      <button onClick={handleOpenModalDialog}>Click to open modal</button>
      <Dialog isOpened={isDialogOpened} {...args} onClose={handleClose}>
        <FilledMovieForm {...FilledMovieForm.args} onSubmit={handleSubmit} />
      </Dialog>
    </>
  );
};
AddMovie.args = {
  title: 'ADD MOVIE',
};
