import TodoApp from "./todo-app";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-950 sm:px-6 lg:py-12">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">
            Simple planner
          </p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              To-do list
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600">
              Add tasks, mark them complete, and clear finished work when your
              list is ready for a reset.
            </p>
          </div>
        </header>

        <TodoApp />
      </section>
    </main>
    );
}
