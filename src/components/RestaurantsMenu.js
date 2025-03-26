import React, { useState, useEffect } from 'react'
import { resMenu } from '../utils/url'
import Shimmer from './Shimmer'
import useRestaurantMenu from '../utils/useRestaurantMenu'
import { useParams } from 'react-router-dom'
import RestaurantMenuToggle from './RestaurantMenuToggle'

const RestaurantsMenu = () => {
    const [showMenu, setShowMenu] = useState(true)
    const [showIndex, setShowIndex] = useState(null)
    const {id} = useParams();
    const resInfo = useRestaurantMenu(id);
    if(resInfo === null) return <Shimmer/>
    const {text} = resInfo?.data?.cards?.[0].card?.card;
    const lastIndex = resInfo?.data?.cards?.length - 1; // Get last index dynamically
    const { cards } = resInfo?.data?.cards?.[lastIndex]?.groupedCard?.cardGroupMap?.REGULAR 


    
  return  (
    <div className='m-4'>
        <div className='text-center'>
            <h1 className='font-bold'>{text}</h1>
        </div>
        <div className='menuList'>
            {cards?.map((dish, index)=>{
                if((dish?.card?.card["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory" 
                     || dish?.card?.card["@type"] ==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory")){
               return(
                <RestaurantMenuToggle key={dish?.card?.card?.categoryId} 
                dish={dish}
                index={index}
                showBlock={(index)=>setShowIndex(index)}
                showItems={showIndex===index && showMenu}
                setMenuVisibility={()=>{
                    if(index===showIndex)
                        setShowMenu(!showMenu)
                    else
                        setShowMenu(true)
                }}  
                />
               )
            }
            else{
                return null;
            }
            })}
            
        </div>
    </div>
  )
}

export default RestaurantsMenu;
