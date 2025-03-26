import NavBar from "./NavBar";
import Body from "./Body";
import userContext from "../utils/context";
import { useEffect } from "react";

const AppContainer = ()=>{
    const [text, setText] = useState()
    console.log("from appcontainer" +setText)
    useEffect(()=>{
        setText("kanishk")
    })
    return (<div id="container">
        
            <NavBar/>
            <userContext.Provider value={{ loggedInUser:text, setText}}>
            <Body/>
        </userContext.Provider>
    </div>
);
}

export default AppContainer;