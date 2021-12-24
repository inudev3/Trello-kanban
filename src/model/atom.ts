import { atom, selector } from "recoil";

export type IToDo = {
  id: number;
  text: string;
  createdAt: Date;
};
export type Todos = {
  [key: string]: IToDo[];
};
export const TODO_KEY = "toDos";
export const defaultTodos: Todos = JSON.parse(
  localStorage.getItem(TODO_KEY) as string
) || {
  To_Do: [],
  Doing: [],
  Done: [],
};
export const todoState = atom<Todos>({
  key: "toDo",
  default: defaultTodos,
});
export const colorSchemeState = atom<"dark" | "light">({
  key: "colorSchemeStaate",
  default: "light",
});
export let latestId = {
  id: 0,
};

export const saveTodos = (todos: Todos) => {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
};
