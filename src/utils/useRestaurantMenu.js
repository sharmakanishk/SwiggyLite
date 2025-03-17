import React,{ useState, useEffect } from "react";
import { resMenu } from "./url";

const useRestaurantMenu = (resId) =>{
    const [resInfo, setResInfo] = useState(null)
    useEffect(()=>{
        fetchMenu()
    },[]);

    const fetchMenu = async ()=>{
        const dataJSON = await fetch(resMenu + resId);
        const data = await dataJSON.json();
        setResInfo(data);
    }
    return resInfo;
}

export default useRestaurantMenu;