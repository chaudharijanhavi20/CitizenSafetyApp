import { PERMISSION_FAILS, PERMISSION_REQUEST, PERMISSION_SUCCESS } from "../constants/permisionconst"

export const accesspermissions = (data)=> async (dispatch)=>{
    try {
        dispatch({type:PERMISSION_REQUEST})
        // SOME TASK
        dispatch({type:PERMISSION_SUCCESS,payload:data})
    } catch (error) {
        dispatch({type:PERMISSION_FAILS,payload:error.message});
    }
}