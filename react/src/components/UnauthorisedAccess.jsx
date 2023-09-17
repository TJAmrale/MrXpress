import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UnauthorizedAccess() {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            navigate("/");
        }
    }, [countdown, navigate]);

    return (
        <div className="unauthorized-container">
            <h1 className="unauthorized-title"><b>Unauthorized Access</b></h1>
            <p className="unauthorized-countdown">
                You do not have the required permissions to view this page. 
                You will be redirected to the homepage in 
                <span> {countdown}</span> seconds.
            </p>
        </div>
    );
}

export default UnauthorizedAccess;
