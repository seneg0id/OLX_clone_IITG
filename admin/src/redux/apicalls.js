import axios from "axios"
import { loginfailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await axios.post('http://localhost:5000/auth/outlook/callback')
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginfailure())
    }
}