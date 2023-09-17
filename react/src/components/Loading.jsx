import { ClipLoader } from "react-spinners";

function Loading() {
    return (
        <div className="loading-container">
            <ClipLoader size={30} color={"#C62D42"} loading={true} />
        </div>
    );
}

export default Loading;