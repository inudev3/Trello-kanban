import React from "react";
import { useRecoilState } from "recoil";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled, { ThemeProvider } from "styled-components";
import { colorSchemeState, todoState } from "./model/atom";
import DraggableCard from "./components/DraggableCard";

import { breakpoints, darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/global.reset";
import MainRouter from "./routes/main.router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-width: ${breakpoints.sm};
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.color.primary};
  display: flex;
  justify-content: center;
  overflow: scroll;
`;
function App() {
  const [toDos, setTodos] = useRecoilState(todoState);
  const [colorScheme] = useRecoilState(colorSchemeState);
  return (
    <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Container>
        <MainRouter />
      </Container>
    </ThemeProvider>
  );
}

export default App;
