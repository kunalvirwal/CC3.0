import "./Input.css"
function InputComment(){
    return(
        <div className="comment-input-container">
        <input 
            type="text" 
            className="comment-input" 
            placeholder="Type your comment here..." 
            aria-label="Comment input"
        />
        <button className="send-button">Send Comment</button>
    </div>
    )

}
export default InputComment