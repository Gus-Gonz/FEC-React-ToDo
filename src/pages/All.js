import React, { Component } from 'react';

// COMPONENTS
import Form from '../container/Form/Form';
import TodoList from '../container/TodoList/TodoList';

const All = (props) =>{
    const todoListMapped = props.mappedTodoList
      return (
              <section >
                <Form click={props.addButtonClick}/>
                <TodoList todoListMapped={todoListMapped}/>
              </section>
      );
    }
  
export default All;
  