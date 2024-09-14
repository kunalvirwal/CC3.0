import { BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage"
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import RoutesD from "./Routes"

// import React from "react"
function App() {
  // const [count, setCount] = useState(0)

  return (
    // <RoutesD/>
    <BrowserRouter>
     <HomePage/>
    </BrowserRouter>
   
  )
}

export default App
