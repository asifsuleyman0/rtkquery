// src/App.jsx
import { useState } from 'react';
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from './store/todoApi';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId, setEditId] = useState(null);

  const { data: todos = [], refetch, isLoading, error } = useGetTodosQuery();
  const [addTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const handleSubmit = async () => {
    if (!title.trim()) return;
    try {
      if (editId) {
        await updateTodo({ id: editId, title, description }).unwrap();
        setEditId(null);
      } else {
        await addTodo({ title, description }).unwrap();
      }
      setTitle('');
      setDescription('');
      refetch();
    } catch (err) {
      console.error('Xəta:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap();
      refetch();
    } catch (err) {
      console.error('Silinmə xətası:', err);
    }
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setEditId(todo.id);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <input
        className="border p-2 w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlıq"
        type="text"
      />
      <input
        className="border p-2 w-full mb-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Açıqlama"
        type="text"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {editId ? 'Yenilə' : 'Əlavə et'}
      </button>

      {isLoading ? (
        <p>Yüklənir...</p>
      ) : error ? (
        <p>Xəta baş verdi</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((item) => (
            <li key={item.id} className="border p-4 rounded">
              <h3 className="font-semibold">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600 mt-1">{item.description}</p>
              )}
              <div className="space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Redaktə et
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
