import { useState } from 'react';

function Todo({ todo, handleEdit, handleDelete, categories }) {
    const [edit, setEdit] = useState(false)
    const [task, setTask] = useState(todo.task)
    const [catId, setCatId] = useState(todo.category_id)
    
    function deleteTodo() {
        handleDelete(todo.id)
    }

    function handleChange(e) {
        setTask(e.target.value)
    }

    function beginEdit(e) {
        setEdit(true)
        setCatId(todo.category_id)
    }

    function cancelEdit(e) {
        setEdit(false)
        setTask(todo.task)
        setCatId(todo.category_id)
    }

    function saveEdit(e) {
        handleEdit(task, todo.id, catId)
        setEdit(false)
    }

    function handleCat(e) {
        setCatId(e.target.value)
    }
    

    return (
        <>
        {edit 
            ? (<form className='row g-3'>
                <select className='col-auto' onChange={handleCat}>
                    {categories.map((category) => (
                        <option value={category.id} key={category.id} selected={catId === category.id ? 'selected' : null}>{category.name}</option>
                    ))}
                </select>
                <input className='col-auto' type="text" value={task} onChange={handleChange}/>
                <button type='button' className='btn col-auto' onClick={saveEdit}>Save</button>
                <button  type='button' className='btn col-auto' onClick={cancelEdit}>Cancel</button>
            </form>)
            : (<div>
                    {todo.category.name} | {todo.task} 
                    <button type="button" className='btn' onClick={beginEdit}>Edit</button>
                    <button type="button" className='btn' onClick={deleteTodo}>Delete</button>
                    
                </div>)
        }
        </>
    )
}

export default Todo;