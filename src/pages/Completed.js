import React, { Component } from 'react';

// COMPONENTS
import Header from '../container/Header/Header';
import TodoList from '../container/TodoList/TodoList';
import Button from '../components/Button/Button';

const All = (props) => {
  const todoListMapped = props.mappedTodoList;  

  return (
    <section>
      <Header activeTabObj={props.activeTabObj} />
      <TodoList todoListMapped={todoListMapped} />
      <Button
        class={'button-delete-all '}
        text='DELETE ALL'
        click={props.deleteAllButtonClick}></Button>
    </section>
  );
};

export default All;
