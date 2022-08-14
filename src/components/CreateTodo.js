function CreateTodo( { updateTodos, categories }) {

    function newTodo(e) {
        e.preventDefault();
        updateTodos(e.target.task.value, e.target.category.value)
    }

    return (
        <form onSubmit={newTodo} className="row g-3"> 
            <label className="col-auto" htmlFor="task">Create Todo: </label>
            <input type="text" id="task" className="col-auto"/>
            <select className="col-auto" id="category">
                {categories.map((category) => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                ))}
            </select>
            <input type="submit" className="btn col-auto" />
        </form>
    )
}

export default CreateTodo;