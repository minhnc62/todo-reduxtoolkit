import { add, edit } from "../store/todoSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import styled from "styled-components";
import { Input, Button, Form } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export interface Props {
  todo: any;
}
const FormStyle = styled(Form)`
  display: flex;
  justify-content: space-between;
`;
const FormInput = () => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<Props["todo"]>("");

  const handleSubmit = (e: any) => {
    if (todo.trim().length == 0) return;
    dispatch(add(todo));
    setTodo(" ");
  };

  return (
    <FormStyle onFinish={handleSubmit}>
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Type something"
        style={{ marginRight: '4px' }}
        defaultValue="https://ant.design"
      />
      <Button onClick={handleSubmit} type="primary">
        <FontAwesomeIcon icon={faAdd} />
      </Button>
    </FormStyle>
  );
};
export default FormInput;
