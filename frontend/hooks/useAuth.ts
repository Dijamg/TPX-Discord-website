import { useEffect } from "react";
import { useToken } from "./useToken";
import { useCookies } from "./useCookies";
import { FormData } from "../types";
import AuthService from "../Services/auth";

export const useAuth = () => {
    const { contextToken: token, addToken, addUsername, removeToken, setToken } = useToken();
    const { getItem } = useCookies();

    useEffect(() => {
        const token = getItem("TOKEN");
        if (token) {
            addToken(token);
        }
    }, []);

    const login = async (user: FormData) => {
        const response = await AuthService.login(user);
        if (response.data.token) {
            addToken(response.data.token);
            addUsername(response.data.username)
        }
        console.log(AuthService.getUsername())
        return response;
    };

    const logout = () => {
        removeToken();
    };

    return { token, login, logout, setToken };
};