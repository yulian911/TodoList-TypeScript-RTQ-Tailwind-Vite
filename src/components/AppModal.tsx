import React,{useState} from 'react'
import { resetId, toggleModal } from '../features/modalSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { todoApi } from '../services/todos'

const AppModal = () => {
  const [inputValue,setInputValue]=useState('')
  const {modalStatus}=useAppSelector(state=>state.modal)
  const dispatch = useAppDispatch()

  const [createTodo] =todoApi.useCreateTodoMutation()
  const [updateTodo] =todoApi.useUpdateTodoMutation()
  const {todoIdToFetchForModal:todoId} =useAppSelector(state=>state.modal)
  const {data} =todoApi.useGetTodoByIdQuery(todoId)

  
  const handleSendValue =()=>{
    !todoId?createTodo({description:inputValue,todoStatus:false})
    :
    updateTodo({
      description:inputValue,todoStatus:false,
      _id:todoId
    })

    dispatch(toggleModal({modalStatus:false}))
  }

  const closeModal =()=>{
    if(todoId){
      dispatch(resetId())
    }
    dispatch(toggleModal({modalStatus:false}))
  }

  return (
    <>

    {modalStatus ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Modal Title
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    XS
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">Todo</label>
                  <div className="mt-1">
                  
                  {todoId?
                   <input defaultValue={data?.description} onChange={(e)=>setInputValue(e.target.value)}  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Todo..."/>
                    :
                    <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)}  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Todo..."/>

                  }
                    
                   
                  </div>
                </div>

                
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleSendValue}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
  )
}

export default AppModal