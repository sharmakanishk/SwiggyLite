import { useState, useEffect } from "react";
import { appLogo } from "../utils/url";
import { Link } from "react-router-dom";

const NavBar = ()=>{
    const [loginButton, setloginButton] = useState("Login")
    const [onlineStaus, setOnlineStatus] = useState(true)
    useEffect(()=>{
        const handleOnline=()=>setOnlineStatus(true)
        const handleOffline = ()=>setOnlineStatus(false)

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return ()=>{
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        }
    },[])
    return (<div className="flex justify-between border border-solid border-b-black m-2">
        <img className="w-32 h-32 p-4"
        src={appLogo}
        alt="App Icon">
        </img>
        <ul className="flex items-center p-4 m-4">
            <li className="p-4">Online Status:{onlineStaus?" ✅online":" ❌offline"}</li>
            <li className="p-4"><Link to="/about">About</Link></li>
            <li className="p-4"><Link to="/">Home</Link></li>
            <li className="p-4"><Link to="/contact">Contact</Link></li>
            <li className="p-4">Cart</li>
            <li className="p-4"><button className="bg-green-200 px-4 py-2 rounded-md" onClick={()=>{
                loginButton === "Login" ? setloginButton("Logout") : setloginButton("Login")
            }
            }>{loginButton}</button></li>
        </ul>
    </div>
)}

export default NavBar;