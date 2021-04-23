import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";

export function auth(email, password) {
    return async dispatch => {
        const authData = {
            username:email, password
        }

        let url = 'http://test-alpha.reestrdoma.ru/api/login/'
        const response = await axios.post(url, authData)
        const data = response.data.data;
        console.log(data)
        const expirationDate = new Date(data.expiresIn)
        localStorage.setItem('token', data.token.access)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(data.token.access))
        dispatch(autoLogout(new Date(data.expiresIn).getTime()-new Date().getTime()))
    }
}

export function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS, token
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = localStorage.getItem('expirationDate')
            if (expirationDate<= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((new Date(expirationDate).getTime() - new Date().getTime())))
            }
        }
    }
}
