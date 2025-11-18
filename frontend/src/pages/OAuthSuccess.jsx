import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token); // store JWT
      navigate("/"); // redirect to home page
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Logging in...</p>;
};

export default OAuthSuccess;
