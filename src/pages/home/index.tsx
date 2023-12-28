import React, { ChangeEvent, useEffect, useState } from "react"
import { API } from "../../config/api"
import { List } from "../../components"

interface Todo {
    _id: string
    todo: string
    done: boolean
}

interface Data {
    data: Todo[]
}

const Home = () => {
    const [todo, setTodo] = useState<Todo[]>([])
    const [text, setText] = useState<string>('')

    const fetchData = async () => {
        try {
            const result = await API.get<Data>('/todo')
            console.log(result.data);

            setTodo(result.data.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await API.post('/todo', { todo: text })
            fetchData()
        } catch (error) {
            console.log(error);

        }
    }

    const onDone = async (id: string) => {
        try {
            await API.patch(`/todo/${id}/done`)
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }
    const onDelete = async (id: string) => {
        try {
            await API.delete(`/todo/${id}`)
            fetchData()

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-2/4 mx-auto my-10">
            <form action="" onSubmit={onSubmit}>
                <input
                    id="text"
                    className="w-full px-5 py-3 outline-none border-2 border-gray-400 rounded-lg text-lg box-border"
                    type="text"
                    value={text}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                />
            </form>
            <div className="mt-12 w-full">
                {todo && todo.map(td => <List
                    key={td._id}
                    id={td._id}
                    todo={td.todo}
                    done={td.done}
                    onDone={onDone}
                    onDelete={onDelete}
                />)}
            </div>
        </div>
    )
}

export default Home