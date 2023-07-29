"use client";
import { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { useBoardStore } from "../../store/BoardStore";
import Column from "./Column";
import styles from './board.module.css';

function Board() {
  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {};

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
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
