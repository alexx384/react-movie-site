import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchForm } from '.';
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'Stories/SearchForm',
  component: SearchForm,
  decorators: [withRouter],
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
