import  { createContext, useContext, useState } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [user_details, setUserDetails] = useState({
    voterId: '',
    upvotedIssues: [],
    ward: '',
    totalWards: [],
    name: '',
    email: '',
    adhaar: '',
    phoneNumber: '',
  });

  // Function to update user information
  const updateUser = (newUserData) => {
    setUserDetails((prevUser) => ({ ...prevUser, ...newUserData }));
  };

  // Function to add an upvoted issue
  const addUpvotedIssue = (issueId) => {
    setUserDetails((prevUser) => ({
      ...prevUser,
      upvotedIssues: [...prevUser.upvotedIssues, issueId],
    }));
  };

  // Function to remove an upvoted issue
  const removeUpvotedIssue = (issueId) => {
    setUserDetails((prevUser) => ({
      ...prevUser,
      upvotedIssues: prevUser.upvotedIssues.filter((id) => id !== issueId),
    }));
  };

  return (
    <UserContext.Provider value={{ user_details, updateUser, addUpvotedIssue, removeUpvotedIssue }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};  