import axios from "axios";

export const GET_USER = "GET_USER"; 
export const GET_ALL_USERS = "GET_ALL_USERS"; 

export const getUser = (uid) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials:true});
            dispatch({ type: GET_USER, payload: response.data });
        } catch (err) {
            console.log(err);
        }
    };
};

export const getAllUsers = (uid) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}api/user/`, {withCredentials:true});
            dispatch({ type: GET_ALL_USERS, payload: response.data });
        } catch (err) {
            console.log(err);
        }
    };
};

