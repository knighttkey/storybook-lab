import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SampleButton } from './SampleButton';

export default {
  title: 'SampleButton',
  component: SampleButton,
} as ComponentMeta<typeof SampleButton>;

const Template: ComponentStory<typeof SampleButton> = (args) => (
  <SampleButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};
export const Giant = Template.bind({});
Giant.args = {
  size: 'giant',
  label: 'Button',
};
export const Medium = Template.bind({});
Medium.args = {
  size: 'medium',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
