import { add, edit } from "../store/todoSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

import { Input, Button, Form } from "antd";
export interface Props {
  todo: any;
}

const FormInput = () => {
  const dispatch = useAppDispatch();
  const [todo, setTodo] = useState<Props["todo"]>("");

  const handleSubmit = (e: any) => {
    if (todo.trim().length == 0) return;
    dispatch(add(todo));
    setTodo(" ");
  };

  return (
    <Form onFinish={handleSubmit}>
      <Input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Type something"
        style={{ width: "calc(100% - 200px)", marginRight: "4px" }}
        defaultValue="https://ant.design"
      />
      <Button onClick={handleSubmit} type="primary">
        Add
      </Button>
    </Form>
  );
};
export default FormInput;
