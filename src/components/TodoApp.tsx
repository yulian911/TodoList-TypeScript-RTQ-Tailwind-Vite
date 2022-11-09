import React from 'react'
import AppModal from './AppModal'
import TodoList from './TodoList'

const TodoApp = () => {
  return (
    <div className='w-[100%] flex flex-col justify-center items-center gap-[5rem]' >
        <AppModal/>
        <TodoList/>
    </div>
  )
}

export default TodoApp