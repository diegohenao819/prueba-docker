export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };
