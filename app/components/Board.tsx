"use client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useBoardStore } from "../../store/BoardStore";
import Column from "./Column";
import styles from "./board.module.css";

function Board() {

  /*
    Function to check if the size of the window is on mobile or not
    If it's less than 768 (mobile), set the direction of the draggable to vertical. Otherwise, set it horizontal.
  */
  const [isVertical, setIsVertical] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return; // If the dragged item is not actually moved, just return

    /*
      If the dragged item, is a type of column, it rearranges the columns.
    */

    if (type === "column") {
      const entries = Array.from(board.columns.entries()); // Creates an array named 'entries' that contains the arrays of the columns.
      const [removed] = entries.splice(source.index, 1); // Assigns the moved column to the 'removed' array
      entries.splice(destination.index, 0, removed); // Inserts the 'removed' array to the destination index
      const rearrangedColumns = new Map(entries); // Creates a new rearrangedColumns Map containing the newly arranged columns

      setBoardState({
        // This then sets the board's state with containing the board and then the rearrangedColumns map
        ...board,
        columns: rearrangedColumns,
      });
    }

    /*
      If the dragged item, is a type of card or a todo item, this part handles the logic of transferring the item to another column
    */

    if (type === "card") {
      const columns = Array.from(board.columns); // Assigns the mapping of the board columns to an array named columns
      const startColIndex = columns[Number(source.droppableId)]; // Retrieves the starting column or the source column
      const finishColIndex = columns[Number(destination.droppableId)]; // Retrieves the finishing column or the destination column where the drag ends

      /*
        Creates an object with type Column with the contents of the starting column
      */
      const startCol: Column = {
        id: startColIndex[0],
        todos: startColIndex[1].todos,
      };

      /*
        Creates an object with type Column the content of the finish column
      */
      const finishCol: Column = {
        id: finishColIndex[0],
        todos: finishColIndex[1].todos,
      };

      if (!startCol || !finishCol) return; // If either of the object startCol or finishCol is empty, do nothing

      if (source.index === destination.index && startCol === finishCol) return; // If the source and destination of the dragged todo item is the same, do nothing.

      const newTodos = startCol.todos; // Creates a copy of the todos of the starting column

      const [todoMoved] = newTodos.splice(source.index, 1); // Retrieves the moved todo item and assign it to a todoMoved array.

      /*
          If you move a todo item within the same column
      */

      if (startCol.id === finishCol.id) {
        newTodos.splice(destination.index, 0, todoMoved); // Insert the removed todo to the newTodos

        /*
          Creates a new column object with the rearranged todos
        */
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns); // Creates a new column map
        newColumns.set(startCol.id, newCol); // Sets the content of the newColumns map with the content of the startcol.id and the created newCol

        // Add an update to column
        setBoardState({ ...board, columns: newColumns }); // Sets the board set with the newly created column map.
      } else {
        /*
          If you moved a todo item to a different column
        */

        const finishTodos = Array.from(finishCol.todos); // Retrieves the content of where the todo item was moved to

        finishTodos.splice(destination.index, 0, todoMoved); // Inserts the todo item to the destination column

        /*
          Creates a new column object with the rearranged todos
          This part is essentially the same with the previous logic except there's a few extra steps (Line 121 - 124).
        */
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };
        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        /*
          Sets the content of the updated column with the newly added todo item
        */
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });

        updateTodoInDB(todoMoved, finishCol.id); // Update the changes in the database

        setBoardState({ ...board, columns: newColumns });
      }
    }

    console.log(isVertical);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId="board"
          direction={isVertical ? "vertical" : "horizontal"}
          type="column"
        >
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className={styles.boardWrapper}>
                {Array.from(board.columns.entries()).map(
                  ([id, column], index) => (
                    <Column
                      key={id}
                      id={id}
                      todos={column.todos}
                      index={index}
                    ></Column>
                  )
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Board;
