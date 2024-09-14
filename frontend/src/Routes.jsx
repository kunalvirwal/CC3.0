// import React from "react";
import { BrowserRouter as Router, Routes, Route,Navigate} from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthContext } from "./hooks/UseAuthContext.js";

function RoutesD() {
  const user = useAuthContext();
    console.log("routes mein hu")
    console.log(user.user)
    return (
      <Router>
        <Routes>
        <Route element={<StartPage />} exact path="/"></Route>
        <Route element={user.user ? <HomePage /> : <Navigate to="/login"/>} path="/home"> </Route>
        <Route element={!user.user ? <LoginPage /> : <Navigate to="/home"/>} exact path="/login"></Route>
        </Routes>
      </Router> 
  
    );
  }
  
  export default RoutesD;