import React,{useCallback} from 'react'
import { addId, toggleModal } from '../features/modalSlice'
import { useAppDispatch } from '../hooks/hooks'
import { todoApi, TodoI } from '../services/todos'

interface Row{
    todo:TodoI,
    i:number
}


const Row = ({todo,i}:Row) => {
    const [updateTodo]=todoApi.useUpdateTodoMutation()
    const [deleteTodo]=todoApi.useDeleteTodoMutation()
    const dispatch = useAppDispatch()
    const onToggle =useCallback((todo:TodoI)=>
    updateTodo({
        ...todo,
        todoStatus:!todo.todoStatus,
    })
   
  
    ,[updateTodo])


    const editModalhandle =(id:string)=>{
        // dispatch(toggleModal({modalStatus:true}))
        console.log(id)
        dispatch(addId({todoIdToFetchForModal:id,modalStatus:true}))
    }
    
    console.log(todo.todoStatus)
  return (
    <tr className={`${todo.todoStatus ===true?'bg-[green]':''}`}>
        <td className="border border-slate-300 ...">{i+1}</td>
        <td className="border border-slate-300 ...">
            <input onChange={()=>onToggle(todo)} type="checkbox" checked={todo.todoStatus} />
        </td>
        <td className="border border-slate-300 ...">{todo.description}</td>
        <td className="border border-slate-300 flex justify-around">
            <button onClick={()=>editModalhandle(todo._id)} className='bg-blue-600 w-[40%] rounded-lg text-white hover:bg-blue-900'>Edit</button>
            <button onClick={()=>deleteTodo(todo._id)} className='bg-purple-700 w-[40%] rounded-lg text-white hover:bg-purple-900'>Delete</button>
        </td>
    </tr>  
  )
}

export default Row