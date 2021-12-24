import { Draggable, Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import React, { useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { IToDo, todoState } from "../model/atom";
type IDroppableCard = {
  index: number;
  droppableId: string;
  title: string;
  toDos: IToDo[];
};
type todoForm = {
  toDo: string;
};
const TodoContainer = styled.div<{ isDraggingOver: boolean }>`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  ${(props) => (props.isDraggingOver ? `background-color: transparent;` : "")}
  &:not(:last-child) {
    margin-right: 5px;
  }
`;
const CardArea = styled.div<{
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}>`
  display: flex;
  background-color: inherit;
  flex-direction: column;
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  ${(props) => (props.isDraggingOver ? ` background-color: red` : "")}
  ${(props) => (props.isDraggingFromThis ? `background-color: pink;` : "")}
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  background-color: inherit;
  color: ${(props) => props.theme.color.link};
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: inherit;

  input[type="text"] {
    width: 100%;
    outline: none;
    border: 1px solid ${(props) => props.theme.color.border};
    background-color: ${(props) => props.theme.background.primary};
    border-radius: 5px;
    padding: 5px 10px;
  }
  button {
    margin: 5px 0;
    outline: none;
    border: 1px solid ${(props) => props.theme.color.border};
    border-radius: 5px;
    background-color: ${(props) => props.theme.background.button};
    color: ${(props) => props.theme.color.button};
    padding: 5px 0;
    cursor: pointer;
  }
`;

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.isDraggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;

function DroppableCard({ index, droppableId, title, toDos }: IDroppableCard) {
  const { register, handleSubmit, setValue } = useForm<todoForm>();

  const onValid = () => {};
  return (
    <Draggable draggableId={`Category-${droppableId}`} index={index}>
      {(magic, snapshot) => (
        <TodoContainer
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          isDraggingOver={snapshot.isDragging}
        >
          <Title>{title}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("toDo", { required: true })}
              type="text"
              placeholder={`Add task on the ${title}`}
            />
            <input type="submit" />
          </Form>

          <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
              <Area
                isDraggingOver={snapshot.isDraggingOver}
                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard
                    toDo={toDo}
                    draggableId={toDo.text}
                    index={index}
                    key={toDo.id}
                  />
                ))}
                {/*inside of Droppable and Droppable should be a function*/}
                {provided.placeholder}
              </Area>
            )}
          </Droppable>
        </TodoContainer>
      )}
    </Draggable>
  );
}
export default React.memo(DroppableCard);
