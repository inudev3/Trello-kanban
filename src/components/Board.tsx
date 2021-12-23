import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import React, { useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { IBoard, IToDo, todoState } from "./atom";

type BoardProps = IBoard & { idx: number };

const Wrapper = styled.div`
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
type IAreaProps = {
  isDraggingOver: boolean;
  isDraggingOverFromThis: boolean;
};
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "skyblue"
      : props.isDraggingOverFromThis
      ? "pink"
      : "#dfe6e9"}
  flex-grow: 1;
  transition: background-color 0.2s ease-in-out;
`;
const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;
type IForm = {
  toDo: string;
};
function Board({ ToDos, boardName, idx, id }: BoardProps) {
  const { register, handleSubmit, setValue, formState } = useForm<IForm>();
  const setTodos = useSetRecoilState(todoState);

  const onValid = (data: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: data.toDo,
    };
    console.log(data);

    setTodos((prev) => {
      const index = prev.findIndex((board) => board.id === id);
      const copyBoards = [...prev];
      const newTodos = copyBoards[index].ToDos.concat(newTodo);
      copyBoards.splice(index, 1);
      copyBoards.splice(index, 0, { id, boardName, ToDos: newTodos });

      return copyBoards;
    });

    console.log(newTodo);
    setValue("toDo", "");
  };
  return (
    <Draggable draggableId={id + ""} index={idx}>
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Title>{boardName}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on the ${boardName}`}
            />
            <input type="submit" />
          </Form>

          <Droppable droppableId={id + ""}>
            {(provided, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingOverFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {ToDos.map((toDo, index) => (
                  <DraggableCard toDo={toDo} index={index} key={toDo.id} />
                ))}
                {/*inside of Droppable and Droppable should be a function*/}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}
export default React.memo(Board);
