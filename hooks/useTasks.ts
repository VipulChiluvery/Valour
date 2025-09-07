// hooks/useTasks.ts
import { useMemo, useState } from "react";
import type { Task } from "../types/Task";

type Importance = Task["importance"];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createId = () => Date.now().toString(); // swap for uuid later

  function addTask(
    name: string,
    opts?: { description?: string; dueDate?: Date; importance?: Importance }
  ) {
    const newTask: Task = {
      id: createId(),
      name,
      description: opts?.description,
      dueDate: opts?.dueDate,
      importance: opts?.importance ?? "medium",
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function editTask(id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }

  const sortedByDueDate = useMemo(
    () =>
      [...tasks].sort((a, b) => {
        const ad = a.dueDate?.getTime() ?? Number.POSITIVE_INFINITY;
        const bd = b.dueDate?.getTime() ?? Number.POSITIVE_INFINITY;
        return ad - bd;
      }),
    [tasks]
  );

  return {
    tasks,
    sortedByDueDate,
    addTask,
    removeTask,
    editTask,
  };
}
