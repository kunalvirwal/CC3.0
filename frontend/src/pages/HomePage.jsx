import { useEffect, useState } from "react";
import IssueForm from "../components/IssueForm.jsx";
import IssueTile from "../components/IssueTile.jsx";
import NavBar from "../components/NavBar.jsx";
import "./HomePage.css"
import axios from "axios";
import { useUser } from "../context/UserContext.jsx";
import { useAuthContext } from "../hooks/UseAuthContext.js";


function HomePage(){
    const user = useAuthContext()
    const [setIssues] = useState([]);
    const {user_details} = useUser()

    async function getIssues(){
        try {
            console.log("token hai " + user.user)
            const response = await axios.get(`http://localhost:5000/ward/${user_details.ward}`,{headers:{
                'Authorization':`Bearer ${user.user}`
            }})
            console.log("Fetched issues:", response.data)
            setIssues(response.data)
        } catch (error) {
            console.error("Error fetching issues:", error)
        }   
    }

    useEffect(()=>{
        getIssues()
    },[])


    return(     
        <div className="body_div" >
            <div className="issues">
                <IssueTile/>
                <IssueTile/>
                <IssueTile/>
                {/* {issues.map((issue) => (
                    <IssueTile key={issue._id} issue={issue} />
                ))} */}
            </div>
            <div className="issue_form"><IssueForm/></div>
            <NavBar setIssues={setIssues} />
        </div>
    )
}
export default HomePage