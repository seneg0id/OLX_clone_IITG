import axios from "axios"
import { publicRequest } from "../requestMethods"
import { loginfailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch)=>{
    try {
        const res = await publicRequest.post('/auth/outlook/callback')
        dispatch(loginSuccess(res.data))
    } catch (error) {
        console.log(error)
    }
}