import React, { Component } from 'react';
import {BrowserRouter as Router ,Switch ,Route} from "react-router-dom"

// COMPONENTS
import Header from './container/Header/Header';
import ItemTodo  from './components/ItemTodo/ItemTodo'
import Button from "./components/Button/Button"

// Pages
import All from './pages/All'
import Active from './pages/Active'
import Completed from './pages/Completed' 

class App extends Component {

  state = {
    toDos: [
      {id:Math.floor(Math.random() * Date.now()),text:"Go to the street",completed:false},
      {id:Math.floor(Math.random() * Date.now()),text:"Make dinner",completed:true},
      {id:Math.floor(Math.random() * Date.now()),text:"Check my cellphone",completed:false},
    ]
  }

  addNewTaskHandler = (event) => {
    const inputValue = event.target.parentElement.querySelector('input').value.trim();
    const newTodosList = [...this.state.toDos];

    if (inputValue === ''){return alert("It can not be a blank space")}
    else if (newTodosList.filter((todo)=> todo.text === inputValue).length > 0){return alert('You can not add the same toDo twice')}

    const toDo = {id:Math.floor(Math.random() * Date.now()),text: inputValue,completed:false};
    newTodosList.push(toDo);

    this.setState({toDos:newTodosList});
    event.target.parentElement.querySelector('input').value = ''
  };

  completeTaskHandler = (event,itemId)=>{
    // const liElement = event.target.closest('div').querySelector('li');
    const newTodos = [...this.state.toDos];
    const todoIndex = newTodos.findIndex(todo => {return todo.id === itemId;});
    const todo = {...this.state.toDos[todoIndex]};

    if (todo.completed){
      todo.completed = false;
    }else{
      todo.completed = true;
    }
    newTodos[todoIndex] = todo ;
    this.setState({toDos:newTodos});
  };

  deleteTaskHandler = (event,itemId)=>{
    const newTodos = [...this.state.toDos].filter((todo)=>  todo.id !== itemId);
    this.setState({toDos:newTodos});

  } 

  deleteAllTaskHandler = (event)=>{
    const newTodos = [...this.state.toDos].filter((todo)=> !todo.completed);
    this.setState({toDos:newTodos})
  }

  mappingTodoList= (activeTab='all') =>{
    if (activeTab === 'all'){
      const mappedList = [...this.state.toDos].map(
        (toDo) => {return (
                  <div className={toDo.completed ? 'completed' : null}>
                    <span><Button  key={(toDo.id/3)} text={'O'} click={(event) => this.completeTaskHandler(event,toDo.id)}/></span>
                    <ItemTodo  key={toDo.id} text={toDo.text} />
                  </div>);
       });
      return mappedList
    }else if (activeTab === "active"){
      const filteredList = [...this.state.toDos].filter((todo)=> !todo.completed );
      const mappedList = filteredList.map(
        (toDo) => {return (
                  <div className={toDo.completed ? 'completed' : null}>
                    <span><Button  key={(toDo.id/2)} text={'O'} click={(event) => this.completeTaskHandler(event,toDo.id)}/></span>
                    <ItemTodo  key={toDo.id} text={toDo.text} />
                  </div>);
       });
      return mappedList
    }else if(activeTab === "completed") {
      const filteredList = [...this.state.toDos].filter((todo)=> todo.completed);
      const mappedList = filteredList.map(
        (toDo) => {return (
                  <div className={toDo.completed ? 'completed' : null}>
                    <span><Button  key={(toDo.id/5)} text={'O'} click={(event) => this.completeTaskHandler(event,toDo.id)}/></span>
                    <ItemTodo  key={toDo.id} text={toDo.text} />
                    <span><Button  key={(toDo.id/4)} text={'X'} click={(event) => this.deleteTaskHandler(event,toDo.id)}/></span>
                  </div>);
        });
      return mappedList
    }
  }

  render(){
    return (
        <Router>
          <main>
            <Header/>
            <Switch>
              <Route exact path='/' 
              render={()=><All mappedTodoList={this.mappingTodoList()} 
              addButtonClick={(event) => this.addNewTaskHandler(event)}
              
              ></All>}/>
              <Route path='/active' 
              render={()=><Active mappedTodoList={this.mappingTodoList('active')}
              addButtonClick={(event) => this.addNewTaskHandler(event)}
              
              ></Active>}/>
              <Route path='/completed' 
              render={()=><Completed mappedTodoList={this.mappingTodoList('completed')}
              buttonClick={(event) => this.addNewTaskHandler(event)}
              deleteAllButtonClick = {(event)=> this.deleteAllTaskHandler(event)}
              
              ></Completed>}/>
            </Switch>
          </main>
        </Router>
    );
  }
}

export default App;
