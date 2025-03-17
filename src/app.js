import React from "react";
import ReactDOM from "react-dom/client";
//import AppContainer from "./components/AppContainer";
import { createBrowserRouter,RouterProvider, Outlet } from "react-router-dom";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import NavBar from "./components/NavBar";
import RestaurantsMenu from "./components/RestaurantsMenu";

const AppContainer = ()=>{
    return (<div id="container">
        <NavBar/>
        <Outlet/>
    </div>
);
}

let router=createBrowserRouter([
    {
       path: "/",
       element: <AppContainer/>,
       children: [
        {
            path: "/",
            element:<Body/>
        },
        {
            path: "/about",
            element:<About/>
        },
        {
            path: "/contact",
            element:<Contact/>
        },
        {
            path: "/restaurants/:id",
            element: <RestaurantsMenu/>
        },
       ],
       errorElement: <Error/>
    }
   ],
)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
)

