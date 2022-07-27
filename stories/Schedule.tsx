import { DragEvent, Fragment, useRef, useState } from "react";
import * as R from "ramda";
import styled from "styled-components";
import transparent from "./assets/transparent.png";

interface ScheduleProp {
  defaultColor: string;
  activeColor: string;
  fontSize: string;
  cubeWidth: string;
  cubeHeight: string;
  cubeRow: number;
  cubeColumn: number;
  cubeRadius: string;
  cubeMargin: string;
}

type DragPoint = {
  x: number;
  y: number;
};

interface ClickEventTarget extends EventTarget {
  id: string;
}

const ScheduleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-family: Arial;
`;
const ScheduleHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;
const HoursCubeWrap = styled.div.attrs(
  (props: { cubeHeight: string }) => props
)`
  display: flex;
  justify-content: center;
  height: ${(props) => props.cubeHeight};
`;
const HoursCube = styled.div.attrs(
  (props: { cubeWidth: string; cubeHeight: string; fontSize: string, cubeMargin: string }) => props
)`
  min-width: ${(props) => props.cubeWidth};
  height: ${(props) => props.cubeHeight};
  margin: ${(props) => props.cubeMargin};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
`;
const ScheduleBody = styled.div`
  display: flex;
  justify-content: center;
`;
const DaysCubeWrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 6px 0 0;
`;
const DaysCube = styled.div.attrs(
  (props: { cubeWidth: string; cubeHeight: string; fontSize: string, cubeMargin: string }) => props
)`
  min-width: ${(props) => props.cubeWidth};
  height: ${(props) => props.cubeHeight};
  margin: ${(props) => props.cubeMargin};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.fontSize};
  font-weight: 500;
  &:nth-child(6) {
    color: #ff5656;
  }
  &:nth-child(7) {
    color: #ff5656;
  }
`;
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
`;
const Cube = styled.div.attrs(
  (props: { cubeWidth: string; cubeHeight: string; cubeRadius: string, cubeMargin: string }) =>
    props
)`
  min-width: ${(props) => props.cubeWidth};
  height: ${(props) => props.cubeHeight};
  background-color: #2a8ab6;
  margin: ${(props) => props.cubeMargin};
  transition: 0.1s;
  border-radius: ${(props) => props.cubeRadius};
  &.selected {
    background-color: rgb(0, 255, 136);
  }
