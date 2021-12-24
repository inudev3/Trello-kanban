import React, { useEffect } from "react";
import styled from "styled-components";
import { breakpoints, device } from "../styles/theme";
import { useRecoilState } from "recoil";
import { saveTodos, todoState } from "../model/atom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import DroppableCard from "../components/Droppable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCategoryButton from "../components/AddCategoryButton";

const Box = styled.div`
  display: flex;

  ${device.xl} {
    width: ${breakpoints.lg};
  }
  width: 100%;
  min-width: ${breakpoints.sm};
  flex-direction: column;
  padding-top: 20px;
  position: relative;
  h1 {
    font-size: 48px;
    color: ${(props) => props.theme.color.link};
  }
  h4 {
    font-size: 16px;
    color: ${(props) => props.theme.color.primary};
  }
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  align-items: flex-start;
  padding-top: 10px;
  background-color: ${(props) => props.theme.background.primary};
`;
const TrashCan = styled.div<{ isDraggingOVer: boolean }>`
  position: fixed;
  width: 50px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: crimson;
  right: 30px;
  bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-in-out;
  ${(props) => (props.isDraggingOVer ? "transform: scale(1.3)" : "")};
`;
const MainPage = () => {
  const [toDos, setTodos] = useRecoilState(todoState);
  const onDragEnd = ({
    destination,
    source,
    type,
    draggableId,
  }: DropResult) => {
    if (!destination) return;
    if (type === "Category") {
      setTodos((prev) => {
        const entries = Object.entries(prev);
        const [temp] = entries.splice(source.index, 1); //splice는 배열을 반환
        console.log(temp);
        entries.splice(destination.index, 0, temp);
        return entries.reduce((result, [k, v]) => ({ ...result, [k]: v }), {});
      });
    } else if (destination?.droppableId === "TrashCan") {
      setTodos((prev) => {
        const copied = prev[source.droppableId].slice(0);
        copied.splice(source.index, 1);
        return { ...prev, [source.droppableId]: copied };
      });
    } else if (destination.droppableId === source.droppableId) {
      setTodos((prev) => {
        const copied = prev[source.droppableId].slice(0);
        const [temp] = copied.splice(source.index, 1);
        copied.splice(destination.index, 0, temp);
        return {
          ...prev,
          [source.droppableId]: copied,
        };
      });
    } else {
      setTodos((prev) => {
        const srcCopy = prev[source.droppableId].slice(0);
        const destCopy = prev[destination.droppableId].slice(0);
        const [temp] = srcCopy.splice(source.index, 1);
        destCopy.splice(destination.index, 0, temp);
        return {
          ...prev,
          [source.droppableId]: srcCopy,
          [destination.droppableId]: destCopy,
        };
      });
    }
  };
  useEffect(() => {
    saveTodos(toDos);
  }, [toDos]);
  return (
    <Box>
      <AddCategoryButton />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId={"Category"}
          type={"Category"}
          direction={"horizontal"}
        >
          {(p, snapshot) => (
            <Container ref={p.innerRef} {...p.droppableProps}>
              {Object.keys(toDos).map((category, idx) => (
                <DroppableCard
                  key={category}
                  index={idx}
                  droppableId={category}
                  title={category}
                  toDos={toDos[category]}
                />
              ))}
              {p.placeholder}
            </Container>
          )}
        </Droppable>
        <Droppable droppableId={"TrashCan"}>
          {(p, s) => (
            <TrashCan
              ref={p.innerRef}
              {...p.droppableProps}
              isDraggingOVer={s.isDraggingOver}
            >
              <FontAwesomeIcon icon={"moon"} />
              {p.placeholder}
            </TrashCan>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};
export default MainPage;
