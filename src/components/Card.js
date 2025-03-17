import { altImage, baseUrl } from "../utils/url";
import { Link } from "react-router-dom";

const Card = (props)=>{
    const {name, cuisines, avgRating, sla, cloudinaryImageId, id} = props.res.info;
    return (
        <div className=" inline-flex">
            <Link to={"/restaurants/"+id}><div className="bg-gray-100 m-1 p-4 rounded-md hover:bg-gray-200 w-56 h-96">
                <div>
                    <img className="w-56 h-48 rounded-md " src={baseUrl + cloudinaryImageId} 
                    alt={altImage}
                    onError={(e)=>e.target.source=altImage}></img>
                </div>
                <div className="cardDetails">
                    <h4 className="font-bold my-1">{name}</h4>
                    <h5>{cuisines.join(", ")}</h5>
                    <h5 className="font-semibold">{avgRating + " stars"}</h5>
                    <h5>{sla.deliveryTime + " mins"}</h5>
                </div>
            </div></Link>
        </div>
        
    )
}

export default Card;