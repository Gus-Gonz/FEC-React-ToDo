import React, { Component } from 'react';

// COMPONENTS
import TodoList from '../container/TodoList/TodoList';
import Button from '../components/Button/Button'

const All = (props) =>{
    const todoListMapped = props.mappedTodoList
      return (
              <section >
                <TodoList todoListMapped={todoListMapped}/>
                <Button text="DELETE ALL TASK COMPLETED" click={props.deleteAllButtonClick}></Button>
              </section>
      );
    }
  
export default All;
  