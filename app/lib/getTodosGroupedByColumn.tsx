import Board from "../components/Board";
import { db } from "../db/firebase";
import { getDocs, collection } from "firebase/firestore";

export default async function getTodosGroupedByColumn() {
  const querySnapshot = await getDocs(collection(db, "todos"));

  const result = new Map<TypedColumn, Column>();
  querySnapshot.forEach((todo) => {
    const status = todo.get("status");

    const statusEntry = result.get(status);

    // Check if the status entry exists in the map
    if (statusEntry) {
      const todos = {
        id: todo.id,
        title: todo.get("title"),
        status: todo.get("status"),
        image: todo.get("image"),
      };

      statusEntry.todos.push(todos);
    } else {
      const todos = {
        id: todo.id,
        title: todo.get("title"),
        status: todo.get("status"),
        image: todo.get("image"),
      };
      result.set(status, {
        id: status,
        todos: [todos],
      });
    }
  });

  /*
    Mapping the empty columns to the map object
  */
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];

  for (const columnType of columnTypes) {
    if (!result.get(columnType)) {
      result.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(result.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  }

  return board;
}
