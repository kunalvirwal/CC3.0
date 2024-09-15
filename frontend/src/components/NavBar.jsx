import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';
import { useLogout } from '../hooks/UseLogout.js';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/UseAuthContext.js';
import { useState } from 'react';
import axios from 'axios';

function NavBar() {
  const { user } = useAuthContext();
  const [setDoubts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [options] = useState([]);

  const handleChange = async (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    console.log("Selected value: " + value);

    try {
      const response = await axios.post("http://localhost:5000/home/filter", {
        topic: value
      }, {
        headers: {
          'Authorization': `Bearer ${user}`,
        }
      });
      console.log(response);
      setDoubts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  const logout = useLogout();

  const handleClick = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar style={{ position: "fixed", zIndex: 2, top: "0", right: "0", left: "0" }} expand="lg" className="custom-navbar py-3">
      <Container fluid>
        <Navbar.Brand className="custom-navbar-text mx-5" href="#">DigiComplaint</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex custom-navbar-text1">
            <form className="px-2">
              <select className="form-select" id="select-option" value={selectedOption} onChange={handleChange}>
                <option value="">Select a Ward</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </form>
            <Button onClick={() => {
              // props.searchFunction(doubts)
            }} className="btn-nav mr-3" variant="outline-light">Select</Button>
          </Form>

          {/* Container to hold both Profile and Logout buttons */}
          <div className="ms-auto d-flex">
            <Button className="btn-nav mx-2" variant="outline-light" onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button className="btn-nav" variant="outline-light" onClick={handleClick}>
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
