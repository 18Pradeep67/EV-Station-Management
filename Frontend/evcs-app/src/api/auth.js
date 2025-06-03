import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;   

//  /signup
export const signupAPI = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/signup`, {
    username,
    email,
    password,
  });
  return response.data;
};

// /login
export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            return err.response.data;
        } else {
            console.error(err);
            return { message: "Something went wrong" };
        }
    }
};

