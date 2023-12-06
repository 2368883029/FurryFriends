import { useState } from "react";
import { createContext } from "react";

export const APIContext = createContext({
    user: {
        "userId":"", 
        "token" : "",
        "firstName": "",
        "lastName" : "",
        "isShelter": false,
        'avatar_src' : ""
    },
    setUser: () => {},
});

export const useAPIContext = () => {
    const [user, setUser] = useState({
        "userId":"", 
        "token" : "",
        "firstName": "",
        "lastName" : "",
        "isShelter": false,
        'avatar_src' : ""
    });

    return {
        user, setUser,
    };
}