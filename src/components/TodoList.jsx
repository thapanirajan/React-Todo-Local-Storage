import { useState } from "react"
import { useTodo } from "../contexts"

const TodoList = ({ todo }) => {
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo, toogleComplete } = useTodo()
    const [isEditable, setIsEditable] = useState(false)

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsEditable(false)
    }
 
    return (
        <div className={`p-4  border flex space-x-4 ${todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"}`}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toogleComplete(todo.id)}
            />
            <input
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isEditable}
                className={`w-full rounded-sm px-2 py-1 bg-[#c6e9a7] text-black 
                border-black/10 ${todo.completed ? "line-through" : ""}`}

            />
            <button
                onClick={() => {
                    if (todo.completed) return;
                    if (isEditable) {
                        editTodo();
                    } else {
                        setIsEditable((prev) => !prev)
                    }
                }}
            >{isEditable ? "📁" : "✏️"}</button>
            <button
                className="text-red-500"
                onClick={() => {
                    deleteTodo(todo.id)
                }}
            ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </div>
    )
}

export default TodoList