import React, { Component } from 'react';
import "./login.component.css";
import Table from 'react-bootstrap/Table';
import LoginService from '../services/login.service';
import Profile from './profile.component';

class Login extends Component {

    constructor(props){
        super(props);
         this.onSubmit=this.onSubmit.bind(this);
         this.onChangeEmail=this.onChangeEmail.bind(this);
         this.onChangePassword=this.onChangePassword.bind(this);
         this.onChangeUsername=this.onChangeUsername.bind(this);
        // this.clicked=this.clicked.bind(this);
         
         this.state={
             email:'',
             username:'',
             password:'',
             role:'',
             failed:'',
             isLoggedIn:this.props.isLoggedIn,
             users:[]
         }
    }

    onChangeEmail(e){
        this.setState({
              email:e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
              password:e.target.value
        });
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }

    onChangeRole(e){
        this.setState({
              role:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log('hi');
        console.log(this.state.username);
        LoginService.login(this.state.username,this.state.password)
                     .then( (data) => {
                         console.log(data);
                        this.setState({
                            isLoggedIn:true
                        })

                         
                     }) 
                     .catch((err) => {
                         this.setState({
                             failed:"Username or password does not match"
                         })
                         console.log(err);
                     });
    }

    clicked(){
        LoginService.logout();
        this.setState({
            isLoggedIn:false
        });
       
        
        
    }

    render() {

     if(this.state.isLoggedIn===false){
        return (
            <div className="body">
            <form onSubmit={this.onSubmit}>
               <Table className="table">
               <tbody>
                   <tr>
                       <td>Username : </td><td><input type="text" name="username" placeholder="Enter your username" value={this.state.username} onChange={this.onChangeUsername} /></td>
                   </tr>

                   <tr>
                       <td>Password : </td><td><input type="password" name="password" placeholder="Enter your password"  value={this.state.password} onChange={this.onChangePassword} /></td>
                   </tr>

                   <tr>
                       <td colSpan="2" align="center"><input type="submit" name="buttonOne" value="Login"/></td>
                   </tr>

                   <tr>
                       <td colSpan="2" align="center">{this.state.failed}</td>
                   </tr>
                   </tbody>

               </Table>
               </form>
               
               
            </div>
        )
      }else{
          return (
                    <div>
                     <Profile/>    
                     <button onClick={this.clicked.bind(this)}>Logout</button>
                    </div>
          );
        }
    }

}


export default Login;
