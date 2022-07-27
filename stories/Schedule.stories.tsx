import React, { Fragment } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Schedule } from "./Schedule";

export default {
  title: "Schedule",
  component: Schedule
} as ComponentMeta<typeof Schedule>;

const Template: ComponentStory<typeof Schedule> = (args) => (
    <Schedule {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultColor:'#4abcf0',
  activeColor:'orange',
  fontSize:'14px',
  cubeWidth:'30px',
  cubeHeight:'30px', 
  cubeRow: 7,
  cubeColumn: 24,
  cubeRadius:'2px',
  cubeMargin:'1px'
};

export const Large = Template.bind({});
Large.args = {
  defaultColor:'#4abcf0',
  activeColor:'orange',
  fontSize:'18px',
  cubeWidth:'50px',
  cubeHeight:'50px', 
  cubeRow: 7,
  cubeColumn: 24,
  cubeRadius:'5px',
  cubeMargin:'2px'
};
