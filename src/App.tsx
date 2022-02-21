

import "./App.css";
import { selectTodo, add, edit, remove, clear } from "./store/todoSlice";
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { Row, Col, Input, Button, Form, List } from "antd";
import styled from "styled-components";
import { useEffect } from "react";
import ListTodo from "./component/ListTodo";
import FormInput from "./component/FormInput";


const RowStyled = styled(Row)`
  width: 500px;
  margin: auto;
  box-shadow: 0px 0px 27px #dadada;
  margin-top: 50px;
`;
const App = styled(Col)`
  text-align: center;
  padding: 20px;
`;

// const ListItem = styled(List.Item)`
//   text-align: unset;
//   display: flex;
//   justify-content: space-around;
// `;


export default () => {
  const dispatch = useAppDispatch()

  return (
    <RowStyled justify="center">
      <App span={24}>
        <h1 className="header"> Todo list</h1>
        <FormInput/>
        <ListTodo/>

        <Button
          style={{ marginTop: '20px' }}
          type="primary"
          className="btn-clear"
          onClick={() => dispatch(clear())}
        >
          Clear All
        </Button>
      </App>
    </RowStyled>
  );
};
