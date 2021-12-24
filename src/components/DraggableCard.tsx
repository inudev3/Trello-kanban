import { Draggable } from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";
import { IToDo } from "../model/atom";
const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.color};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
  transition: box-shadow 0.2s ease-in-out;
`;
type DraggableCardProps = {
  toDo: IToDo;
  index: number;
  draggableId: IToDo["text"];
};
function DraggableCard({ toDo, index, draggableId }: DraggableCardProps) {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
          ref={magic.innerRef}
        >
          {toDo.text}
        </Card>
      )}
    </Draggable>
  );
}
export default React.memo(DraggableCard); //don't render the componnent unless the props changes
