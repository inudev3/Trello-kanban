import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled, { ThemeProvider } from "styled-components";
import { colorSchemeState, todoState } from "./model/atom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useViewportScroll } from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVars = {
  // configure transition inside of the last stage
  start: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    y: 20,
  },
};
const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const Svg = styled.svg`
  width: 300px;
  height: 300px;
  path {
    stroke: white; // 외곽선
    stroke-width: 2;
  }
`;
const svg = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    fill: "rgba(255, 255, 255, 1)",
    pathLength: 1,
    transition: { default: { duration: 5 }, fill: { duration: 2, delay: 3 } },
  },
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const [toDos, setTodos] = useRecoilState(todoState);
  const [colorScheme] = useRecoilState(colorSchemeState);
  const [showing, setShow] = useState(false);
  const xcors = useMotionValue(0); //motion value는 리액트의 상태가 아니므로 리렌더링을 일으키지 않음
  const rotateZ = useTransform(xcors, [-800, 800], [-360, 360]); //mapping input array to output array
  const gradient = useTransform(
    xcors,
    [-800, 0, 800],
    [
      "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
      "linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238))",
      "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
    ]
  );
  const { scrollY, scrollYProgress } = useViewportScroll();
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const toggleShow = () => setShow((prev) => !prev);
  return (
    <Wrapper style={{ background: gradient }}>
      <button onClick={toggleShow}>click</button>
      <AnimatePresence>
        {showing ? (
          <Box
            variants={boxVars}
            initial={"start"}
            animate={"visible"}
            exit={"leaving"} /*animatino that happens when the elements exits*/
          />
        ) : null}
      </AnimatePresence>
      <Svg
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
        />
      </Svg>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          style={{
            x: xcors /*shortcut of x:x*/,
            rotateZ,
            scale: scrollScale,
          }} /*style의 value들을 연결시키기*/
        />
      </BiggerBox>
      {/*모션 제스쳐 이벤트 리스너 while*/}
      {/*blue 나 red같은 string값들 대신 애니메이트 될 수 있도록 숫자로된 값들을 넣야야함(예:rgba)*/}
    </Wrapper>
  );
}

export default App;
