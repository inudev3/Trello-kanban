import { atom, selector } from "recoil";

export type IToDo = {
  id: number;
  text: string;
};
export type IBoard = {
  boardName: string;
  ToDos: IToDo[];
  id: number;
};
export const todoState = atom<IBoard[]>({
  key: "toDo",
  default: [
    { boardName: "to_do", id: 1, ToDos: [] },
    { boardName: "doing", id: 2, ToDos: [] },
    { boardName: "done", id: 3, ToDos: [] },
  ],
});
