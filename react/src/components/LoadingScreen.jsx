import { Ellipsis } from "react-awesome-spinners";
// https://github.com/tienpham94/react-awesome-spinners

function LoadingScreen() {
    return (
        <div className="loading-screen">
            <Ellipsis color={"#C62D42"}/>
        </div>
    );
}

export default LoadingScreen;