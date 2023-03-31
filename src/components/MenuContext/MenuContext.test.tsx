import { render, screen } from '@testing-library/react';
import { MenuContext } from './MenuContext';
import userEvent from '@testing-library/user-event';

const CHILD_TEXT = 'Hello World';

it('renders ReactNode children', () => {
  render(
    <MenuContext menuItems={[]}>
      <h1>{CHILD_TEXT}</h1>
    </MenuContext>
  );

  const childElement: HTMLElement | null = screen.queryByRole('heading', {
    name: CHILD_TEXT,
  });

  expect(childElement).toBeInTheDocument();
});

it('renders menu item on context menu click', async () => {
  const user = userEvent.setup();
  const menuItemText = 'Edit';
  render(
    <MenuContext menuItems={[menuItemText]}>
      <h1>{CHILD_TEXT}</h1>
    </MenuContext>
  );

  const childElement: HTMLElement = screen.getByRole('heading', {
    name: CHILD_TEXT,
  });
  await user.pointer({ keys: '[MouseRight>]', target: childElement });
  const menuItemElement: HTMLElement | null = screen.queryByText(menuItemText);

  expect(menuItemElement).toBeInTheDocument();
});

it('does not render menu item without context menu click', () => {
  const menuItemText = 'Edit';
  render(
    <MenuContext menuItems={[menuItemText]}>
      <h1>{CHILD_TEXT}</h1>
    </MenuContext>
  );

  const menuItemElement: HTMLElement | null = screen.queryByText(menuItemText);

  expect(menuItemElement).not.toBeInTheDocument();
});

it('returns context menu item text on context menu click and chose item', async () => {
  const user = userEvent.setup();
  const menuItemText = 'Edit';
  const handleSelectMenuItem = jest.fn();
  render(
    <MenuContext
      menuItems={[menuItemText]}
      onSelectMenuItem={handleSelectMenuItem}
    >
      <h1>{CHILD_TEXT}</h1>
    </MenuContext>
  );

  const childElement: HTMLElement = screen.getByRole('heading', {
    name: CHILD_TEXT,
  });
  await user.pointer({ keys: '[MouseRight>]', target: childElement });
  const menuItemElement: HTMLElement = screen.getByText(menuItemText);
  await user.click(menuItemElement);

  expect(handleSelectMenuItem).toBeCalledTimes(1);
  expect(handleSelectMenuItem).toBeCalledWith(menuItemText);
});
