import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchForm } from '../components/SearchForm';

export default {
  title: 'Stories/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onSearch: {
      action: 'onSearch',
    },
  },
} as ComponentMeta<typeof SearchForm>;

const Template: ComponentStory<typeof SearchForm> = (args) => (
  <SearchForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  initialSearchQuery: 'HelloWorld',
};
