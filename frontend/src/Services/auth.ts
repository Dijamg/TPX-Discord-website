import axios from "axios";
import Cookies from "universal-cookie";
import { FormData } from "../types";

const cookies = new Cookies();

export const register = async (data: FormData) => {
    const request = axios.post(`/api/auth/register`, data);
    const response = await request;
    return response;
};

export const login = async (data: FormData) => {
    const request = axios.post(`/api/auth/login`, data);
    const response = await request;
    return request;
};


export const getToken = () => cookies.get("TOKEN") ?? null;

export const getUsername = () => cookies.get("USERNAME") ?? null;

export const isAuthenticated = () => !!getToken();

export default { register, login, isAuthenticated, getUsername };