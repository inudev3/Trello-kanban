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
  flex-direction: column;
`;
const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const sliderState = {
  1: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  2: { x: 350, opacity: 0.7, scale: 0.7, transition: { duration: 1 } },
  3: { x: 0, opacity: 1, scale: 1, transition: { duration: 1 } },
  4: { x: -350, opacity: 0.7, scale: 0.7, transition: { duration: 1 } },
  5: { x: -500, opacity: 0, scale: 0, transition: { duration: 1 } },
};

const boxVars = {
  entry: (idx: number) =>
    idx === 0
      ? sliderState["1"]
      : idx === 1
      ? sliderState["2"]
      : sliderState["3"],
  center: (idx: number) =>
    idx === 0
      ? sliderState["2"]
      : idx === 1
      ? sliderState["3"]
      : sliderState["4"],
  exit: (idx: number) =>
    idx === 0
      ? sliderState["3"]
      : idx === 1
      ? sliderState["4"]
      : sliderState["5"],
};
const backVars = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: (back: boolean) => ({
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1 },
  }),
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
    transition: { duration: 1 },
  }),
};
function App() {
  const [slider, setSlider] = useState([1, 2, 3]);
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => {
      if (prev === 10) {
        return 1;
      } else {
        return prev + 1;
      }
    });
    setSlider((prev) => {
      return prev.map((num) => {
        if (num === 10) return 1;
        return num + 1;
      });
    });
  };
  const prevPlease = () => {
    setBack(true);
    setSlider((prev) => {
      return prev.map((num) => {
        if (num === 1) return 10;
        return num - 1;
      });
    });
    setVisible((prev) => {
      if (prev === 1) {
        return 10;
      } else {
        return prev - 1;
      }
    });
  };
  return (
    <Wrapper>
      <AnimatePresence>
        <Box
          custom={back}
          variants={backVars}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={prevPlease}>prev</button>
    </Wrapper>
  );
}

export default App;
