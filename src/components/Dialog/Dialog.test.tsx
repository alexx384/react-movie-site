import { render, screen } from '@testing-library/react';
import { Dialog } from './Dialog';
import { DIALOG_X_BUTTON } from '../../constants/tests.constants';
import userEvent from '@testing-library/user-event';

const TITLE = 'testTitle';
const BODY_TEST_ID = 'bodyTestID';
const BODY = <p data-testid={BODY_TEST_ID}>Hello World</p>;

it('renders title', () => {
  render(<Dialog title={TITLE}>{BODY}</Dialog>);

  const titleElement = screen.queryByRole('heading', { name: TITLE });

  expect(titleElement).toBeInTheDocument();
});

it('renders body', () => {
  render(<Dialog title={TITLE}>{BODY}</Dialog>);

  const bodyElement = screen.queryByTestId(BODY_TEST_ID);

  expect(bodyElement).toBeInTheDocument();
});

it('calls handleClose on X button click', async () => {
  const user = userEvent.setup();
  const handleClose = jest.fn();

  render(
    <Dialog title={TITLE} onClose={handleClose}>
      {BODY}
    </Dialog>
  );

  const xButton = screen.getByTestId(DIALOG_X_BUTTON);
  await user.click(xButton);

  expect(handleClose).toBeCalledTimes(1);
});
