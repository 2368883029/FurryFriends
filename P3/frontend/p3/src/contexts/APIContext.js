import { useState } from "react";
import { createContext } from "react";

export const APIContext = createContext({
    user: {"userId":"", "token" : ""},
    setUser: () => {},
});

export const useAPIContext = () => {
    const [user, setUser] = useState({"userId":"", "token" : ""});

    return {
        user, setUser,
    };
}