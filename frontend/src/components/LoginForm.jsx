import { useState } from "react";
import "./LoginForm.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/UseAuthContext.js";
import { useUser } from "../context/UserContext.jsx";

function LoginForm() {
    
    const { updateUser } = useUser();
    const {  dispatch } = useAuthContext()
    let navigate = useNavigate()

    const [user_form, setUser] = useState({
        voterID: "",
        password: ""
    })

    const [error, setError] = useState("")

    const [hover1, setHover1] = useState(false);

    function ishover1() {
        setHover1(true);
    }
    function isnothover1() {
        setHover1(false);
    }

    const handleUpdateUser = (response) => {
        console.log("Updating user details");
        let a = response.data.result[0]
        const newUser = {
            adhaar: a.aadhar,
            email: a.email,
            name: a.name,
            phoneNumber: a.phno,
            totalWards: response.data.wards,
            upvotedIssues: a.upvotes,
            voterID: a.voterID,
            ward: a.ward,
        };
        console.log("New user details:", newUser);
        updateUser(newUser);
    }

    async function handleSubmit(event) {
        event.preventDefault(); 
        const {voterID, password} = user_form;
        user_form.voterID = "NJK9999999"
        user_form.password = "NJK9999999"
        if (!voterID || !password) {
          setError("Please fill in all fields.");
          return;                                                                                                                                                                                                                                                                                                                                                                                                               
        }
    
        try {
          const response = await axios.post("http://localhost:5000/login", user_form);
          console.log(response)  
          if (response.data.token) {
            localStorage.setItem("token",response.data.token)
            dispatch({type:'LOGIN',payload:response.data.token})
            handleUpdateUser(response)
            navigate("/home");
          } else {
            setError("Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error logging in user:", error);
          setError("Login failed. Please try again.");
        }
    }   

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center">
            <h3 className="login-h3">Welcome to</h3>
            <h1 className="login-h1">DigiComplaint</h1>
            <form onSubmit={handleSubmit} className="login-form d-flex flex-column justify-content-center align-items-center">
                <input
                    required
                    autoComplete="off"
                    className="login-input d-block my-2 p-2"
                    onChange={handleChange}
                    type="text"
                    name="voterID"
                    placeholder="Voter ID"
                    value={user_form.voterID}
                />
                <input
                    required
                    autoComplete="off"
                    type="password"
                    name="password"
                    className="login-input d-block my-2 p-2"
                    placeholder="Password"
                    onChange={handleChange}
                    value={user_form.password}
                />
                <Button
                    style={hover1 ? {
                        color: "rgb(37, 190, 255)",
                        backgroundColor: "white",
                        borderColor: "rgb(37, 190, 255)",
                        fontFamily: "Poppins",
                        fontWeight: "700",
                        fontStyle: "normal",
                        fontSize: "0.9rem",
                        padding: "0"
                    } : {
                        color: "white",
                        backgroundColor: "rgb(37, 190, 255)",
                        borderColor: "rgb(37, 190, 255)",
                        fontFamily: "Poppins",
                        fontWeight: "700",
                        fontStyle: "normal",
                        fontSize: "0.9rem",
                        padding: "0"
                    }}
                    type="submit"
                    onMouseEnter={ishover1}
                    onMouseLeave={isnothover1}
                    className='login-btn d-block mx-3 my-2 py-1 px-3'
                    variant="primary"
                >
                    Login
                </Button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default LoginForm;