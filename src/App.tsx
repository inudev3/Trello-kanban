import React, { useRef } from "react";
import { useRecoilState } from "recoil";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled, { ThemeProvider } from "styled-components";
import { colorSchemeState, todoState } from "./model/atom";
import { motion, useMotionValue } from "framer-motion";

const Wrapper = styled.div`
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
  hover: { scale: 1.5, rotateZ: 90 },
  click: { borderRadius: "100px", scale: 1 },
  drag: { backgroundColor: "#25CCF7", transition: { duration: 10 } },
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
function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  const [toDos, setTodos] = useRecoilState(todoState);
  const [colorScheme] = useRecoilState(colorSchemeState);
  const x = useMotionValue(0);
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragConstraints={
            biggerBoxRef
          } /*create a ref to make a component as the constraint*/
          dragElastic
          variants={boxVars}
          whileDrag="drag"
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
      {/*모션 제스쳐 이벤트 리스너 while*/}
      {/*blue 나 red같은 string값들 대신 애니메이트 될 수 있도록 숫자로된 값들을 넣야야함(예:rgba)*/}
    </Wrapper>
  );
}

export default App;
