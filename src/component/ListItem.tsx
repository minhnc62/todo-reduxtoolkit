import { Button } from "antd";
import { DeleteOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { edit, remove } from "../store/todoSlice";
import { useState, useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";
import { todoState } from "../store/todoSlice";

interface TodoItemProps {
    item: todoState;
  editing: any;
}
export interface ItemProps {
  id: number,
  content: string
}

export default ({ id, content}: ItemProps ):JSX.Element=> {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<TodoItemProps["editing"]>(null);
  const [todoEdit, setTodoEdit] = useState("");

  const inputText = useRef<HTMLInputElement>(null);
  useEffect(() => inputText?.current?.focus());

  const handleInput = (e: any) => {
    if (editing) {
      dispatch(edit({ id: editing, content: todoEdit }));
      setEditing(null);
    }
  };

  const IconsWrapper = styled.div`
    display: flex;
    column-gap: 8px;
  `;
  return (
    <div className="list">
      <li className="list-item">
        {!editing ? (
          <>
            {content}
            <IconsWrapper>
              <DeleteOutlined onClick={() => dispatch(remove(id))} />
              <EditOutlined
                onClick={() => {
                  setEditing(id);
                }}
              />
            </IconsWrapper>
          </>
        ) : (
          <>
            <input
              className="edit-item"
              ref={inputText}
              defaultValue={content}
              onChange={(e) => setTodoEdit(e.target.value)}
            />
            <Button onClick={handleInput} type="primary">
              Edit
            </Button>
            <Button
              type="ghost"
              onClick={() => {
                setEditing(null);
                setTodoEdit(content);
              }}
            ></Button>
          </>
        )}
      </li>
    </div>
  );
};
