import { useState } from 'react';
import "./IssueForm.css";
import axios from 'axios';
import { useUser } from "../context/UserContext.jsx";
import { useAuthContext } from "../hooks/UseAuthContext.js";

function IssueForm() {
    const {user} = useAuthContext()
    const {user_details} = useUser()
    const [formData, setFormData] = useState({
        issueHeading: '',
        issueBody: '',
        tags: []
    });



    const handleInputChange = (e) => {
        console.log(formData)
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleTagChange = (e) => {
        console.log(formData)
        const { value, checked } = e.target;
        setFormData(prevState => {
            if (checked) {
                return { ...prevState, tags: [...prevState.tags, value] };
            } else {
                return { ...prevState, tags: prevState.tags.filter(tag => tag !== value) };
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const issueData = {
            issueWard: user_details.ward,
            issueHeading: formData.issueHeading,
            issueBody: formData.issueBody,
            tags: formData.tags
        };
        try {
            console.log(issueData)
            const response = await axios.post('http://localhost:5000/createIssue', issueData,{
                headers: {
                    'Authorization':`Bearer ${user.user}`
                }
            });
            if (response.ok) {
                console.log('Form submitted successfully');
            } else {
                console.error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Issue Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="issue-heading">Issue Heading</label>
                    <input 
                        className="form-input" 
                        type="text" 
                        id="issue-heading" 
                        name="issueHeading"
                        value={formData.issueHeading}
                        onChange={handleInputChange}
                        placeholder="Enter a brief title for your issue" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="issue-body">Issue Description</label>
                    <textarea 
                        className="form-textarea" 
                        id="issue-body" 
                        name="issueBody"
                        value={formData.issueBody}
                        onChange={handleInputChange}
                        placeholder="Describe your issue in detail" 
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label className="form-label">Tags</label>
                    <div className="checkbox-group">
                        {['Electricity', 'Water Supply', 'Sewage', 'Infrastructure'].map((tag) => (
                            <div className="checkbox-option" key={tag}>
                                <input 
                                    className="checkbox-input" 
                                    type="checkbox" 
                                    id={tag} 
                                    name="tags" 
                                    value={tag}
                                    checked={formData.tags.includes(tag)}
                                    onChange={handleTagChange}
                                />
                                <label className="checkbox-label" htmlFor={tag}>{tag.charAt(0).toUpperCase() + tag.slice(1)}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <button className="submit-button" type="submit">Submit Issue</button>
            </form>
        </div>
    );
}

export default IssueForm;