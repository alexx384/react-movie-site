import { render, screen } from '@testing-library/react';
import { ThreeDotsButton } from './ThreeDotsButton';
import userEvent from '@testing-library/user-event';
import { THREE_DOTS_BUTTON_BLOCK } from '../../../constants/tests.constants';
import { THREE_DOTS_SYMBOL } from '../../../constants/threeDotsButton.constants';

it('renders menu items on hower and button click', async () => {
  const user = userEvent.setup();
  render(
    <ThreeDotsButton>
      <></>
    </ThreeDotsButton>
  );

  const threeDotsBlock: HTMLDivElement = screen.getByTestId(
    THREE_DOTS_BUTTON_BLOCK
  );
  await user.hover(threeDotsBlock);

  const button = screen.getByRole('button', { name: THREE_DOTS_SYMBOL });
  await user.click(button);

  const items: HTMLElement[] | null = screen.queryAllByRole('listitem');

  expect(items).not.toEqual(null);
  expect(items.length).toBeGreaterThan(0);
});
