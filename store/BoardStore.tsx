import { create } from "zustand";
import getTodosGroupedByColumn from "../app/lib/getTodosGroupedByColumn";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../app/db/firebase";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  getBoard: async () => {
    try {
      const board = await getTodosGroupedByColumn();
      set({ board });
    } catch (e) {
      console.log(e);
    }
  },
  setBoardState: (board) => set({ board }),

  updateTodoInDB: async (todo, columnId) => {
    try {
      await setDoc(doc(db, "todos", todo.id), {
        title: todo.title,
        status: columnId,
      });
    } catch (e) {
      console.log(e);
    }
  },
}));