`;
const ModeSwitchPanel = styled.div`
  border: 1px solid rgba(52, 86, 118, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-sizing: border-box;
  padding: 5px 10px;
  border-radius:5px;
`;
const ModeSwitchButton = styled.div.attrs(
  (props: { cubeWidth: string; cubeHeight: string; cubeRadius: string }) =>
    props
)`
  width: ${(props) => props.cubeWidth};
  height: ${(props) => props.cubeHeight};
  border-radius: ${(props) => props.cubeRadius};
  margin: 0 8px;
  cursor: pointer;
  box-sizing: border-box;
  &.enable {
    border:3px solid #333;
  }
  &.disable {
    border:3px solid #333;
  }
`;

const panelTitle = {
  height: "20px",
  display: "flex",
  justifyContent: "center",
  padding: "3% 0"
};
const buttonText = {
  height: "30px",
  width: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const pannelInner = {
  display: "flex",
  justifyContent: "center",
  minWidth: "100%",
  padding: "3%"
};

const bottomArea = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
  padding: "0 5px 0 10px"
};

export const Schedule = (props: ScheduleProp) => {
  const {
    defaultColor,
    activeColor,
    fontSize,
    cubeWidth,
    cubeHeight,
    cubeRow,
    cubeColumn,
    cubeRadius,
    cubeMargin
  } = props;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [lastPoint, setLastPoint] = useState<DragPoint>();
  const [selectMode, setSelectMode] = useState<Boolean>(true);
  const [list, setList] = useState<string[]>([]);

  const pickAll = () => {
    let allCubeId: string[] = [];
    allList.forEach((hourItem, hourKey: number) => {
      hourItem.forEach((daysItem, daysKey: number) => {
        allCubeId.push(`${hourKey + 1}-${daysKey + 1}`);
      });
    });
    if (selectMode) {
      setList(allCubeId);
    } else {
      setList([]);
    }
  };

  const cancelDefault = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  const dragover = (e: DragEvent) => {
    if (!e.dataTransfer) return;
    e.dataTransfer.dropEffect = "move";
    cancelDefault(e);
  };

  const allList = new Array(cubeColumn).fill(0).map((item, key) => {
    return new Array(cubeRow).fill(0).map((key) => {
      return key + 1;
    });
  });

  const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  //點擊選取
  const pickCube = (eventTarget: ClickEventTarget) => {
    if (selectMode) {
      tempList.push(eventTarget.id);
      setList(tempList);
    } else {
      tempList = R.without([eventTarget.id], list);
      setList(tempList);
    }
  };
  let tempList = [...list];

  //框選選取
  const moveStart = (
    e: DragEvent,
    accordingX: number,
    accordingY: number,
    eventType: string
  ) => {
    e.stopPropagation();
    if (eventType === "dragstart") {
      e.dataTransfer.effectAllowed = "move";
      var img = new Image();
      img.src = transparent.toString();
      e.dataTransfer.setDragImage(img, 0, 0);
    }
    if (!wrapRef.current) return;
    const parentRect = wrapRef.current.getBoundingClientRect();
    let rectStartX = accordingX - parentRect.left;
    let rectStartY = accordingY - parentRect.top;

    let selectAreaEle = document.createElement("div");
    selectAreaEle.id = "selectArea";
    selectAreaEle.style.position = "absolute";
    selectAreaEle.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    selectAreaEle.style.left = rectStartX + "px";
    selectAreaEle.style.top = rectStartY + "px";

    wrapRef.current.appendChild(selectAreaEle);
    selectAreaEle.dataset.startX = rectStartX.toString();
    selectAreaEle.dataset.startY = rectStartY.toString();
  };

  const move = (e: DragEvent, accordingX: number, accordingY: number) => {
    if (!accordingX && !accordingY) return;
    if (accordingX < 0 && accordingY < 0) return;
    if (!wrapRef.current) return;
    const parentRect = wrapRef.current.getBoundingClientRect();

    let targetEle = document.getElementById("selectArea");

    let dragPositionX = accordingX - parentRect.left;
    if (dragPositionX < 0) {
      dragPositionX = 0;
    } else {
      if (dragPositionX > parentRect.width) {
        dragPositionX = parentRect.width;
      }
    }

    let dragPositionY = accordingY - parentRect.top;
    if (dragPositionY < 0) {
      dragPositionY = 0;
    } else if (dragPositionY > parentRect.height) {
      dragPositionY = parentRect.height;
    }
    if (targetEle) {
      const startX = targetEle.dataset.startX;
      const startY = targetEle.dataset.startY;
      let moveX = dragPositionX - Number(startX);
      let moveY = dragPositionY - Number(startY);

      if (moveX < 0) {
        targetEle.style.left = "unset";
        targetEle.style.right = parentRect.width - Number(startX) + "px";
      } else {
        targetEle.style.left = Number(startX) + "px";
        targetEle.style.right = "unset";
        if (moveX >= parentRect.width) {
          moveX = parentRect.right - Number(startX);
        }
      }

      if (moveY < 0) {
        targetEle.style.top = "unset";
        targetEle.style.bottom = parentRect.height - Number(startY) + "px";
      } else {
        targetEle.style.top = Number(startY) + "px";
        targetEle.style.bottom = "unset";
        if (moveY >= parentRect.height) {
          moveY = parentRect.bottom - Number(startY);
        } else {
        }
      }

      targetEle.style.width = Math.abs(moveX) + "px";
      targetEle.style.height = Math.abs(moveY) + "px";
    }

    setLastPoint({ x: dragPositionX, y: dragPositionY });
  };

  const moveEnd = (e: DragEvent) => {
    cancelDefault(e);
    let targetEle = document.getElementById("selectArea");
    if (targetEle) {
      if (wrapRef.current && lastPoint) {
        const parentRect = wrapRef.current.getBoundingClientRect();
        const startX = targetEle.dataset.startX;
        const startY = targetEle.dataset.startY;
        let moveX = lastPoint.x - Number(startX);
        let moveY = lastPoint.y - Number(startY);
        let direction = "";
        if (moveX > 0 && moveY > 0) {
          direction = "x+y+";
        } else if (moveX > 0 && moveY < 0) {
          direction = "x+y-";
        } else if (moveX < 0 && moveY > 0) {
          direction = "x-y+";
        } else if (moveX < 0 && moveY < 0) {
          direction = "x-y-";
        }
        detectBeSelect(
          { x: Number(startX), y: Number(startY) },
          { x: lastPoint.x, y: lastPoint.y },
          parentRect,
          direction
        );
        if (targetEle) {
          targetEle.remove();
          targetEle.dataset.startX = "";
          targetEle.dataset.startY = "";
        }
      }
    }
  };

  //判斷被選取的時刻方塊
  const detectBeSelect = (
    startPoint: DragPoint,
    lastPoint: DragPoint,
    parentRect: DOMRect,
    direction: string
  ) => {
    let cubeList = [...document.querySelectorAll(".cube")];
    cubeList.forEach((cubeItem, cubeIndex) => {
      let cubeRect = cubeItem.getBoundingClientRect();

      let cubeLeft = cubeRect.left - parentRect.left;
      let cubeRight = cubeRect.right - parentRect.left;
      let cubeTop = cubeRect.top - parentRect.top;
      let cubeBottom = cubeRect.bottom - parentRect.top;

      switch (direction) {
        case "x+y+":
          if (
            startPoint.x <= cubeRight &&
            cubeLeft <= lastPoint.x &&
            startPoint.y <= cubeBottom &&
            cubeTop <= lastPoint.y
          ) {
            if (selectMode) {
              tempList.push(cubeItem.id);
              setList(R.uniq(tempList));
            } else {
              let targetIndex = tempList.indexOf(cubeItem.id);
              if (targetIndex >= 0) {
                tempList.splice(targetIndex, 1);
                setList(R.uniq(tempList));
              } else {
                console.log("cubeItem.id", cubeItem.id);
              }
            }
          }
          break;
        case "x+y-":
          if (
            startPoint.x <= cubeRight &&
            cubeLeft <= lastPoint.x &&
            startPoint.y >= cubeTop &&
            cubeBottom >= lastPoint.y
          ) {
            if (selectMode) {
              tempList.push(cubeItem.id);
            } else {
              let targetIndex = tempList.indexOf(cubeItem.id);
              if (targetIndex >= 0) {
                tempList.splice(targetIndex, 1);
              }
            }
            setList(R.uniq(tempList));
          }
          break;
        case "x-y+":
          if (
            startPoint.x >= cubeLeft &&
            cubeRight >= lastPoint.x &&
            startPoint.y <= cubeBottom &&
            cubeTop <= lastPoint.y
          ) {
            if (selectMode) {
              tempList.push(cubeItem.id);
            } else {
              let targetIndex = tempList.indexOf(cubeItem.id);
              if (targetIndex >= 0) {
                tempList.splice(targetIndex, 1);
              }
            }
            setList(R.uniq(tempList));
          }
          break;
        case "x-y-":
          if (
            startPoint.x >= cubeLeft &&
            cubeRight >= lastPoint.x &&
            startPoint.y >= cubeTop &&
            cubeBottom >= lastPoint.y
          ) {
            if (selectMode) {
              tempList.push(cubeItem.id);
            } else {
              let targetIndex = tempList.indexOf(cubeItem.id);
              if (targetIndex >= 0) {
                tempList.splice(targetIndex, 1);
              }
            }
            setList(R.uniq(tempList));
          }
          break;

        default:
          break;
      }
    });
  };

  //結構渲染
  const renderHoursName = () => {
    return (
      <HoursCubeWrap cubeHeight={cubeHeight}>
        <HoursCube
          style={{
            margin: "0 7px 0 3px",
            cursor: "pointer",
            fontWeight: "500",
            color: defaultColor,
          }}
          cubeWidth={cubeWidth}
          cubeHeight={cubeHeight}
          cubeMargin={cubeMargin}
          fontSize={fontSize}
          onClick={pickAll}
        >
          All
        </HoursCube>
        {allList.map((item, key) => {
          if (key.toString().length === 1) {
            return (
              <HoursCube
                key={key}
                style={{ color: defaultColor }}
                cubeWidth={cubeWidth}
                cubeHeight={cubeHeight}
                fontSize={fontSize}
                cubeMargin={cubeMargin}
              >
                0{key}
              </HoursCube>
            );
          } else {
            return (
              <HoursCube
                key={key}
                style={{ color: defaultColor }}
                cubeWidth={cubeWidth}
                cubeHeight={cubeHeight}
                fontSize={fontSize}
                cubeMargin={cubeMargin}
              >
                {key}
              </HoursCube>
            );
          }
        })}
      </HoursCubeWrap>
    );
  };
  const renderDaysName = () => {
    return (
      <DaysCubeWrap>
        {daysList.map((item, key) => {
          return (
            <DaysCube
              key={key}
              style={{ color: defaultColor }}
              cubeWidth={cubeWidth}
              cubeHeight={cubeHeight}
              fontSize={fontSize}
              cubeMargin={cubeMargin}
            >
              {item}
            </DaysCube>
          );
        })}
      </DaysCubeWrap>
    );
  };

  const renderScheduleCube = () => {
    return allList.map((dayItem, key) => {
      return (
        <div
          key={key}
          className="hour"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {dayItem.map((cubeItem, cubeKey) => {
            return (
              <Cube
                className={`cube ${
                  R.includes(`${key + 1}-${cubeKey + 1}`, list)
                    ? "selected"
                    : ""
                }`}
                id={`${key + 1}-${cubeKey + 1}`}
                key={cubeKey}
                cubeWidth={cubeWidth}
                cubeHeight={cubeHeight}
                cubeRadius={cubeRadius}
                cubeMargin={cubeMargin}
                style={{
                  backgroundColor: R.includes(`${key + 1}-${cubeKey + 1}`, list)
                    ? activeColor
                    : defaultColor
                }}
                onClick={(e) =>
                  pickCube({
                    ...e.target,
                    id: `${key + 1}-${cubeKey + 1}`
                  })
                }
              ></Cube>
            );
          })}
        </div>
      );
    });
  };

  const renderBottomArea = () => {
    return (
      <Fragment>
        <div style={bottomArea}>
          <ModeSwitchPanel>
            <div
              style={{ ...panelTitle, color: defaultColor, fontSize: fontSize }}
            >
              Switch Panel
            </div>
            <div style={pannelInner}>
              <div
                style={{
                  ...buttonText,
                  color: defaultColor,
                  height: cubeHeight,
                  fontSize: fontSize
                }}
              >
                On
              </div>
              <ModeSwitchButton
                className={`${selectMode ? "enable" : ""}`}
                style={{ backgroundColor: activeColor }}
                cubeWidth={cubeWidth}
                cubeHeight={cubeHeight}
                cubeRadius={cubeRadius}
                onClick={() => setSelectMode(true)}
              ></ModeSwitchButton>
              <ModeSwitchButton
                className={`${!selectMode ? "disable" : ""}`}
                style={{ backgroundColor: defaultColor }}
                cubeWidth={cubeWidth}
                cubeHeight={cubeHeight}
                cubeRadius={cubeRadius}
                onClick={() => setSelectMode(false)}
              ></ModeSwitchButton>
              <div
                style={{
                  ...buttonText,
                  color: defaultColor,
                  height: cubeHeight,
                  fontSize: fontSize
                }}
              >
                Off
              </div>
            </div>
          </ModeSwitchPanel>
        </div>
      </Fragment>
    );
  };

  return (
    <ScheduleContainer>
      <ScheduleHeader>{renderHoursName()}</ScheduleHeader>
      <ScheduleBody>
        {renderDaysName()}
        <Wrap
          onDragEnter={(e) => cancelDefault(e)}
          onDragOver={(e) => dragover(e)}
          onDragStart={(e) => moveStart(e, e.clientX, e.clientY, e.type)}
          onDrag={(e) => move(e, e.clientX, e.clientY)}
          onDragEnd={(e) => moveEnd(e)}
          draggable={true}
          ref={wrapRef}
        >
          {renderScheduleCube()}
        </Wrap>
      </ScheduleBody>
      {renderBottomArea()}
    </ScheduleContainer>
  );
};
