import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { PostReducer } from "../reducers/PostReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(PostReducer, {
        posts: [],
        cats:[],
        postLoading: true
    });

    // get all
    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post/get-all`);
            const response2 = await axios.get(
                `${apiUrl}/category/get-all`
              );
            if (response.data.success) {
                dispatch({
                    type: "SET_POSTS",
                    payload:  {
                        posts:response.data.listPost,
                        cats:response2.data.listCategory
                    },
                });
            }
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };
    useEffect(() => {
        const getposts = async () => {
            await getAllPosts();
        }
        getposts()
    }, []);

    const getPostById = async (id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.get(`${apiUrl}/post/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${recentToken}`,
                },
            });
            if (response.data.success) {
                dispatch({
                    type: "FIND_POSTS_SUCCESS",
                    payload: response.data.post
                });
                return response.data;
            }

        } catch (error) {
            dispatch({
                type: "FIND_POSTS_FAIL"
            });
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // get post by user ID
    const getPostByUserId = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/post/?userId=${id}`);
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // update Post
    const updatePost = async (post, id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.put(`${apiUrl}/post/${id}`, post, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${recentToken}`,
                },
            });
            if (response.data.success) {
                return response.data;
            }

        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // delete Post
    const deletePost = async (id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.delete(`${apiUrl}/post/admin/deletepost/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
                
            });
            console.log(response)
            if (response.data.success) {
                return response.data;
            }

        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    //get post by category
    const getPostByCateId = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/post/?categoryId=${id}`);
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // delete comment
    const deleteComment = async (cmtId) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.delete(`${apiUrl}/comment/${cmtId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },

            });
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    // new comment
    const getComment = async (postId) => {
        try {
            const response = await axios.get(`${apiUrl}/comment/?postId=${postId}`);
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // search by keyword
    const searchByKeyWord = async (keyword) => {
        try {
            const response = await axios.get(`${apiUrl}/search?keyword=${keyword}`);
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    // export
    const postContextData = {
        getAllPosts, getPostById, getPostByUserId, updatePost,
        deletePost, getPostByCateId, getComment, deleteComment,
        searchByKeyWord,
        postState,

    };

    //return
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
