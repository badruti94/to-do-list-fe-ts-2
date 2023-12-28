interface Props {
    id: string
    todo: string
    done: boolean
    onDone: Function
    onDelete: Function
}

const List = ({ id, todo, done, onDone, onDelete }: Props) => {
    return (
        <div className={`todo w-full flex justify-between rounded-lg mb-4 px-2 py-1 ${done ? 'bg-green-800' : 'bg-gray-500'}`}>
            <p className="todo-text text-xl" >{todo}</p>
            <div className="flex flex-col justify-around">
                <div className="py-3 px-8 rounded-lg text-xs cursor-pointer text-white bg-green-500" onClick={() => { onDone(id) }} >done</div>
                <div className="py-3 px-8 rounded-lg text-xs cursor-pointer text-white bg-red-500" onClick={() => { onDelete(id) }}>delete</div>
            </div>
        </div>
    )
}

export default List