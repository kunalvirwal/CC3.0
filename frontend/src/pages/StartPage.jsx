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
        <h1 className="str-head">DigiComplaint</h1>
        <p className="str-p"><span className="str-span">AI</span> powered <span className="str-span">Complaint Forum</span></p>
        <div>
          <Button onClick={routeChanger1}
            onMouseEnter={ishover1}
            onMouseLeave={isnothover1}
            style={hover1 ? {
                
              color: "rgb(37, 190, 255)",
              backgroundColor: "white",
              borderColor: "rgb(37, 190, 255)",
              fontFamily: "Poppins",
              fontWeight: "700",
              fontStyle: "normal",
              fontSize: "0.9rem",
              padding:"0"
            } : {
              color: "white",
              backgroundColor: "rgb(37, 190, 255)",
              borderColor: "rgb(37, 190, 255)",
              fontFamily: "Poppins",
              fontWeight: "700",
              fontStyle: "normal",
              fontSize: "0.9rem",
              padding:"0"
            }}
            variant="primary"
            className="btn-startpage1 mx-3 my-0 py-1 px-3"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
