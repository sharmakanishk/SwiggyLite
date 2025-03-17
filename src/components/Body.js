
import resArray from "../utils/mockData"
import Card from "./Card";

// const Body = async ()=>{
//     let dataJSON = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&")
//     const data = await dataJSON.json()
//     let [listOfResturants, setlistOfResturants] = useState(data)
//     return (
//         <div className="body">
//             <div>
//                 <button className="btn" onClick={()=>{
//                     const filteredArray = data.filter((elem)=>{
//                         return data.cards[4].card.card.gridElements.infoWithStyle.restaurants.info.avgRating > 4.3
//                     })
//                     setlistOfResturants(filteredArray)
//                 }}>Good Resturants</button>
//             </div>
//             <div className="cardContainer">
//                 {listOfResturants.map((elem)=>{
//                  return <Card key={data.cards[4].card.card.gridElements.infoWithStyle.restaurants.info.id} res = {elem}/>
//                 })}
//             </div>
//         </div>
//     )
// }

// export default Body;

import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState([]);
    const [searchText, setsearchText] = useState("")

    // Fetch Data When Component Mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                let dataJSON = await fetch(
                    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9352403&lng=77.624532&"
                );
                const data = await dataJSON.json();

                // Extract correct restaurant list
                const restaurants = data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
                setListOfRestaurants(restaurants)
                setFilteredListOfRestaurants(restaurants);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs once
   
    return listOfRestaurants.length === 0 ? <Shimmer/>: (
        <div className="body">
            <div>
                <input className="m-auto my-2 border-solid border-e-black rounded-md invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 mx-2 p-2"
                 value={searchText} placeholder="What's on your mind?" onChange={
                    (e)=>{
                        setsearchText(e.target.value)
                    }
                }></input>
                <button className="mx-2 px-4 bg-yellow-200 py-1 rounded-md" onClick={()=>{
                    setFilteredListOfRestaurants(()=>{
                       return listOfRestaurants.filter((elem)=>(elem?.info?.name.includes(searchText)))
                    }
                )}}>Search</button>
                <button
                    className="mx-2 px-4 bg-green-200 py-1 rounded-md"
                    onClick={() => {
                        const filteredArray = listOfRestaurants.filter(
                            (elem) => elem?.info?.avgRating > 4.3
                        );
                        setFilteredListOfRestaurants(filteredArray);
                    }}
                >
                    Good Restaurants
                </button>
            </div>
            <div className="cardContainer">
                {filteredListOfRestaurants.map((elem) => (
                    <Card key={elem?.info?.id} res={elem} />
                ))}
            </div>
        </div>
    );
};

export default Body;
