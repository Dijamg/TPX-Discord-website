import { useEffect } from "react";
import { useToken } from "./useToken";
import { useCookies } from "./useCookies";
import { FormData } from "../types";
import AuthService from "../Services/auth";

export const useAuth = () => {
    const { contextToken: token, addToken, addUsername, addIsAdmin, removeToken, setToken, removeIsAdmin } = useToken();
    const { getItem } = useCookies();

    useEffect(() => {
        const token = getItem("TOKEN");
        const isAdmin = getItem("IS_ADMIN");
        if (token) {
            addToken(token);
        }
        if (isAdmin) {
            addIsAdmin(isAdmin);
        }
    }, []);

    const login = async (user: FormData) => {
        const response = await AuthService.login(user);
        if (response.data.token) {
            addToken(response.data.token);
            addUsername(response.data.username)
            addIsAdmin(response.data.isAdmin)
        }
        return response;
    };

    const logout = () => {
        removeToken();
        removeIsAdmin();
    };

    return { token, login, logout, setToken };
};