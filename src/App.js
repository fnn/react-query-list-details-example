import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient
} from "react-query";
import { fetchTodos, fetchTodo, toggleTodo } from "./api";
import "./styles.css";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

function List({ onSelect }) {
  const { data, isLoading } = useQuery(["todos"], () => fetchTodos());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>
          {todo.done ? "✅" : "❌"}
          <button onClick={() => onSelect(todo.id)}>{todo.name}</button>
        </li>
      ))}
    </ul>
  );
}

function Details({ selected }) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["todo", selected],
    () => fetchTodo(selected),
    {
      enabled: selected !== -1
    }
  );

  const { mutate } = useMutation(toggleTodo);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (selected === -1) {
    return <div>select todo</div>;
  }

  return (
    <div>
      <h1>
        {data?.done ? "✅" : "❌"}
        {data?.name}
      </h1>
      <p>{data?.details}</p>
      <button
        onClick={() =>
          mutate(selected, {
            onSettled: () => queryClient.invalidateQueries(["todo", selected])
          })
        }
      >
        Toggle
      </button>
    </div>
  );
}

export default function App() {
  const [selectedId, setSelectedId] = React.useState(-1);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="list-details-layout">
        <List onSelect={setSelectedId} />
        <Details selected={selectedId} />
      </div>
    </QueryClientProvider>
  );
}
