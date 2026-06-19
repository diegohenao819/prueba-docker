import "server-only";

import { query } from "./db";
import type { Todo } from "./types";

type TodoRow = {
  id: string;
  title: string;
  completed: boolean;
};

function toTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    text: row.title,
    completed: row.completed,
  };
}

export async function getTodos(): Promise<Todo[]> {
  const result = await query<TodoRow>(
    `SELECT id, title, completed
     FROM todos
     ORDER BY created_at ASC, id ASC`,
  );

  return result.rows.map(toTodo);
}

export async function insertTodo(title: string): Promise<Todo> {
  const result = await query<TodoRow>(
    `INSERT INTO todos (title)
     VALUES ($1)
     RETURNING id, title, completed`,
    [title],
  );

  return toTodo(result.rows[0]);
}

export async function setTodoCompleted(
  id: string,
  completed: boolean,
): Promise<Todo | null> {
  const result = await query<TodoRow>(
    `UPDATE todos
     SET completed = $2
     WHERE id = $1
     RETURNING id, title, completed`,
    [id, completed],
  );

  return result.rows[0] ? toTodo(result.rows[0]) : null;
}

export async function deleteTodo(id: string): Promise<boolean> {
  const result = await query(
    `DELETE FROM todos
     WHERE id = $1`,
    [id],
  );

  return result.rowCount === 1;
}

export async function deleteCompletedTodos(): Promise<number> {
  const result = await query(
    `DELETE FROM todos
     WHERE completed = TRUE`,
  );

  return result.rowCount ?? 0;
}
