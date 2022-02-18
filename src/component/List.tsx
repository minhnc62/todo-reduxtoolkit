 import { useDispatch, useSelector } from "react-redux"


import { useTodo, edit, remove } from "../store/todoSlide";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const List = () => {
    const dispatch = useAppDispatch();
    const todos: any = useAppSelector(useTodo);
    const [editing, setEditing] = useState(null);
    const [todo, setTodo] = useState("");
    return <div className="list">
        <ul className="todo-list">
            {
                todos.map((g: any) => (
                    <li key={g.id}>{g.content}
                        <button className="btn-delete" onClick={() => dispatch(remove(g.id))} >
                            <i className="bi bi-trash-fill"></i>
                        </button>
                        <button className="btn-edit" onClick={() => {
                            setEditing(g.id);
                            setTodo(g.content);
                        }} >
                            <i className="bi bi-pencil-square"></i>
                        </button>
                    </li>))
            }
        </ul>
    </div>
}
export default List;