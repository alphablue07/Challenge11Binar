import { useState, useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/NavBar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image";
import logo from "./images/echamp-white.png";
import { checkDataLogin, firebaseLogout } from "../action/autentication";
import { Login } from "../pages/login.jsx";


export default function NavbarComponent() {
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const toggleModal = () => {
        setShowModal((previousValue) => !previousValue);
      };

      const handleLogout = () => {
        firebaseLogout();
      };

      useEffect(() => {
        checkDataLogin(setIsLogin);
      }, []);
    return(
        <div className="fixed-top">
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand>
                <Image
                    src={logo}
                    alt="Binar Academy"
                    width="100"
                    height="30"
                    className="d-inline-block align-top"/>{''}
                </Navbar.Brand>
               
                <Nav className="d-flex justify-content-end">
                    <Nav.Link 
                    href="/#"
                    >
                        Home
                    </Nav.Link>
                    <Nav.Link 
                    href="/#game"
                    >
                        Game
                    </Nav.Link>
                    <Nav.Link 
                    href="/#leaderboard"
                    className="nav-item">
                        Leaderboard
                    </Nav.Link>
                    {isLogin? (
                        <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                    <Nav.Link 
                    href="/profiles"
                    className="nav-item ms-auto">
                        Profile
                    </Nav.Link>
                    <Nav.Link 
                    href="#"
                    className="nav-link ms-auto"
                    onClick={() => {
                        if (window.confirm("Are you sure to Logout?")) {
                          handleLogout();
                        }
                      }}
                      >
                        LOGOUT
                    </Nav.Link>
                    </ul>
                    ):(
                    <Nav.Link 
                    href="/login"
                    onClick={toggleModal}
                    className="nav-item">
                        LOGIN
                    </Nav.Link>
                    )}

                </Nav>
                </Container>
            </Navbar>
        </div> 
    )
}