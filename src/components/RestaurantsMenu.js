import React, { useState, useEffect } from 'react'
import { resMenu } from '../utils/url'
import Shimmer from './Shimmer'
import useRestaurantMenu from '../utils/useRestaurantMenu'
import { useParams } from 'react-router-dom'

const RestaurantsMenu = () => {
    // const [resTitle, setResTitle] = useState(null)
    // const [menu, setMenu]= useState([])
    const {id} = useParams();
    const resInfo = useRestaurantMenu(id);
    if(resInfo === null) return <Shimmer/>
    console.log(resInfo)
    // useEffect(()=>{
    //     const titleRes = resInfo?.data.data.cards?.[0].card.card.text;
    //     const menuData =resInfo?.data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ;
    //     setResTitle(titleRes);
    //     setMenu(menuData)
    // },[menu,resTitle])
    // useEffect( ()=>{
    //     fetchResMenu()
    // }, [])
    // const resInfo = useRestaurantMenu(id)
    // const fetchResMenu = async ()=>{
    //     try{
    //         const dataJSON = await fetch(resMenu + id);
    //         const data= await dataJSON.json()

    //         const titleData=data.data.cards?.[0].card.card.text;
    //         setResTitle(titleData  || "no title")
    //         const menuData =data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    //         setMenu(menuData)
    //         console.log(resTitle)
    //         console.log(menu)
    //     }catch(err){
    //         console.log(err.message)
    //         setMenu([])
    //     }
    // }
  const {text} = resInfo?.data?.cards?.[0].card?.card;
  const lastIndex = resInfo?.data?.cards?.length - 1; // Get last index dynamically
const { cards } = resInfo?.data?.cards?.[lastIndex]?.groupedCard?.cardGroupMap?.REGULAR 
    
  return  (
    <div className='menuContainer'>
        <div className='resName'>
            <h1>{text}</h1>
        </div>
        <div className='menuList'>
            {cards?.map((dish, index)=>{
                if(!dish?.card?.card?.title){
                    return null;
                }
                return (
                // <div>
                // <h2>{dish?.card?.card?.title}</h2>
                // {dish?.card?.card?.itemCards.map((item)=>{
                //     return <p>{item?.card?.info?.name}</p>
                // })}
                // </div>
                <div key={dish?.card?.card?.categoryId} >
                        <h2>{dish?.card?.card?.title}</h2>
                        {/* ✅ Ensure `itemCards` exists before calling `.map()` */}
                        {dish?.card?.card?.itemCards?.length > 0 ? (
                            dish?.card?.card?.itemCards.map((item) => (
                                <p key={item?.card?.info?.id}>{item?.card?.info?.name}</p>
                            ))
                        ) : (
                            <p>No items available</p> // Handle case where `itemCards` is missing
                        )}
                    </div>
                )
            })}
            
        </div>
    </div>
  )
}

export default RestaurantsMenu
// import React, { useState, useEffect } from "react";
// import { resMenu } from "../utils/url";
// import Shimmer from "./Shimmer";

// const RestaurantsMenu = () => {
//     const [resTitle, setResTitle] = useState(null);
//     const [menu, setMenu] = useState([]); // ✅ Default to empty array

//     useEffect(() => {
//         fetchResMenu();
//     }, []);

//     const fetchResMenu = async () => {
//         try {
//             const dataJSON = await fetch(resMenu);
//             const data = await dataJSON.json();
            
//             // console.log("Fetched Data:", JSON.stringify(data, null, 2)); // Log the full response for confirmation

//             // Directly log the `cards` array
//             const cards = data?.data?.cards;
//             // console.log("Cards Array:", cards); // Directly log the cards array

//             if (cards && cards.length > 0) {
//                 const firstCard = cards[0];
//                 console.log("First Card:", firstCard); // Log the first card for verification

//                 const nestedCard = firstCard?.card?.card;
//                 console.log("Nested Card:", nestedCard); // Log the nested structure

//                 const title = nestedCard?.text || "No title found";
//                 console.log("Extracted Title:", title); // Log extracted title

//                 setResTitle(title);

//                 // Set the menu state after extracting the menu data
//                 const menuData = data?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
//                 setMenu(menuData); // Set the menu state
//             } else {
//                 console.error("Cards array is empty or missing.");
//             }

//         } catch (error) {
//             console.error("Error fetching restaurant menu:", error);
//         }
//     };

//     useEffect(() => {
//         console.log("Updated Restaurant Title in State:", resTitle);
//     }, [resTitle]); // This will log whenever `resTitle` is updated

//     return menu.length === 0 ? ( // ✅ Check `menu.length` instead of `null`
//         <Shimmer />
//     ) : (
//         <div className="menuContainer">
//             <div className="resName">{resTitle}</div>
//             <div>
//                 {menu?.map((dish, index) => {
//                     if (!dish?.card?.card?.title) return null; // ✅ Prevent rendering undefined titles
//                     return (
//                         <div key={index}>
//                             <h2>{dish.card.card.title}</h2>
//                             <h3>
//                                 {dish.card.card.itemCards?.map((item) => item?.card?.info?.name).join(", ")}
//                             </h3>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default RestaurantsMenu;
