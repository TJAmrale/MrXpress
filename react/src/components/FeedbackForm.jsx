import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Popup({user, jobId, onClose}) {
    const [number, setNumber] = useState(0);
    const [StarHover, setStarHover] = useState(undefined);


    const starStyle = {
        fontSize: "2rem", //star size
        color: "gold",
      };

    const handleSubmit = () => {

        toast.success("Review Submitted");
        onClose();
        
    }
  return (
    <div className="FeedbackForm">
      <div className="popup">
        <div className="formcontent">
          <div className="rating">
            {user.access_level && user.access_level.toString() === '2' && <h1>Rate the Customer</h1>}
            {user.access_level && user.access_level.toString() === '3' && <h1>Rate the Technician</h1>}
            <h3>Job ID:{jobId}</h3>
          </div>
          <div>
            {Array(5)
                .fill()
                .map((_, index) => {
                return number >= index + 1 || StarHover>= index+1? (
                    <AiFillStar
                    style={starStyle}
                    onMouseOver={()=>setStarHover(index+1)}
                    onMouseLeave={()=>setStarHover(undefined)}
                    onClick={()=>setNumber(index+1)} />
                ) : (
                    <AiOutlineStar 
                    style={starStyle}
                    onMouseOver={()=>setStarHover(index+1)}
                    onMouseLeave={()=>setStarHover(undefined)}
                    onClick={()=>setNumber(index+1)} />
                );
                })}
          </div>
          <textarea className="feedbackarea" placeholder="Comments"></textarea>
            
        
          <button id="ratingButton" className="btn btn-primary mt-4 full-width" 
          type="submit"
          onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}