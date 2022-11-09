import React from 'react'
import { toggleModal } from '../features/modalSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { todoApi } from '../services/todos'
import Row from './Row'

const TodoList = () => {
    // const skeletons =  [...new Array(4)]
    const {data:todos}=todoApi.useGetTodosQuery()
    const dispatch = useAppDispatch()
    const {modalStatus}=useAppSelector(state=>state.modal)

  return (
    <>
    <div className='mt-[5rem]'>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => dispatch(toggleModal({modalStatus:!modalStatus}))}
      >
        Open small modal
      </button>
    </div>
    
    <table className="border-collapse border border-slate-400 w-[60%]">
        <thead>
            <tr>
                <th className="border border-slate-300 ...">ID</th>
                <th className="border border-slate-300 ...">Todo Status</th>
                <th className="border border-slate-300 ...">Todo Description</th>
                <th className="border border-slate-300 ...">Actions</th>

            </tr>
        </thead>
        <tbody>
            
            {todos?.map((todo, i) =>(
                <Row key={todo._id} todo={todo} i={i}/>
            ))}
        </tbody>
    </table>
    
    </>
  )
}

export default TodoList