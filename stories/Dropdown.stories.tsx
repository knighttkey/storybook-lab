import React, { Fragment } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "./Dropdown";

export default {
  title: "Dropdown",
  component: Dropdown
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
    <Dropdown {...args} />
);

export const Light = Template.bind({});
Light.args = {
  defaultText:"setting",
  itemList : ["A", "B", "C", "D"],
  menuWidth : "120px",
  menuHeight : "30px",
  manuMargin : "0",
  bgColor : "#ffffff",
  fontSize : "14px"
};

export const Dark = Template.bind({}); 
Dark.args = {
  defaultText:"setting",
  itemList : ["A", "B", "C", "D"],
  menuWidth : "120px",
  menuHeight : "30px",
  manuMargin : "0",
  bgColor : "#0b1216",
  fontSize : "14px"
};
