import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThreeDotsButton } from '.';

export default {
  title: 'Stories/MovieTile/ThreeDotsButton',
  component: ThreeDotsButton,
} as ComponentMeta<typeof ThreeDotsButton>;

const Template: ComponentStory<typeof ThreeDotsButton> = (args) => (
  <div style={{ width: '500px' }}>
    <ThreeDotsButton {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <div
      style={{
        width: '100%',
        height: '100px',
        border: '1px solid #000',
        backgroundColor: 'white',
      }}
    />
  ),
};
