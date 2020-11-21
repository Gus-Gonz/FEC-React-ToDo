import ItemTodo  from '../../components/ItemTodo/ItemTodo'


let TodoList = (props) =>{
    return (
        <ul>
            {props.todoListMapped}
        </ul>
    )
}

export default TodoList ;