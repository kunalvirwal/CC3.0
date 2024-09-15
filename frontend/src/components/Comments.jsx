import "./Comments.css"

function Comment(){
    return(<div className="comment-tile">
    <div className="comment-content">
        <p className="comment-text">The water supply issue has been escalated to the maintenance team. They are working on resolving it as quickly as possible.</p>
        <div className="comment-meta">
            <span className="comment-sender">user123</span>
            <span className="comment-time">2 hours ago</span>
        </div>
    </div>
</div>)
}
export default Comment