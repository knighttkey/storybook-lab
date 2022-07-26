import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";

interface DropDownProps {
  defaultText: string;
  itemList: string[];
  menuWidth: string;
  menuHeight: string;
  manuMargin?: string;
  bgColor?:string;
  fontSize:string;
}

const DropDownContainer = styled.div.attrs(
  (props: { menuWidth: string; manuMargin: string }) => props
)`
  width: ${(props) => props.menuWidth};
  margin: ${(props) => (props.manuMargin ? props.manuMargin : "5px")};
`;
const DefaultArea = styled.div.attrs((props: { menuHeight: string, bgColor: string }) => props)`
  width: 100%;
  height: ${(props) => props.menuHeight};
  background-color: ${(props) => props.bgColor};
  color: #2a8ab6;
  display: flex;
  align-items: center;
  border: solid 1px #2a8ab6;
  box-sizing:border-box;
  border-radius:3px;
  font-weight:500;
`;
const ItemNameArea = styled.div.attrs((props: { menuHeight: string, fontSize:string }) => props)`
  width: 100%;
  height: 100%;
  color: #2a8ab6;
  line-height: ${(props) => `calc(${props.menuHeight} - 2px)`};
  font-size: ${(props) => props.fontSize};
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const IconArea = styled.div.attrs((props: { menuHeight: string }) => props)`
  width: ${(props) => props.menuHeight};
  height: ${(props) => `calc(${props.menuHeight} - 6px)`};
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #2a8ab6;
  transition: 0.3s;
  cursor: pointer;
`;
const ArrowDown = styled.div.attrs((props: { unfold: Boolean }) => props)`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #2a8ab6;
  transition: 0.3s;
  transform: ${(props) => (props.unfold ? "scaleY(-1)" : "unset")};
  cursor: pointer;
`;
const UnfoldArea = styled.div.attrs((props: { unfold: Boolean, bgColor: string }) => props)`
  width: 100%;
  background-color: ${(props) => props.bgColor};
  color: #2a8ab6;
  transition: 0.3s;
  overflow: hidden;
  transform: scaleY(${(props) => (props.unfold ? 1 : 0)});
  transform-origin: top;
  margin-top: 6px;
  border: solid 1px #2a8ab6;
  box-sizing: border-box;
  border-radius:3px;
`;
const EachItem = styled.div.attrs((props: { menuHeight: string, fontSize:string }) => props)`
  width: 100%;
  height: ${(props) => props.menuHeight};
  color: #2a8ab6;
  transition: 0.3s;
  line-height: ${(props) => props.menuHeight};
  cursor: pointer;
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: ${(props) => props.fontSize};
  box-sizing: border-box;
  font-weight:500;
  &:hover {
    background-color: #2a8ab6;
    color: #0b1216;
  }
`;

export const Dropdown = (props: DropDownProps) => {
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const {
    defaultText = "setting",
    itemList = ["A", "B", "C", "D"],
    menuWidth = "120px",
    menuHeight = "30px",
    manuMargin = "0",
    bgColor="#0b1216",
    fontSize="14px"
  } = props;
  const [selectedItem, setSelectedItem] = useState<string>(defaultText);

  const selectItem = (item: string) => {
    setSelectedItem(item);
    setShowMenu(false);
  };

  return (
    <DropDownContainer menuWidth={menuWidth} manuMargin={manuMargin}>
      <DefaultArea
        menuHeight={menuHeight}
        bgColor={bgColor}
        onClick={() => setShowMenu(!showMenu)}
      >
        <ItemNameArea menuHeight={menuHeight} fontSize={fontSize}>{selectedItem}</ItemNameArea>
        <IconArea menuHeight={menuHeight}>
          <ArrowDown unfold={showMenu}></ArrowDown>
        </IconArea>
      </DefaultArea>
      <UnfoldArea unfold={showMenu} bgColor={bgColor}>
        {itemList.map((item, key) => {
          return (
            <EachItem
              key={key}
              menuHeight={menuHeight}
              fontSize={fontSize}
              onClick={() => selectItem(item)}
            >
              {item}
            </EachItem>
          );
        })}
      </UnfoldArea>
    </DropDownContainer>
  );
};
