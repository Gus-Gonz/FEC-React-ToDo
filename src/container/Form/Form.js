import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button'


let Form = (props) =>{
    return (
        <div>
            <Input change={props.addNewTodo.getNewTodoHandler}/>
            <Button onClick={props.addNewTodo.newTodoHandler}  text="Add"/>
        </div>
    )
}

export default Form ;