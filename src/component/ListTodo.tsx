import { selectTodo, edit, remove } from "../store/todoSlice";
import { useAppSelector } from "../store/hooks";
//import ListItem from "./ListItem";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import ListItem from "./ListItem";
import { Button } from "antd";
import { DeleteOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import {ItemProps} from "./ListItem"

interface TodoItemProps {
  editing: any;
  todoEdit: any;
}

const IconsWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

const ListTodo = () => {
  const todos: any = useAppSelector(selectTodo);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<TodoItemProps["editing"]>(null);
  const [todoEdit, setTodoEdit] = useState<TodoItemProps["todoEdit"]>("");

  const inputText = useRef<HTMLInputElement>(null);
  useEffect(() => inputText?.current?.focus());

  const handleInput = (e: any) => {
    if (editing) {
      dispatch(edit({ id: editing, content: todoEdit }));
      setEditing(null);
    }
  };
  return (
    <div className="list">
      <ul className="todo-list">
        {todos.map((item: ItemProps) => (
          <ListItem
          key={item.id}
          id={item.id} content={item.content}/>
          // <li className="list-item">
          //   {!editing ? (
          //     <>
          //       {item.content}
          //       <IconsWrapper>
          //         <DeleteOutlined onClick={() => dispatch(remove(item.id))} />
          //         <EditOutlined
          //           onClick={() => {
          //             setEditing(item.id);
          //           }}
          //         />
          //       </IconsWrapper>
          //     </>
          //   ) : (
          //     <>
          //       <input
          //         className="edit-item"
          //         ref={inputText}
          //         defaultValue={item.content}
          //         onChange={(e) => setTodoEdit(e.target.value)}
          //       />
          //       <Button onClick={handleInput} type="primary">
          //         Edit
          //       </Button>
          //       <Button
          //         type="ghost"
          //         onClick={() => {
          //           setEditing(null);
          //           setTodoEdit(item.content);
          //         }}
          //       ></Button>
          //     </>
          //   )}
          // </li>
        ))}
      </ul>
    </div>
  );
};
export default ListTodo;
