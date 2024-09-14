// import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import StartPage from "./pages/StartPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function RoutesD() {
    return (
      <Router>
        <Routes>
          <Route element={<StartPage />} exact path="/"></Route>
          <Route element={<LoginPage />} exact path="/login"></Route>
          <Route element={<HomePage />} exact path="/login"></Route>
        </Routes>
      </Router> 
  
    );
  }
  
  export default RoutesD;