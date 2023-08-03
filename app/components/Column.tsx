import { Draggable, Droppable } from "react-beautiful-dnd";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import styles from "./column.module.css";
import TodoCard from "./TodoCard";
import { useBoardStore } from "../../store/BoardStore";
import { useModalStore } from "../../store/ModalStore";
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
  const [searchString] = useBoardStore((state) => [state.searchString]);
  const openModal = useModalStore( (state) => state.openModal);

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
                  <span className={styles.todoCount}>
                    {/*

                    Shows the number of the todo items that matches the search string in each column
                    If it's empty, just show the number of todos otherwise, match it with the query.
                    */}
                    {!searchString
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchString.toLowerCase())
                        ).length}
                  </span>
                </h2>

                <div className={styles.content}>


                  {/*
                    If there is an input on the search string, the screen renders the todo items based on the query,

                    If there is a search string and it doesn't match any title on the todo items, return null
                    Otherwise, display the items that matches the query.
                  
                  */}
                  {todos.map((todo, index) => {
                    if (
                      searchString &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                    )
                      return null;
                    return (
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
                    );
                  })}

                  {provided.placeholder}
                  <div className={styles.iconContainer}>
                    <button className={styles.iconWrapper} onClick={openModal}>
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
