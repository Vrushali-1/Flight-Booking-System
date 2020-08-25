import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';
import LoginService from '../services/login.service';

class Navigation extends Component {
    constructor(){
        super();

        this.state={
            user:false,
            admin:false
        }
    }

    componentDidMount() {
        const user = LoginService.getCurrentUser();
    
        if(user){
            if(user.user.role==="admin"){
                this.setState({
                    user:true
                })
            }else{
                this.setState({
                    admin:true
                }) 
            }
        }
      }
    render() {
        const {user,admin}=this.state;
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/">Home</NavLink>
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/login">Login</NavLink>
                            <NavLink className="d-inline p-2 bg-dark text-white" to="/signup">Signup</NavLink>
                            {admin && (<NavLink className="d-inline p-2 bg-dark text-white" to="/admin">Admin</NavLink>)}
                            {user && (<NavLink className="d-inline p-2 bg-dark text-white" to="/user">User</NavLink>)}
                           
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;
