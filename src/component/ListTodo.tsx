import { selectTodo, edit, remove } from "../store/todoSlice";
import { useAppSelector } from "../store/hooks";
import styled from "styled-components";
import { useState, useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import ListItem from "./ListItem";
import {ItemProps} from "./ListItem"
import { List } from "antd";

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
      <List className="todo-list" style={{padding: 0}}>
        {todos.map((item: ItemProps) => (
          <ListItem
          key={item.id}
          id={item.id} content={item.content}/>
        ))}
      </List>
    </div>
  );
};
export default ListTodo;
