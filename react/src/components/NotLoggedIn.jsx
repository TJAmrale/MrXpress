import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotLoggedIn() {
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
      <h1 className="unauthorized-title"><b>Not Logged In</b></h1>
      <p className="unauthorized-countdown">
        You need to be logged in to view this page. Redirecting to homepage 
        <span> {countdown}</span> seconds.
      </p>
    </div>
  );
}

export default NotLoggedIn;
