import {createSlice,PayloadAction} from "@reduxjs/toolkit"

export interface ModalState{
    todoIdToFetchForModal: string;
    modalStatus?:boolean,
}

interface ModalStatus{
    modalStatus:boolean
}
interface IdStatus{
    todoIdToFetchForModal: string;
}

const initialState:ModalState = {
    todoIdToFetchForModal:'',
    modalStatus:false,

}


export const  modalSlice =createSlice({
    name: 'modal',
    initialState,
    reducers:{
        toggleModal:(state,action:PayloadAction<ModalStatus>)=>{
            state.modalStatus = action.payload.modalStatus
        },
        addId:(state,action:PayloadAction<ModalState>)=>{
            state.todoIdToFetchForModal = action.payload.todoIdToFetchForModal
            state.modalStatus = action.payload.modalStatus
          
        },
        resetId:(state)=>{
            state.todoIdToFetchForModal = ''
        }
    }
})
export const {toggleModal,addId,resetId} = modalSlice.actions
export default modalSlice.reducer