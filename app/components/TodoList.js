"use client"
import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo ,editTodo} from '../redux/todoActions';

const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const [editableTodoId, setEditableTodoId] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [filter, setFilter] = useState('ALL');

  const handleToggle = id => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = id => {
    dispatch(deleteTodo(id));
  };
  const handleEdit = (id, text) => {
    setEditableTodoId(id);
    setEditedText(text);
  };

  const handleSaveEdit = id => {
    dispatch(editTodo(id, editedText));
    setEditableTodoId(null);
    setEditedText('');
  };

  const handleCancelEdit = () => {
    setEditableTodoId(null);
    setEditedText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true;
    } else if (filter === 'ACTIVE') {
      return !todo.completed;
    } else {
      return todo.completed;
    }
  });
  return (
    <div className='todoList w-3/5 p-40'>
      <h1 className='text-text font-medium text-2xl'>To do tasks</h1>
      <div className='flex mt-8 mb-8'>
        <button className='text-text py-1 w-24 mx-4 rounded-lg border-2 border-text' onClick={() => setFilter('ALL')}>All</button>
        <button className='text-text py-1 w-24 mx-4 rounded-lg border-2 border-text ' onClick={() => setFilter('COMPLETED')}>Done</button>
        <button className='text-text py-1 w-24 mx-4 rounded-lg border-2 border-text' onClick={() => setFilter('ACTIVE')}>Todo</button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id} className='border-bc border-2 rounded p-3 mt-2'>
            {editableTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={event => setEditedText(event.target.value)}
                />
                 <button className='bg-red text-white px-2 mx-2 rounded float-right' onClick={handleCancelEdit}>Cancel</button>
                <button className='bg-text text-white px-2 mx-2 rounded float-right' onClick={() => handleSaveEdit(todo.id)}>Save</button>          
              </>) : (
              <>
                <input
                  className='mx-2'
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none',color: todo.completed ? 'gray' : 'black' }}>
                  {todo.text}
                </span>
                <button className='bg-red text-white px-2 mx-2 rounded float-right' onClick={() => handleDelete(todo.id)}>Delete</button>
                <button className='bg-text text-white px-2 mx-2 rounded float-right' onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
                </>)}

          </li>
        ))}
      </ul>
    </div>

  );
}

export default TodoList