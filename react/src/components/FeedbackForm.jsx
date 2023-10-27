import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../axios-client";
import { GrClose } from "react-icons/gr"


export default function Popup({ user, jobId, onClose }) {
  const [number, setNumber] = useState(0);
  const [StarHover, setStarHover] = useState(undefined);
  const [comment, setComment] = useState(""); // State to hold the typed comment

  const starStyle = {
    fontSize: "2rem", // star size
    color: "gold",
  };

  const handleSubmit = () => {
    // Determine the appropriate API route based on the user's access level
    const apiRoute =
      user.access_level && user.access_level.toString() === "2"
        ? "/storeTechnicianRating"
        : user.access_level && user.access_level.toString() === "3"
        ? "/storeCustomerRating"
        : "";
  
    if (!apiRoute) {
      console.error("Invalid access level");
      return;
    }
  
    // Send the rating and comment to the backend
    axiosClient
      .post(apiRoute, {
        jobId: jobId,
        rating: number,
        comments: comment,
      })
      .then((response) => {
        // Check the response and handle it as needed
        toast.success("Review Submitted");
        onClose();
      })
      .catch((error) => {
        console.error("Error submitting rating and comment", error);
        toast.error("Error submitting review");
      });
  };

  const handleClose = () => {
    onClose(); // Call the onClose prop to close the form
  };
  return (
    
    <div className="FeedbackForm">
      <div className="popup">
        <div className="formcontent">
          <div className="rating">
            <GrClose style={{verticalAlign: 'left'}} onClick={handleClose} />
            {user.access_level && user.access_level.toString() === "2" && (
              <h1>Rate the Customer</h1>
            )}
            {user.access_level && user.access_level.toString() === "3" && (
              <h1>Rate the Technician</h1>
            )}
            <h3>Job ID:{jobId}</h3>
          </div>
          <div>
            {Array(5)
              .fill()
              .map((_, index) => {
                return number >= index + 1 || StarHover >= index + 1 ? (
                  <AiFillStar
                    style={starStyle}
                    onMouseOver={() => setStarHover(index + 1)}
                    onMouseLeave={() => setStarHover(undefined)}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    style={starStyle}
                    onMouseOver={() => setStarHover(index + 1)}
                    onMouseLeave={() => setStarHover(undefined)}
                    onClick={() => setNumber(index + 1)}
                  />
                );
              })}
          </div>
          <textarea
            className="feedbackarea"
            placeholder="Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            id="ratingButton"
            className="btn btn-primary mt-4 full-width"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
