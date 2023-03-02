import { Component } from "react";
import { authFirebase } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { checkDataLogin, firebaseLogout } from "../../action/autentication";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Link from 'next/link'


import logo from '../images/echamp.png';
import loginPict from '../images/login-image.png';
import { connect } from 'react-redux'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleLogin = () => {
    signInWithEmailAndPassword(authFirebase, this.state.email, this.state.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        if(!user.emailVerified){
          alert("Akun ini belum verifikasi email")
          // firebaseLogout()
        }else{
          localStorage.setItem('jwt-token', user.accessToken)
          localStorage.setItem('UID', user.uid)
          window.location.href = '/'
        }
        // console.log(user.uid)
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      });
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render() {
    console.log("data authfirebase :", authFirebase)
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.toggleFunc}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Body className="show-grid modal_body" style={{border: "none", padding: "0",borderRadius: "100px"}}>
          <Container style={{paddingRight: "10px",paddingLeft: "0"}}>
            <Row>
              <Col md={6} className={style.rowleft} style={style.rowleft}>
              </Col>
              <Col md={6} style={style.rowright}>
              <div>
                  <img src={logo.src}  style={style.logoimage} />
              </div>
                <div className="form_login" style={{width: "90%",paddingTop: "20%"}}>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        id="email"
                        onChange={this.handleOnChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={this.handleOnChange} />
                    </Form.Group>
                    <div className="d-grid gap-2 pb-2">
                      <Button variant="primary" onClick={this.handleLogin}>
                        LOGIN
                      </Button>
                    </div>
                  </Form>
                </div>
                <div className="lupa_pass" style={{paddingBottom: "20%",textDecoration: "none"}}>
                  <span>Lupa password? klik&nbsp;<a href="#">disini</a></span>
                </div>
                <div >
                  <span>Belum punya akun?&nbsp;<Link href="/register">Buat akun</Link>&nbsp;baru</span>
                  <p>Login Name {this.props.userName}</p>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    )
  }
}

var style = {
  rowleft: {
    backgroundImage: `url(${loginPict.src})`,
    maxWidth: "430px",
    height: "553px",
    display: "flex",
    justifyContent: "left",
    backgroundColor: "#1e1e1e",
    backgroundRepeat: "no-repeat",
  },
  rowright: {
    maxWidth: "430px",
    maxHeight: "553px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logoimage: {
      maxWidth: "216px",
      maxHeight: "54px"
  }
}

const reduxState = (state) => ({
  userName: state.user
})

export default Login