import React, { Component } from 'react';
import Header from './container/Header/Header';
import Form from './container/Form/Form';
import TodoList from './container/TodoList/TodoList';


// This will become page 1 

class App extends Component {

  state ={
    todo: [
      {id:this.randomId(),text:"Go to the street",completed:false},
      {id:this.randomId(),text:"Make dinner",completed:false},
      {id:this.randomId(),text:"Check my cellphone",completed:false},
    ]
  }

  randomId = () =>{return Math.floor(Math.random() * Date.now())}
  

  render(){

    return (
        <main>
          <Header/>
          <section>
            <Form/>
            <TodoList/>
          </section>
        </main>
    );
  }
}

export default App;
