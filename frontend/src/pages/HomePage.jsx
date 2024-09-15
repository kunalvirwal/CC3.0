import IssueForm from "../components/IssueForm.jsx";
import IssueTile from "../components/IssueTile.jsx";
import NavBar from "../components/NavBar.jsx";
import "./HomePage.css"
function HomePage(){
    // const {user} = useAuthContext();
    // const navigate = useNavigate();
    // const logout = useLogout()

    // const handleClick = () => {
    //   logout()
    //   navigate("/")
    // }
    return(     
        <div className="body_div" >
            <div className="issues">
            <IssueTile/>
            </div>
            <div className="issue_form"><IssueForm/></div>
            <NavBar/>
        </div>
    )
}
export default HomePage