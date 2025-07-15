import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useCookies } from "./useCookies";

export const useToken = () => {
    const { token: contextToken, setToken } = useContext(AuthContext);
    const { setItem, removeItem } = useCookies();

    const addToken = (token: string) => {
        setToken(token);
        setItem("TOKEN", token, { maxAge: 360 * 24 });
    };

    const addUsername = (username: string) => {
        setItem("USERNAME", username)
    }

    const removeToken = () => {
        setToken(null);
        removeItem("TOKEN");
        removeItem("USERNAME")
    };

    return { contextToken, addToken, addUsername, removeToken, setToken };
};