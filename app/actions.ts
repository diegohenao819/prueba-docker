"use server";

import {
  deleteCompletedTodos,
  deleteTodo,
  insertTodo,
  setTodoCompleted,
} from "@/lib/todos";
import type { ActionResult, Todo } from "@/lib/types";

const validId = /^\d+$/;

function databaseError<T>(operation: string, error: unknown): ActionResult<T> {
  console.error(`PostgreSQL error while ${operation}:`, error);
  return {
    ok: false,
    error: "The change could not be saved. Please try again.",
  };
}

export async function createTodoAction(
  rawText: string,
): Promise<ActionResult<Todo>> {
  const text = rawText.trim();

  if (!text) {
    return { ok: false, error: "Write a task before adding it." };
  }

  if (text.length > 80) {
    return { ok: false, error: "Tasks can contain at most 80 characters." };
  }

  try {
    return { ok: true, data: await insertTodo(text) };
  } catch (error) {
    return databaseError("creating a task", error);
  }
}

export async function toggleTodoAction(
  id: string,
  completed: boolean,
): Promise<ActionResult<Todo>> {
  if (!validId.test(id)) {
    return { ok: false, error: "That task is not valid." };
  }

  try {
    const todo = await setTodoCompleted(id, completed);

    return todo
      ? { ok: true, data: todo }
      : { ok: false, error: "That task no longer exists." };
  } catch (error) {
    return databaseError("updating a task", error);
  }
}

export async function removeTodoAction(
  id: string,
): Promise<ActionResult<string>> {
  if (!validId.test(id)) {
    return { ok: false, error: "That task is not valid." };
  }

  try {
    return (await deleteTodo(id))
      ? { ok: true, data: id }
      : { ok: false, error: "That task no longer exists." };
  } catch (error) {
    return databaseError("removing a task", error);
  }
}

export async function clearCompletedAction(): Promise<ActionResult<number>> {
  try {
    return { ok: true, data: await deleteCompletedTodos() };
  } catch (error) {
    return databaseError("clearing completed tasks", error);
  }
}
