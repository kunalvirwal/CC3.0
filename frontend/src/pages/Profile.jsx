import { useUser } from "../context/UserContext"
import IssueTile from "../components/IssueTile"
import { Link } from "react-router-dom" // Assuming you're using react-router for navigation

function Profile() {
    const { user_details } = useUser()
    return (
        <div className="profile-container">
            <header className="profile-header">
                <h1 className="profile-title">User Profile</h1>
            </header>
            
            <section className="user-details" aria-label="User Details">
                <p className="detail-item"><span className="detail-label">Name:</span> {user_details.name}</p>
                <p className="detail-item"><span className="detail-label">Email:</span> {user_details.email}</p>
                <p className="detail-item"><span className="detail-label">Phone:</span> {user_details.phoneNumber}</p>
            </section>
            
            <section className="upvoted-issues" aria-label="Upvoted Issues">
                <h2 className="upvoted-issues-title">Upvoted Issues</h2>
                {user_details.upvotedIssues.map((issue) => (
                    <IssueTile key={issue.id} issue={issue} />
                ))}
            </section>
            
            <Link to="/home" className="back-button">Back to Home</Link>
        </div>
    )
}

export default Profile