import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// COMPONENTS
import ItemTodo from './components/ItemTodo/ItemTodo';
import Button from './components/Button/Button';

// Pages
import All from './pages/All';
import Active from './pages/Active';
import Completed from './pages/Completed';

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [activeTab, setActiveTab] = useState([
    { tabName: 'all', active: false },
    { tabName: 'active', active: false },
    { tabName: 'completed', active: false },
  ]);

  const activeTabHandler = (activeTabName = 'all') => {
    const newActiveTabs = [...activeTab];
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

  const addNewTaskHandler = (event) => {
    const inputValue = event.target.parentElement
      .querySelector('input')
      .value.trim();
    const newTodosList = [...toDos];

    if (inputValue === '') {
      return alert('It can not be a blank space');
    } else if (
      newTodosList.filter(
        (todo) => todo.text.toLowerCase() === inputValue.toLowerCase()
      ).length > 0
    ) {
      return alert('You can not add the same toDo twice');
    }

    const newToDo = {
      id: Math.floor(Math.random() * Date.now()),
      text: inputValue,
      completed: false,
    };

    newTodosList.push(newToDo);
    setToDos(newTodosList);

    event.target.parentElement.querySelector('input').value = '';
  };

  const completeTaskHandler = (event, itemId) => {
    const newTodos = [...toDos];
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
    setToDos(newTodos);
  };

  const deleteTaskHandler = (event, itemId) => {
    const newTodos = toDos.filter((todo) => todo.id !== itemId);
    setToDos(newTodos);
  };

  const deleteAllTaskHandler = (event) => {
    const newTodos = toDos.filter((todo) => !todo.completed);
    setToDos(newTodos);
  };

  const mappingTodoList = (filteredlist, doesItneedsDeleteButton = false) => {
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
            click={(event) => completeTaskHandler(event, toDo.id)}
          />
          <ItemTodo text={toDo.text} />
          {doesItneedsDeleteButton ? (
            <span>
              <Button
                class='button-radio radio-delete'
                text={'X'}
                click={(event) => deleteTaskHandler(event, toDo.id)}
              />
            </span>
          ) : null}
        </div>
      );
    });
  };

  const constructingJsx = (activeTab = 'all') => {
    let filteredList;
    if (activeTab === 'all') {
      filteredList = [...toDos];
      return mappingTodoList(filteredList);
    } else if (activeTab === 'active') {
      filteredList = toDos.filter((todo) => !todo.completed);
      return mappingTodoList(filteredList);
    } else if (activeTab === 'completed') {
      filteredList = toDos.filter((todo) => todo.completed);
      return mappingTodoList(filteredList, true);
    }
  };

  return (
    <Router>
      <main>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <All
                activeTabObj={activeTabHandler()}
                mappedTodoList={constructingJsx()}
                addButtonClick={(event) => addNewTaskHandler(event)}></All>
            )}
          />
          <Route
            path='/active'
            render={() => (
              <Active
                activeTabObj={activeTabHandler('active')}
                mappedTodoList={constructingJsx('active')}
                addButtonClick={(event) => addNewTaskHandler(event)}></Active>
            )}
          />
          <Route
            path='/completed'
            render={() => (
              <Completed
                activeTabObj={activeTabHandler('completed')}
                mappedTodoList={constructingJsx('completed')}
                buttonClick={(event) => addNewTaskHandler(event)}
                deleteAllButtonClick={(event) =>
                  deleteAllTaskHandler(event)
                }></Completed>
            )}
          />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
