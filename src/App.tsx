import React from "react";
import { useRecoilState } from "recoil";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { todoState } from "./components/atom";
import DraggableCard from "./components/DraggableCard";
import Board from "./components/Board";
import board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
const TrashCanWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const TrashCan = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

function App() {
  const [toDos, setTodos] = useRecoilState(todoState);
  const onDrageEnd = (info: DropResult) => {
    const { source, destination, draggableId } = info;
    console.log(source);
    if (!destination) return; //destination can be undefined
    if (destination.droppableId === "Delete" && source.droppableId !== "one") {
      setTodos((prev) => {
        const index = prev.findIndex(
          (board) => board.id === +source.droppableId
        );
        const copyBoards = [...prev];
        const newTodos = copyBoards[index].ToDos.splice(source.index, 1);
        const boardName = copyBoards[index].boardName;
        copyBoards.splice(index, 1);
        copyBoards.splice(index, 0, {
          id: +source.droppableId,
          boardName,
          ToDos: newTodos,
        });
        return copyBoards;
      });
    } else if (
      source.droppableId === "one" &&
      destination.droppableId === "one"
    ) {
      setTodos((prev) => {
        const boardCopy = [...prev];
        const newBoard = { ...boardCopy[source.index] };
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, newBoard);
        return boardCopy;
      });
    } else if (source.droppableId === destination.droppableId) {
      setTodos((prev) => {
        const boardCopy = [...prev];
        const index = prev.findIndex(
          (board) => board.id === +source.droppableId
        );
        const src = boardCopy[index].ToDos[source.index];
        boardCopy[index].ToDos.splice(source.index, 1);
        boardCopy[index].ToDos.splice(destination.index, 0, src);

        return boardCopy; //rest 오페레이터의 순서가 중요함 rest가 먼저오지 않으면 새로운 key로 변경되지 않음
      });
    } else if (source.droppableId !== destination.droppableId) {
      setTodos((prev) => {
        const boardCopy = [...prev];
        const srcIndex = prev.findIndex(
          (board) => board.id === +source.droppableId
        );
        const destIndex = prev.findIndex(
          (board) => board.id === +destination.droppableId
        );
        const srcCopy = { ...boardCopy[srcIndex] };
        const destCopy = { ...boardCopy[destIndex] };
        const srcTodos = srcCopy.ToDos.splice(source.index, 1);
        const destTodos = destCopy.ToDos.splice(
          destination.index,
          0,
          srcCopy.ToDos[source.index]
        );
        boardCopy.splice(srcIndex, 1);
        boardCopy.splice(destIndex, 1);
        boardCopy.splice(srcIndex, 0, {
          id: +source.droppableId,
          boardName: srcCopy.boardName,
          ToDos: srcTodos,
        });
        boardCopy.splice(destIndex, 0, {
          id: +destination.droppableId,
          boardName: destCopy.boardName,
          ToDos: destTodos,
        });
        return boardCopy;
      });
    }
    console.log(destination);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDrageEnd}>
        <TrashCanWrapper>
          <Droppable droppableId="Delete">
            {(magic, snapshot) => (
              <TrashCan ref={magic.innerRef} {...magic.droppableProps}>
                <Title>Trash Can</Title>
              </TrashCan>
            )}
          </Droppable>
        </TrashCanWrapper>
        <Wrapper>
          <Droppable droppableId="one">
            {(provided, snapshot) => (
              <Boards ref={provided.innerRef} {...provided.droppableProps}>
                {toDos.map(({ boardName, ToDos, id }, idx) => (
                  <Board
                    idx={idx}
                    key={id}
                    id={id}
                    ToDos={ToDos}
                    boardName={boardName}
                  />
                ))}
                {provided.placeholder}
              </Boards>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
