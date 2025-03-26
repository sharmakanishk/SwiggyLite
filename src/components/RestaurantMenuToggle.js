import React, {useState} from 'react'

const RestaurantMenuToggle = ({dish,index, showBlock, showItems, setMenuVisibility}) => {
     
     const handleClick = ()=>{
        showBlock(index);
        setMenuVisibility()
    }
    const arr = dish?.card?.card?.itemCards || dish?.card?.card?.categories?.flatMap((category)=>category.itemCards) || [];
     return (
        <div  className='w-6/12 m-auto'>
            <div className='flex justify-between m-1 p-6 bg-gray-300 rounded-md ' onClick={handleClick}>
              
                <span className='font-bold'>{dish?.card?.card?.title + "("+ arr.length+")"}</span>
                <span>⬇️</span>
            </div>
            {showItems && <div >
                 {/* ✅ Ensure `itemCards` exists before calling `.map()` */}
                 { dish?.card?.card["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"? (
                    dish?.card?.card?.itemCards.map((item) => (
                        <div key={item?.card?.info?.id} className='bg-gray-200 m-1 p-4 rounded-md border-b border-gray-600'>
                            <p className='mx-2 my-0.5 text-gray-600 font-bold'>{item?.card?.info?.name}</p>
                            <p className='mx-2 my-0.5 text-gray-600 font-bold'> ₹ {(item?.card?.info?.price!==undefined ? item?.card?.info?.price /100 : item?.card?.info?.defaultPrice /100)}</p>
                            <p className='text-xs text-gray-500 mx-2 my-0.5'>{item?.card?.info?.description}</p>
                        </div>
                    ))
                ) : (
                    dish?.card?.card?.categories?.map((element)=>(
                        element?.itemCards.map((item) => (
                         
                            <div key={item?.card?.info?.id} className='bg-gray-200 m-1 p-4 rounded-md border-b border-gray-600'>
                                <p className='mx-2 my-0.5 text-gray-600 font-bold'>{item?.card?.info?.name}</p>
                                <p className='mx-2 my-0.5 text-gray-600 font-bold'> ₹ {(item?.card?.info?.price!==undefined ? item?.card?.info?.price /100 : item?.card?.info?.defaultPrice /100)}</p>
                                <p className='text-xs text-gray-500 mx-2 my-0.5'>{item?.card?.info?.description}</p>
                            </div>
                        ))
                    ))
                )
               
                }
                
            </div>}
               
            </div>
        )
}

export default RestaurantMenuToggle
