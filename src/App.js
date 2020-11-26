import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// COMPONENTS
import Header from './container/Header/Header';
import ItemTodo from './components/ItemTodo/ItemTodo';
import Button from './components/Button/Button';

// Pages
import All from './pages/All';
import Active from './pages/Active';
import Completed from './pages/Completed';

class App extends Component {
  state = {
    toDos: [
      {
        id: Math.floor(Math.random() * Date.now()),
        text: 'Go to the street',
        completed: false,
      },
      {
        id: Math.floor(Math.random() * Date.now()),
        text: 'Make dinner',
        completed: true,
      },
      {
        id: Math.floor(Math.random() * Date.now()),
        text: 'Check my cellphone',
        completed: false,
      },
    ],
  };

  addNewTaskHandler = (event) => {
    const inputValue = event.target.parentElement
      .querySelector('input')
      .value.trim();
    const newTodosList = this.state.toDos;

    if (inputValue === '') {
      return alert('It can not be a blank space');
    } else if (
      newTodosList.filter(
        (todo) => todo.text.toLowerCase() === inputValue.toLowerCase()
      ).length > 0
    ) {
      return alert('You can not add the same toDo twice');
    }

    const toDo = {
      id: Math.floor(Math.random() * Date.now()),
      text: inputValue,
      completed: false,
    };
    newTodosList.push(toDo);

    this.setState({ toDos: newTodosList });
    event.target.parentElement.querySelector('input').value = '';
  };

  completeTaskHandler = (event, itemId) => {
    // const liElement = event.target.closest('div').querySelector('li');
    const newTodos = this.state.toDos;
    const todoIndex = newTodos.findIndex((todo) => {
      return todo.id === itemId;
    });
    const todo = { ...newTodos[todoIndex] };

    if (todo.completed) {
      todo.completed = false;
    } else {
      todo.completed = true;
    }
    newTodos[todoIndex] = todo;
    this.setState({ toDos: newTodos });
  };

  deleteTaskHandler = (event, itemId) => {
    const newTodos = this.state.toDos.filter((todo) => todo.id !== itemId);
    this.setState({ toDos: newTodos });
  };

  deleteAllTaskHandler = (event) => {
    const newTodos = this.state.toDos.filter((todo) => !todo.completed);
    this.setState({ toDos: newTodos });
  };

  constructingJsxInsideMap = (
    filteredlist,
    doesItneedsDeleteButton = false
  ) => {
    return filteredlist.map((toDo) => {
      return (
        <div className={toDo.completed ? 'completed' : null}>
          <span>
            <Button
              key={toDo.id}
              text={'O'}
              click={(event) => this.completeTaskHandler(event, toDo.id)}
            />
          </span>
          <ItemTodo key={toDo.id} text={toDo.text} />
          {doesItneedsDeleteButton ? (
            <span>
              <Button
                key={toDo.id}
                text={'X'}
                click={(event) => this.deleteTaskHandler(event, toDo.id)}
              />
            </span>
          ) : null}
        </div>
      );
    });
  };

  mappingTodoList = (activeTab = 'all') => {
    let filteredList;
    if (activeTab === 'all') {
      filteredList = [...this.state.toDos];
      return this.constructingJsxInsideMap(filteredList);
    } else if (activeTab === 'active') {
      filteredList = this.state.toDos.filter((todo) => !todo.completed);
      return this.constructingJsxInsideMap(filteredList);
    } else if (activeTab === 'completed') {
      filteredList = this.state.toDos.filter((todo) => todo.completed);
      return this.constructingJsxInsideMap(filteredList, true);
    }
  };

  render() {
    return (
      <Router>
        <main>
          <Header />
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <All
                  mappedTodoList={this.mappingTodoList()}
                  addButtonClick={(event) =>
                    this.addNewTaskHandler(event)
                  }></All>
              )}
            />
            <Route
              path='/active'
              render={() => (
                <Active
                  mappedTodoList={this.mappingTodoList('active')}
                  addButtonClick={(event) =>
                    this.addNewTaskHandler(event)
                  }></Active>
              )}
            />
            <Route
              path='/completed'
              render={() => (
                <Completed
                  mappedTodoList={this.mappingTodoList('completed')}
                  buttonClick={(event) => this.addNewTaskHandler(event)}
                  deleteAllButtonClick={(event) =>
                    this.deleteAllTaskHandler(event)
                  }></Completed>
              )}
            />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
