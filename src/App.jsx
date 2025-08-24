import { useState } from "react"
import {useCreateTodoMutation,useDeleteTodoMutation,useGetTodosQuery,useUpdateTodoMutation} from "./store/todoApi"

const App = () => {
  const [title, setTitle] = useState('')
  const [img, setImg] = useState('')
  const [editId, setEditId] = useState(null)

  const { data, refetch } = useGetTodosQuery()
  const [addTodo] = useCreateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateTodo({ id: editId, title, img }).unwrap()
        setEditId(null)
      } else {
        await addTodo({ title, img }).unwrap()
      }
      setTitle('')
      setImg('')
      refetch()
    } catch (err) {
      console.log("Xəta:", err)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap()
      refetch()
    } catch (err) {
      console.log("Silinmə xətası:", err)
    }
  }

  const handleEdit = (todo) => {
    setTitle(todo.title)
    setImg(todo.img)
    setEditId(todo.id)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <input className="border p-2 w-full mb-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Başlıq" type="text"/>
      <input className="border p-2 w-full mb-2" value={img} onChange={(e) => setImg(e.target.value)} placeholder="Şəkil linki"type="text"/>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">{editId ? "Yenilə" : "Əlavə et"}</button>
      <ul className="space-y-4">
        {data?.map((item) => (
          <li key={item.id} className="border p-4 rounded">
            <h3 className="font-semibold">{item.title}</h3>
            {item.img && <img src={item.img} alt="" className="w-24 mt-2" />}
            <div className="space-x-2 mt-2">
              <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-3 py-1 rounded">Redaktə et</button>
              <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-3 py-1 rounded">Sil</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
