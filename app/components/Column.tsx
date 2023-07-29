import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import styles from "./column.module.css";
import TodoCard from "./TodoCard";
type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "To do",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={styles.wrapper}
              >
                <h2 className={styles.header}>
                  <span className={styles.title}> {idToColumnText[id]}</span>
                  <span className={styles.todoCount}>{todos.length}</span>
                </h2>

                <div className={styles.content}>
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <TodoCard
                          todo={todo}
                          index={index}
                          id={id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        ></TodoCard>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                  <div className={styles.iconContainer}>
                    <button className={styles.iconWrapper}>
                      <PlusCircleIcon className={styles.icon}></PlusCircleIcon>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
export default Column;
