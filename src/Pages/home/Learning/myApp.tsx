import React, { useState } from "react"
import {MyInput} from "./MyInput"
import TodoList from "./TodoList"

interface iTodo {
    id:string,
    text:string
}

export const MyApp:React.FC=()=>{
    const [todos, setTodos] = useState<iTodo[]>([])
    // const todos = [{id:"t1",text:"my todo text"}]
    const onAddTodo=(text:string)=>{
        // setTodos([{id:Math.random().toLocaleString(), text:text}])
        // setTodos([...todos,{id:Math.random().toLocaleString(), text:text}])
        setTodos( prevTodos => [...prevTodos, {id:Math.random().toLocaleString(), text:text}])
        console.log(text)
    }

    const todoDeleteHandler=(todoId:string)=>{
        setTodos( prevTodos => {
            return prevTodos.filter(todo =>  todo.id !== todoId  )
        })
    }

    return(
        <div className="myApp">
            <MyInput onAddTodo={onAddTodo}/>
            <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
        </div>
    )
}