import { useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css"; // Assuming your custom styles are in App.css
import { useNavigate } from "react-router-dom";
function StartPage() {
  const [hover1, setHover1] = useState(false);
//   const [hover2, setHover2] = useState(false);
  const navigate= useNavigate()
  const routeChanger1=()=>{
    navigate("/login")
  } 
//   const routeChanger2=()=>{
//     navigate("/register")
//   } 
  function ishover1() {
    setHover1(true);
  }
  function isnothover1() {
    setHover1(false);
  }

  return (
    <div className="d-flex justify-content-center align-items-center text-center min-vh-100">
      <div className="strpage-box"> {/* Apply custom styles here if needed */}
        <h1 className="str-head">Doubtify</h1>
        <p className="str-p">Your personal <span className="str-span">Doubts-Archiver</span></p>
        <div>
          <Button onClick={routeChanger1}
            onMouseEnter={ishover1}
            onMouseLeave={isnothover1}
            style={hover1 ? {
                
              color: "rgb(113,44,249)",
              backgroundColor: "white",
              borderColor: "rgb(113, 44, 249)",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontStyle: "normal",
              fontSize: "1.1rem"
            } : {
              color: "white",
              backgroundColor: "rgb(113, 44, 249)",
              borderColor: "rgb(113, 44, 249)",
              fontFamily: "Poppins",
              fontWeight: "400",
              fontStyle: "normal",
              fontSize: "1.1rem"
            }}
            variant="primary"
            className="btn-startpage1 mx-2 my-3 py-2 px-5"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
