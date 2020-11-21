import React, { Component } from 'react';
import Header from './container/Header/Header';
import Form from './container/Form/Form';
import TodoList from './container/TodoList/TodoList';
import ItemTodo  from './components/ItemTodo/ItemTodo'
import Button from "./components/Button/Button"


// This will become page 1 

class App extends Component {

  state = {
    toDos: [
      {id:Math.floor(Math.random() * Date.now()),text:"Go to the street",completed:false},
      {id:Math.floor(Math.random() * Date.now()),text:"Make dinner",completed:false},
      {id:Math.floor(Math.random() * Date.now()),text:"Check my cellphone",completed:false},
    ],
    activeTab: "all"
  }

  addNewTaskHandler = (event) => {
    const inputValue = event.target.parentElement.querySelector('input').value;
    const toDo = {id:Math.floor(Math.random() * Date.now()),text: inputValue,completed:false};
    const newTodosList = [...this.state.toDos];
    newTodosList.push(toDo);

    this.setState({toDos:newTodosList});
    
  };

  radioButtonHandler = (event,itemId)=>{
    const liElement = event.target.closest('div').querySelector('li');
    console.log(liElement);

    const newTodos = [...this.state.toDos];
    const todoIndex = newTodos.findIndex(todo => {return todo.id === itemId;});
    const todo = {...this.state.toDos [todoIndex]};

    if (todo.completed){
      todo.completed = false;
    }else{
      todo.completed = true;
    }
    newTodos[todoIndex] = todo ;
    console.log(newTodos)
    this.setState({toDos:newTodos});

  };

  render(){

    // Handling the ToDo List 

    const todoListMapped = [...this.state.toDos].map((toDo)=>{
      return (
        <div className={toDo.completed ? 'completed' : null}>
          <span><Button  key={(toDo.id +  1)} text={''} click={(event) => this.radioButtonHandler(event,toDo.id)}/></span>
          <ItemTodo  key={toDo.id} text={toDo.text} />
        </div>);
     });

    return (
        <main>
          <Header/>
          <section >
            <Form click={(event) => this.addNewTaskHandler(event)}/>
            <TodoList todoListMapped={todoListMapped}/>
          </section>
        </main>
    );
  }
}

export default App;
