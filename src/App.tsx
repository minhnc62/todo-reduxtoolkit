
import "./App.css";
import { selectTodo, add, edit, remove, clear } from "./store/todoSlice";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Row, Col, Input, Button, Form, List } from "antd";
import styled from "styled-components";
import { useEffect } from "react";
import ListTodo from "./component/ListTodo";
import FormInput from "./component/FormInput";


const App = styled(Col)`
  text-align: center;
`;
// const ListItem = styled(List.Item)`
//   text-align: unset;
//   display: flex;
//   justify-content: space-around;
// `;


export default () => {
  const dispatch = useAppDispatch()

  return (
    <Row justify="center">
      <App span={6}>
        <h1 className="header"> Todo list</h1>
        <FormInput/>
        <ListTodo/>
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
