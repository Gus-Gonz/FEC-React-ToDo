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
    toDos: [],
    activeTabs: [
      { tabName: 'all', active: false },
      { tabName: 'active', active: false },
      { tabName: 'completed', active: false },
    ],
  };

  activeTabHandler = (activeTabName = 'all') => {
    const newActiveTabs = [...this.state.activeTabs];
    newActiveTabs.forEach((eachtab) => {
      eachtab.active = false;
    });

    const tabIndex = newActiveTabs.findIndex((tab) => {
      return tab.tabName === activeTabName;
    });
    const tab = { ...newActiveTabs[tabIndex] };
    tab.active = true;
    newActiveTabs[tabIndex] = tab;

    return newActiveTabs;
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

  mappingTodoList = (filteredlist, doesItneedsDeleteButton = false) => {
    return filteredlist.map((toDo) => {
      return (
        <div
          key={toDo.id}
          className={
            toDo.completed ? 'list-element completed' : 'list-element'
          }>
          <Button
            class={
              toDo.completed ? 'button-radio radio-completed' : 'button-radio'
            }
            text={null}
            click={(event) => this.completeTaskHandler(event, toDo.id)}
          />
          <ItemTodo text={toDo.text} />
          {doesItneedsDeleteButton ? (
            <span>
              <Button
                class='button-radio radio-delete'
                text={'X'}
                click={(event) => this.deleteTaskHandler(event, toDo.id)}
              />
            </span>
          ) : null}
        </div>
      );
    });
  };

  constructingJsx = (activeTab = 'all') => {
    let filteredList;
    if (activeTab === 'all') {
      filteredList = [...this.state.toDos];
      // this.activeTabHandler(activeTab)
      return this.mappingTodoList(filteredList);
    } else if (activeTab === 'active') {
      filteredList = this.state.toDos.filter((todo) => !todo.completed);
      return this.mappingTodoList(filteredList);
    } else if (activeTab === 'completed') {
      filteredList = this.state.toDos.filter((todo) => todo.completed);
      return this.mappingTodoList(filteredList, true);
    }
  };

  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route
              exact
              path='/'
              render={() => (
                <All
                  activeTabObj={this.activeTabHandler()}
                  mappedTodoList={this.constructingJsx()}
                  addButtonClick={(event) =>
                    this.addNewTaskHandler(event)
                  }></All>
              )}
            />
            <Route
              path='/active'
              render={() => (
                <Active
                  activeTabObj={this.activeTabHandler('active')}
                  mappedTodoList={this.constructingJsx('active')}
                  addButtonClick={(event) =>
                    this.addNewTaskHandler(event)
                  }></Active>
              )}
            />
            <Route
              path='/completed'
              render={() => (
                <Completed
                  activeTabObj={this.activeTabHandler('completed')}
                  mappedTodoList={this.constructingJsx('completed')}
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
