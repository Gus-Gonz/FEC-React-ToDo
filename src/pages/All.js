import React, { Component } from 'react';

// COMPONENTS
import Header from '../container/Header/Header';
import Form from '../container/Form/Form';
import TodoList from '../container/TodoList/TodoList';

const All = (props) => {
  const todoListMapped = props.mappedTodoList;

  return (
    <section>
      <Header activeTabObj={props.activeTabObj}/>
      <Form click={props.addButtonClick} />
      <TodoList todoListMapped={todoListMapped} />
    </section>
  );
};

export default All;
