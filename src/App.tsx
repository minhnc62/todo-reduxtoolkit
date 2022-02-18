import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { useTodo, add, edit, remove, clear } from './store/todoSlide';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Row, Col, Input, Button, Form, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

// import Form from "./component/Form";
// import List from "./component/List";

const App = styled(Col)`
  text-align: center;
  padding: 20px;
`;

const RowStyled = styled(Row)`
  width: 500px;
  margin: auto;
  box-shadow: 0px 0px 27px #dadada;
  margin-top: 50px;
`;

const IconsWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;

const BtnDel = styled(Button)`
  border: none;
  :hover {
    color: red;
  }
`;
const BtnEdit = styled(Button)`
  border: none;
  :hover {
    color: Blue;
  }
`;

const FormStyle = styled(Form)`
  display: flex;
  justify-content: space-between;
`;

const ListItem = styled(List.Item)`
  display: flex;
  margin: 8px 0;
`;

export default () => {
  const dispatch = useAppDispatch();
  const todos: any = useAppSelector(useTodo);
  const [editing, setEditing] = useState(null);
  const [todo, setTodo] = useState('');

  const handleSubmit = (e: any) => {
    if (todo.trim().length == 0) return;

    if (editing) {
      dispatch(edit({ id: editing, content: todo }));
      setEditing(null);
    } else {
      dispatch(add(todo));
    }

    setTodo(' ');
    console.log('oke');
  };

  return (
    <RowStyled>
      <App span={24}>
        <h1 className="header"> Todo App</h1>
        <FormStyle onFinish={handleSubmit}>
          <Input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Type something"
            style={{ width: '70%', marginRight: '4px' }}
            defaultValue="https://ant.design"
          />
          {editing ? (
            <>
              <Button
                onClick={handleSubmit}
                style={{ marginRight: '4px' }}
                type="dashed"
              >
                Edit
              </Button>
              <Button
                danger
                onClick={() => {
                  setEditing(null);
                  setTodo('');
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </>
          ) : (
            <Button
              style={{ width: '29%' }}
              onClick={handleSubmit}
              type="primary"
            >
              Add Todo
            </Button>
          )}
        </FormStyle>
        <List className="todo-list">
          {todos.map((g: any) => (
            <ListItem key={g.id}>
              {g.content}
              <IconsWrapper>
                <BtnEdit
                  onClick={() => {
                    setEditing(g.id);
                    setTodo(g.content);
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </BtnEdit>
                <BtnDel onClick={() => dispatch(remove(g.id))}>
                  <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </BtnDel>
              </IconsWrapper>
            </ListItem>
          ))}
        </List>
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
