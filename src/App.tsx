import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useTodo, add, edit, remove, clear } from "./store/todoSlide";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Row, Col, Input, Button, Form, List } from "antd";
import { DeleteOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import styled from "styled-components";

// import Form from "./component/Form";
// import List from "./component/List";

const App = styled(Col)`
  text-align: center;
`;
const ListItem = styled(List.Item)`
  text-align: unset;
  display: flex;
  justify-content: space-around;
`;
const IconsWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

export default () => {
  const dispatch = useAppDispatch();
  const todos: any = useAppSelector(useTodo);
  const [editing, setEditing] = useState(null);
  const [todo, setTodo] = useState("");

  const handleSubmit = (e: any) => {
    if (todo.trim().length == 0) return;

    if (editing) {
      dispatch(edit({ id: editing, content: todo }));
      setEditing(null);
    } else {
      dispatch(add(todo));
    }

    setTodo(" ");
    console.log("oke");
  };

  return (
    <Row justify="center">
      <App span={6}>
        <h1 className="header"> Todo list</h1>
        <Form onFinish={handleSubmit}>
          <Input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Type something"
            style={{ width: "calc(100% - 200px)", marginRight: "4px" }}
            defaultValue="https://ant.design"
          />
          {editing ? (
            <>
              <Button onClick={handleSubmit}  type="primary">Edit</Button>
              <Button
                type="ghost"
                onClick={() => {
                  setEditing(null);
                  setTodo("");
                }}
              >
                <CloseOutlined />
              </Button>
            </>
          ) : (
            <Button onClick={handleSubmit} type="primary">
              Add
            </Button>
          )}
        </Form>
        <List className="todo-list">
          {todos.map((g: any) => (
            <ListItem key={g.id}>
              {g.content}
              <IconsWrapper>
                <DeleteOutlined onClick={() => dispatch(remove(g.id))} />
                <EditOutlined
                  onClick={() => {
                    setEditing(g.id);
                    setTodo(g.content);
                  }}
                />
              </IconsWrapper>
            </ListItem>
          ))}
        </List>
        <Button
          style={{ marginTop: "20px" }}
          type="primary"
          className="btn-clear"
          onClick={() => dispatch(clear())}
        >
          Clear All
        </Button>
        <Button
          style={{ marginTop: "20px" }}
          type="primary"
          className="btn-clear"
          onClick={() => dispatch(clear())}
        >
          Clear All
        </Button>
      </App>
    </Row>
  );
};
