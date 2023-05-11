import { render, screen } from '@testing-library/react';
import { SortControl } from './SortControl';
import userEvent from '@testing-library/user-event';
import { MOVIE_SORT_CONTROL } from '../../constants/tests.constants';
import {
  SHAMEFUL_TRIANGLE,
  SORT_BY,
} from '../../constants/sortControl.constants';

it('renders sort buttons', () => {
  const selectedOptionName = 'RELEASE DATE';
  render(
    <SortControl
      options={[selectedOptionName]}
      selectedOption={selectedOptionName}
    />
  );

  const sortByElement: HTMLElement | null = screen.queryByText(SORT_BY);
  const selectedOptionElement: HTMLElement | null =
    screen.queryByText(selectedOptionName);
  const shamefulTriangleElement: HTMLElement | null =
    screen.queryByText(SHAMEFUL_TRIANGLE);

  expect(sortByElement).toBeInTheDocument();
  expect(selectedOptionElement).toBeInTheDocument();
  expect(shamefulTriangleElement).toBeInTheDocument();
});

it(`renders menu item on SortControl click`, async () => {
  const user = userEvent.setup();
  const selectedOptionName = 'RELEASE DATE';
  render(
    <SortControl
      options={[selectedOptionName]}
      selectedOption={selectedOptionName}
    />
  );

  const sortControlElement: HTMLElement =
    screen.getByTestId(MOVIE_SORT_CONTROL);
  await user.click(sortControlElement);
  const menuItems: HTMLElement[] | null = screen.queryAllByRole('listitem');
  const menuItem = menuItems?.find(
    (item) => item.textContent === selectedOptionName
  );

  expect(menuItem).toBeInTheDocument();
});

it(`hides menu item on '${SHAMEFUL_TRIANGLE}' click and option select`, async () => {
  const user = userEvent.setup();
  const selectedOptionName = 'RELEASE DATE';
  render(
    <SortControl
      options={[selectedOptionName]}
      selectedOption={selectedOptionName}
    />
  );

  const shamefulTriangleElement: HTMLElement =
    screen.getByText(SHAMEFUL_TRIANGLE);
  await user.click(shamefulTriangleElement);
  const menuItems: HTMLElement[] | null = screen.getAllByRole('listitem');
  const menuItem = menuItems.find(
    (item) => item.textContent === selectedOptionName
  ) as HTMLElement;
  await user.click(menuItem);
  const menuItemAfterSelect: HTMLElement | null =
    screen.queryByRole('listitem');

  expect(menuItemAfterSelect).not.toBeInTheDocument();
});

it(`invokes onSelect on '${SHAMEFUL_TRIANGLE}' click and option select`, async () => {
  const user = userEvent.setup();
  const selectedOptionName = 'RELEASE DATE';
  const handleSelect = jest.fn();
  render(
    <SortControl
      options={[selectedOptionName]}
      selectedOption={selectedOptionName}
      onSelect={handleSelect}
    />
  );

  const shamefulTriangleElement: HTMLElement =
    screen.getByText(SHAMEFUL_TRIANGLE);
  await user.click(shamefulTriangleElement);
  const menuItems: HTMLElement[] | null = screen.getAllByRole('listitem');
  const menuItem = menuItems.find(
    (item) => item.textContent === selectedOptionName
  ) as HTMLElement;
  await user.click(menuItem);

  expect(handleSelect).toBeCalledTimes(1);
  expect(handleSelect).toBeCalledWith(selectedOptionName);
});

it(`hides menu item on '${SHAMEFUL_TRIANGLE}' click and not on menu item element click`, async () => {
  const user = userEvent.setup();
  const selectedOptionName = 'RELEASE DATE';
  const notMenuItemElementText = 'Not a menu item element';
  const handleSelect = jest.fn();
  render(
    <>
      <SortControl
        options={[selectedOptionName]}
        selectedOption={selectedOptionName}
        onSelect={handleSelect}
      />
      <h1>{notMenuItemElementText}</h1>
    </>
  );

  const shamefulTriangleElement: HTMLElement =
    screen.getByText(SHAMEFUL_TRIANGLE);
  await user.click(shamefulTriangleElement);
  const notMenuItemElement: HTMLElement = screen.getByRole('heading', {
    name: notMenuItemElementText,
  });
  await user.click(notMenuItemElement);
  const menuItemAfterSelect: HTMLElement | null =
    screen.queryByRole('listitem');

  expect(menuItemAfterSelect).not.toBeInTheDocument();
  expect(handleSelect).not.toBeCalled();
});
