"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

type Filter = "all" | "active" | "completed";

type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const filters: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
];

function createTodoId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getEmptyMessage(filter: Filter) {
  if (filter === "active") {
    return "No active tasks. Add something new or switch views.";
  }

  if (filter === "completed") {
    return "No completed tasks yet.";
  }

  return "Your list is empty. Add the first task to get started.";
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const inputRef = useRef<HTMLInputElement>(null);

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;
  const visibleTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.completed;
    }

    if (filter === "completed") {
      return todo.completed;
    }

    return true;
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = newTask.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: createTodoId(), text, completed: false },
    ]);
    setNewTask("");
    inputRef.current?.focus();
  }

  function toggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function removeTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id),
    );
  }

  function clearCompleted() {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
  }

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <div className="flex-1">
          <label
            className="block text-sm font-medium text-zinc-800"
            htmlFor="new-task"
          >
            New task
          </label>
          <input
            ref={inputRef}
            autoComplete="off"
            className="mt-2 min-h-12 w-full rounded-md border border-zinc-300 bg-white px-3 text-base text-zinc-950 outline-none transition focus-visible:border-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-700/25"
            enterKeyHint="done"
            id="new-task"
            maxLength={80}
            name="task"
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Write a task"
            required
            type="text"
            value={newTask}
          />
        </div>
        <button
          className="min-h-12 rounded-md bg-emerald-700 px-5 text-base font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:self-end"
          type="submit"
        >
          Add task
        </button>
      </form>

      <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-5 sm:flex-row sm:items-end sm:justify-between">
        <fieldset>
          <legend className="text-sm font-medium text-zinc-800">View</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.map((item) => (
              <label key={item.id} className="cursor-pointer">
                <input
                  checked={filter === item.id}
                  className="peer sr-only"
                  name="task-filter"
                  onChange={() => setFilter(item.id)}
                  type="radio"
                  value={item.id}
                />
                <span className="inline-flex min-h-11 items-center rounded-md border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition peer-checked:border-emerald-700 peer-checked:bg-emerald-700 peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-700">
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <p className="text-sm text-zinc-600" aria-live="polite">
          {activeCount} active, {completedCount} completed
        </p>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-zinc-950">Tasks</h2>
          {completedCount > 0 ? (
            <button
              className="min-h-11 rounded-md border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
              onClick={clearCompleted}
              type="button"
            >
              Clear completed
            </button>
          ) : null}
        </div>

        {visibleTodos.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {visibleTodos.map((todo) => (
              <li
                className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                key={todo.id}
              >
                <label
                  className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-base"
                  htmlFor={`todo-${todo.id}`}
                >
                  <input
                    checked={todo.completed}
                    className="mt-1 size-5 rounded border-zinc-300 accent-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    id={`todo-${todo.id}`}
                    name={`todo-${todo.id}`}
                    onChange={() => toggleTodo(todo.id)}
                    type="checkbox"
                  />
                  <span
                    className={
                      todo.completed
                        ? "break-words text-zinc-500 line-through"
                        : "break-words text-zinc-950"
                    }
                  >
                    {todo.text}
                  </span>
                </label>
                <button
                  className="min-h-11 rounded-md border border-zinc-300 px-3 text-sm font-medium text-zinc-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:self-auto"
                  onClick={() => removeTodo(todo.id)}
                  type="button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-4 py-6 text-center text-sm text-zinc-600">
            {getEmptyMessage(filter)}
          </p>
        )}
      </div>
    </section>
  );
}
