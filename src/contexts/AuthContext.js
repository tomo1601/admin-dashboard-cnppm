import { createContext, useReducer } from "react";
import axios from "axios";
import { AuthReducer } from "../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, USER_ROLE } from "./constants";
import { useEffect } from "react"

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(AuthReducer, {
        authLoading: false,
        isAuthenticated: false,
        user: null,
        isUser: false,
        isAdmin: false,
    });

    // auth user
    const loadUser = async () => {
        try {
            const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
            if (recentToken !== undefined) {
                const response = await axios.get(`${apiUrl}/auth/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${recentToken}`,
                    },
                });

                if (response.data.success) {
                    dispatch({
                        type: "SET_AUTH",
                        payload: {
                            isAuthenticated: true,
                            user: response.data.user,
                            isUser: response.data.user.role === 'User' ? true : false,
                            isAdmin: response.data.user.role === 'Admin' ? true : false,
                        },

                    });
                } else throw new Error("Unauthorized !");
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            localStorage.removeItem(USER_ROLE);
            dispatch({
                type: "SET_AUTH",
                payload: {
                    isAuthenticated: false,
                    user: null,
                    isUser: false,
                    isAdmin: false,
                },
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);
    // admin login
    const loginAdmin = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success) {
                if(response.data.info.role==='Admin'){
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
                localStorage.setItem(USER_ROLE, response.data.info.role);
                dispatch({
                    type: "SET_AUTH",
                    payload: {
                        isAuthenticated: true,
                        user: response.data.info,
                        isUser: false,
                        isAdmin: true,
                    },
                });
                return response.data;
                }
                else return { success: false, message: 'Access denied!' }
            }
            else return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const getUserById = async (id) => {
        try {
            const response = await axios.post(`${apiUrl}/user/${id}`);
            if (response.data.success)
                return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    // get-all
    const getAllUser = async () => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
        try {
            const response = await axios.get(`${apiUrl}/user/get-all`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
            });
            if (response.data.success)
                return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    // logout
    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        localStorage.removeItem(USER_ROLE)
        dispatch({
            type: "SET_AUTH",
            payload: {
                isAuthenticated: false,
                user: null,
                isUser: false,
                isAdmin: false,
            },
        });
    }

    const blockUser = async (id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
        try {
            const response = await axios.put(`${apiUrl}/user/block`,{id:id},{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
                
            });
            if (response.data.success)
                return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    ///delete-user/:id
    const deleteUser = async (id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
        try {
            const response = await axios.delete(`${apiUrl}/user/delete-user/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
            });
            if (response.data.success)
                return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    ///delete-cate/:id
    const deleteCate = async (id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
        try {
            const response = await axios.delete(`${apiUrl}/category/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
            });
            if (response.data.success)
                return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    //newcategory
    const newCate = async (data) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
        try {
            const response = await axios.post(`${apiUrl}/category/newcategory`,data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
            });
            if (response.data.success)
                return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    const authContextData = {
        loginAdmin, getUserById, logout, getAllUser, blockUser, deleteUser,
        deleteCate, newCate, 
        authState,

    };

    //return
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;