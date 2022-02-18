 import { useDispatch, useSelector } from "react-redux"

 import { useTodo, add, edit } from "../store/todoSlide";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Form = () =>{
    const dispatch = useAppDispatch();
  const todos = useAppSelector(useTodo);
  const [editing, setEditing] = useState(null);
  const [todo, setTodo] = useState("");



  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (todo.trim().length == 0)
      return;

    if (editing) {
      dispatch(edit({ id: editing, content: todo }))
      setEditing(null);
    } else {
      dispatch(add(todo));
    }

    setTodo(" ");
  }

    return <form onSubmit={handleSubmit}>
    <input value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="dien cong viec" />
    {
      editing ? (
        <>
          <button >edit</button>
          <button onClick={() => {
            setEditing(null);
            setTodo("");
          }}>cancel edit</button></>

      ) : (
        <button >add</button>
      )
    }
  </form>
}
export default Form;