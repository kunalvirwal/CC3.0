import "./IssueForm.css"
function IssuehtmlForm(){
    return(
<div className="form-container">
        <h2 className="form-title">Issue Report</h2>
        <form>
            <div className="form-group">
                <label className="form-label" htmlFor="issue-heading">Issue Heading</label>
                <input className="form-input" type="text" id="issue-heading" placeholder="Enter a brief title for your issue" required />
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="issue-body">Issue Description</label>
                <textarea className="form-textarea" id="issue-body" placeholder="Describe your issue in detail" required></textarea>
            </div>
            <div className="form-group">
                <label className="form-label">Department</label>
                <div className="radio-group">
                    <div className="radio-option">
                        <input className="radio-input" type="radio" id="electricity" name="department" value="electricity" required />
                        <label className="radio-label" htmlFor="electricity">Electricity</label>
                    </div>
                    <div className="radio-option">
                        <input className="radio-input" type="radio" id="water-supply" name="department" value="water-supply" />
                        <label className="radio-label" htmlFor="water-supply">Water Supply</label>
                    </div>
                    <div className="radio-option">
                        <input className="radio-input" type="radio" id="sewage" name="department" value="sewage" />
                        <label className="radio-label" htmlFor="sewage">Sewage</label>
                    </div>
                    <div className="radio-option">
                        <input className="radio-input" type="radio" id="other" name="department" value="other" />
                        <label className="radio-label" htmlFor="other">Other PWD</label>
                    </div>
                </div>
            </div>
            <button className="submit-button" type="submit">Submit Issue</button>
        </form>
    </div>)
}

export default IssuehtmlForm