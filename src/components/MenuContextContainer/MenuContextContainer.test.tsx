import { render, screen } from '@testing-library/react';
import { MenuContextContainer } from './MenuContextContainer';
import userEvent from '@testing-library/user-event';

it('renders menu item with text', () => {
  const menuItemText = 'MenuItem';
  render(<MenuContextContainer menuItems={[menuItemText]} />);

  const menuItems: HTMLElement[] | null = screen.queryAllByRole('listitem');
  const menuItem = menuItems?.find((item) => item.textContent === menuItemText);

  expect(menuItem).toBeInTheDocument();
});

it('renders menu item with empty width', () => {
  const menuItemText = 'MenuItem';
  render(<MenuContextContainer menuItems={[menuItemText]} />);

  const menuItems: HTMLElement[] | null = screen.queryAllByRole('listitem');
  const menuItem = menuItems?.find((item) => item.textContent === menuItemText);

  expect(menuItem).toBeInTheDocument();
});

it('triggers onChange with menu item text only on click on menu item', async () => {
  const user = userEvent.setup();
  const menuItemText = 'MenuItem';
  const handleChange = jest.fn();
  const handleHideMenu = jest.fn();
  render(
    <MenuContextContainer
      menuItems={[menuItemText]}
      onChange={handleChange}
      onHideMenu={handleHideMenu}
    />
  );

  const menuItem: HTMLElement = screen.getByText(menuItemText);
  await user.click(menuItem);

  expect(handleChange).toBeCalledTimes(1);
  expect(handleChange).toBeCalledWith(menuItemText);
  expect(handleHideMenu).not.toBeCalled();
});

it('triggers onHideMenu only on click not on menu', async () => {
  const user = userEvent.setup();
  const notMenuElementText = 'Not menu element';
  const handleChange = jest.fn();
  const handleHideMenu = jest.fn();
  render(
    <>
      <MenuContextContainer
        menuItems={[]}
        onChange={handleChange}
        onHideMenu={handleHideMenu}
      />
      <h1>{notMenuElementText}</h1>
    </>
  );

  const notMenuElement: HTMLElement = screen.getByRole('heading', {
    name: notMenuElementText,
  });
  await user.click(notMenuElement);

  expect(handleHideMenu).toBeCalledTimes(1);
  expect(handleChange).not.toBeCalled();
});
