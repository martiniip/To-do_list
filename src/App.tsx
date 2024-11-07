import { useState } from 'react';
import { Plus, Trash, Edit, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const TodoListApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: todos.length + 1, text: newTodo, completed: false, priority }]);
      setNewTodo('');
      setPriority('low');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const editTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const saveEdit = () => {
    if (editingTodo) {
      setTodos(todos.map((todo) => todo.id === editingTodo.id ? { ...todo, text: newTodo } : todo));
      setEditingTodo(null);
      setNewTodo('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className="text-3xl font-bold mb-4">To-Do List App</h1>
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full p-2 pl-10 text-sm text-gray-700 rounded-lg focus:ring-2 focus:ring-gray-600"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="ml-2 p-2 text-sm text-gray-700 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {editingTodo ? (
          <button
            onClick={saveEdit}
            className="ml-2 p-2 text-sm text-gray-700 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <Check className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={addTodo}
            className="ml-2 p-2 text-sm text-gray-700 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              className="mr-2"
            />
            <span
              className={`text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'} ${todo.priority === 'low' ? 'bg-green-100 text-green-600' : todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'} p-2 rounded-lg`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => editTodo(todo)}
              className="ml-2 p-2 text-sm text-gray-700 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 p-2 text-sm text-gray-700 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              <Trash className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListApp;