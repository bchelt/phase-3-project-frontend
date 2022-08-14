import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/todos")
    .then((res) => res.json())
    .then((todos) => setTodos(todos));
    fetch("http://localhost:9292/categories")
    .then((res) => res.json())
    .then((categories) => setCategories(categories));
  }, []);
  
  function updateTodos(newTodo, category) {
    fetch("http://localhost:9292/todos", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: newTodo,
        category_id: category
      })
      
    })
    .then((res) => res.json())
    .then((todo) => setTodos([...todos, todo]))
  }

  function editTodo(task, id, catId) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: task,
        category_id: catId
      })
    })
    .then((res) => res.json())
    .then((data) => {
      let newList = todos.map((todo) => todo.id === id ? data : todo)
      setTodos(newList)
    })
  }
  
  function deleteTodo(id) {
    fetch(`http://localhost:9292/todos/${id}`, {
      method: 'DELETE'
    })
    let newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }
  
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <CreateTodo updateTodos={updateTodos} categories={categories}/>
      <ul className="list-group list-group-flush">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <Todo todo={todo} id={todo.id} handleEdit={editTodo} handleDelete={deleteTodo} categories={categories}/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
