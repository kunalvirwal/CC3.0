import "./IssueTile.css"

function IssueTile(){
    return(
        <div className="issue-tile">
        <div className="issue-header">
            <h2 className="issue-title">Water Supply Interruption in Block A</h2>
            <div className="upvote-section">
                <span className="upvote-count">42</span>
                <button className="upvote-button">Upvote</button>
            </div>
        </div>
        <p className="issue-body">There has been no water supply in Block A for the past 3 hours. This is causing significant inconvenience to the residents. We request immediate attention to this matter.</p>
        <div className="action-buttons">
        <button className="action-button comment-button">Comments</button>
            <button className="action-button complete-button" disabled>Completed</button>
            
        </div>
    </div>
    )
}

export default IssueTile