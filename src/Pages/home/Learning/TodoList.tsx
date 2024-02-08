import React from "react";

interface TodoListProps {
    items: { id: string, text: string }[];
    onDeleteTodo: (id: string) => void
}
interface TodoProps {
    id: string,
    text: string
}

const TodoList: React.FC<TodoListProps> = ({ items, onDeleteTodo }) => {
    return (
        <ul>
            {
                items.map((todo: TodoProps) => (
                    <li key={todo.id}>
                        <span>
                            {todo.text}
                            <button onClick={onDeleteTodo.bind(null, todo.id)}>DELETE</button>
                        </span>
                    </li>
                ))
            }
        </ul>
    )
}


export default TodoList