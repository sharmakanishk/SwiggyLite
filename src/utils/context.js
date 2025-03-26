import { createContext } from "react";

const userContext = createContext({
    loggedInUser: "Default_User"
})

export default userContext;