import { Button, Input, List } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { edit, remove, todoState } from '../store/todoSlice';
import { useState, useRef, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';

interface TodoItemProps {
  item: todoState;
  editing: any;
}
export interface ItemProps {
  id: number;
  content: string;
}
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
const IconsWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`;
const ListTodo = styled(List)`
padding-top:16px ;
`
const ListItem = styled(List.Item)`
  display: flex;
  margin: 8px 0;
  padding-left: 4px;
  padding: 0;

`;

export default ({ id, content }: ItemProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState<TodoItemProps['editing']>(null);
  const [todoEdit, setTodoEdit] = useState('');
  // const inputRef = useRef<any>(null);
  // const [input, setInput] = useState(true);
  const inputText = useRef<HTMLInputElement>(null);
  useEffect(() => inputText?.current?.focus());

  // const sharedProps = {
  //   ref: inputRef,
  // };

  const handleInput = (e: any) => {
    if (editing) {
      dispatch(edit({ id: editing, content: todoEdit }));
      setEditing(null);
      // inputRef.current!.focus({
      //   cursor: 'end',
      // });
    }
  };

  return (
    <>
      <ListTodo className="list">
        <ListItem className="list-item">
          {!editing ? (
            <>
              {content}
              <IconsWrapper>
                <BtnEdit
                  onClick={() => {
                    setEditing(id);
                  }}
                >
                  {' '}
                  <FontAwesomeIcon icon={faPen} />
                </BtnEdit>
                <BtnDel onClick={() => dispatch(remove(id))}>
                  {' '}
                  <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </BtnDel>
              </IconsWrapper>
            </>
          ) : (
            <>
              <input
                style={{ width: '100%',border:'none',borderBottom:"1px solid #333" }}
                className="edit-item"
                ref={inputText}
                // {...sharedProps}
                defaultValue={content}
                onChange={(e) => setTodoEdit(e.target.value)}
              />
  
              <BtnEdit onClick={handleInput}>
                <FontAwesomeIcon icon={faCheck} />
              </BtnEdit>
              <BtnDel
                onClick={() => {
                  setEditing(null);
                  setTodoEdit(content);
                }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </BtnDel>
            </>
          )}
        </ListItem>
      </ListTodo>
      {/* <hr /> */}
    </>
  );
};
