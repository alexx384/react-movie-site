import { render, screen } from '@testing-library/react';
import { MenuContext } from './MenuContext';
import userEvent from '@testing-library/user-event';

it('renders ReactNode children', () => {
  const childText = 'Hello World';
  render(
    <MenuContext menuItems={[]}>
      <h1>{childText}</h1>
    </MenuContext>
  );

  const childElement: HTMLElement | null = screen.queryByRole('heading', {
    name: childText,
  });

  expect(childElement).toBeInTheDocument();
});

it('renders menu item on context menu click', async () => {
  const user = userEvent.setup();
  const childText = 'Hello World';
  const menuItemText = 'Edit';
  render(
    <MenuContext menuItems={[menuItemText]}>
      <h1>{childText}</h1>
    </MenuContext>
  );

  const childElement: HTMLElement = screen.getByRole('heading', {
    name: childText,
  });
  await user.pointer({ keys: '[MouseRight>]', target: childElement });
  const menuItemElement: HTMLElement | null = screen.queryByText(menuItemText);

  expect(menuItemElement).toBeInTheDocument();
});

it('does not render menu item without context menu click', () => {
  const childText = 'Hello World';
  const menuItemText = 'Edit';
  render(
    <MenuContext menuItems={[menuItemText]}>
      <h1>{childText}</h1>
    </MenuContext>
  );

  const menuItemElement: HTMLElement | null = screen.queryByText(menuItemText);

  expect(menuItemElement).not.toBeInTheDocument();
});

it('returns context menu item text on context menu click and chose item', async () => {
  const user = userEvent.setup();
  const childText = 'Hello World';
  const menuItemText = 'Edit';
  const handleSelectMenuItem = jest.fn();
  render(
    <MenuContext
      menuItems={[menuItemText]}
      onSelectMenuItem={handleSelectMenuItem}
    >
      <h1>{childText}</h1>
    </MenuContext>
  );

  const childElement: HTMLElement = screen.getByRole('heading', {
    name: childText,
  });
  await user.pointer({ keys: '[MouseRight>]', target: childElement });
  const menuItemElement: HTMLElement = screen.getByText(menuItemText);
  await user.click(menuItemElement);

  expect(handleSelectMenuItem).toBeCalledTimes(1);
  expect(handleSelectMenuItem).toBeCalledWith(menuItemText);
});
