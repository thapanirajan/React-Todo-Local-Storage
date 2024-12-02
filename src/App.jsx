import { useEffect, useState } from "react"
import { TodoProvider } from "./contexts"
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos((prev) => [{ id: Date.now(), todo, completed: false }, ...prev])
    }

    const updateTodo = (id, todo) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
    }

    const deleteTodo = (id) => {
        setTodos((prev) => prev.filter((prevTodo) => (
            prevTodo.id !== id
        )))
    }

    const toogleComplete = (id) => {
        setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo)))
    }

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("todos"));
        if (localData && localData.length > 0) {
            return setTodos(localData)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])
    // bg-[#172842]

    return (
        <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toogleComplete }}>
            <div className="bg-slate-600 min-h-screen py-8 ">
                <div className=" bg-slate-500 w-full max-w-2xl mx-auto shadow-xl rounded-lg p-8 text-white  ">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */}
                        <TodoForm />

                    </div>
                    <div className="flex flex-wrap gap-y-3 ">
                    <div className="w-full text-center font-serif text-2xl">Todo List</div>
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                            <div className="w-[80%] mx-auto" key={todo.id}>
                                <TodoList todo={todo} />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </TodoProvider>
    )
}

export default App