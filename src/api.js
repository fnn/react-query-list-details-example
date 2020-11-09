import { queryClient } from "./App";

const db = [
  { id: 1, name: "Do stuff", details: "This is TODO 1", done: false },
  { id: 2, name: "TODO 2", details: "This is TODO 2", done: false },
  { id: 3, name: "TODO 3", details: "This is TODO 3", done: false },
  { id: 4, name: "TODO 4", details: "This is TODO 4", done: false }
];

export const fetchTodos = () => {
  console.log("fetch Todos");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.stringify(db));
    }, 1000);
  }).then((res) => {
    const todos = JSON.parse(res);
    todos.forEach((todo) => queryClient.setQueryData(["todo", todo.id], todo));
    return todos;
  });
};

export const fetchTodo = (id) => {
  console.log("fetch Todo: ", id);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.stringify(db.find((todo) => todo.id === id)));
    }, 250);
  }).then((res) => JSON.parse(res));
};

export const toggleTodo = (id) => {
  console.log("toggle Todo: ", id);
  return new Promise((resolve) => {
    const todo = db.find((todo) => todo.id === id);
    todo.done = !todo.done;
    resolve(JSON.stringify(todo));
  }).then((res) => JSON.parse(res));
};
