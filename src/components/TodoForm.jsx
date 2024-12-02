import { useState } from "react"
import { useTodo } from "../contexts";

const TodoForm = () => {

    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todo)
        setTodo("")
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4  w-[80%] mx-auto ">
            <input
                required
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                type="text"
                placeholder="Enter your task..."
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add
            </button>
        </form>

    )
}

export default TodoForm