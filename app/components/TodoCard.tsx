"use client";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { XCircleIcon } from "@heroicons/react/24/solid";
import styles from "./todocard.module.css";

type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <div {...draggableProps} {...dragHandleProps} ref={innerRef} className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.title}>{todo.title}</p>
        <button className={styles.iconWrapper}>
          <XCircleIcon className={styles.icon}></XCircleIcon>
        </button>
      </div>
    </div>
  );
}

export default TodoCard;
