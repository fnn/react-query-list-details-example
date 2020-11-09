const db = [
  { id: 1, name: "Do stuff", details: "This is TODO 1", done: false },
  { id: 2, name: "TODO 2", details: "This is TODO 2", done: false },
  { id: 3, name: "TODO 3", details: "This is TODO 3", done: false },
  { id: 4, name: "TODO 4", details: "This is TODO 4", done: false }
];

export const fetchTodos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db);
    }, 2000);
  });
};

export const fetchTodo = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(db.find((todo) => todo.id === id));
    }, 1000);
  });
};

export const toggleTodo = (id) => {
  return new Promise((resolve) => {
    const todo = db.find((todo) => todo.id === id);
    todo.done = !todo.done;
    resolve(todo);
  });
};
