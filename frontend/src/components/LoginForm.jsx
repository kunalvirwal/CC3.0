import  { useState } from "react";
import "./LoginForm.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from "axios"
import { useNavigate} from "react-router-dom";
import { useAuthContext } from "../hooks/UseAuthContext.js";


function LoginForm() {
    const {dispatch} = useAuthContext
    let navigate = useNavigate()

    const [user, setUser] = useState({
        voterId: "",
        password: ""
    })

    const [setError] = useState("")

    async function handleSubmit(event) {
        event.preventDefault(); 
    
        const {voterId, password} = user;
    
        if (!voterId || !password) {
          setError("Please fill in all fields.");
          return;
        }
    
        try {
            
          const response = await axios.post("http://localhost:5000/login", user);
          console.log(response)  
          if (response.data.auth) {
            localStorage.setItem("token",response.data.token)
            dispatch({type:'LOGIN',payload:response.data})
            navigate("/home");
          } else {
            setError("Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error logging in user:", error);
          setError("Login failed. Please try again.");
        }
      }

    const [hover1, setHover1] = useState(false);

    function ishover1() {
        setHover1(true);
    }
    function isnothover1() {
        setHover1(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUser((prevValue) => {
            if (name === "voterId") {
                return {
                    voterId: value,
                    password: prevValue.password
                }
            }
            else if (name === "password") {
                return {
                    voterId: prevValue.voterId,
                    password: value
                }
            }
        })
    }
    return <div className="container d-flex flex-column justify-content-center align-items-center">
        <h3 className="login-h3">
            Welcome to
        </h3>
        <h1 className="login-h1">DigiComplaint</h1>
        <form action="/home" className="login-form d-flex flex-column justify-content-center align-items-center">

            <input required autoComplete="off" className="login-input d-block my-2 p-2"
                onChange={handleChange}
                type="email"
                name="voterId"
                placeholder="Voter ID"
                value={user.voterId}
            />
            <input required autoComplete="off" type="password" name="password" className="login-input d-block my-2 p-2"
                placeholder="Password" onChange={handleChange} value={user.password} />
            <Button style={hover1 ? {
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
            }} type="submit" onClick={handleSubmit} onMouseEnter={ishover1} onMouseLeave={isnothover1} className='login-btn d-block mx-3 my-2 py-1 px-3' variant="primary">Login</Button>

        </form>
    </div>
}

export default LoginForm