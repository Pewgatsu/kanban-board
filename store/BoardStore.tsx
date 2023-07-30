import { create } from "zustand";
import getTodosGroupedByColumn from "../app/lib/getTodosGroupedByColumn";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../app/db/firebase";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
  
  updateTodoInDB: async(todo, columnId) => {
    await setDoc(doc(db, 'todos', todo.id), {
      title: todo.title,
      status: columnId,
    })
  }
}));
