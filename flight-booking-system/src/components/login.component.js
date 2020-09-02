import React, { Component } from 'react';
import LoginService from '../services/login.service';
import './login.component.css';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';


class Login extends Component {

    constructor(props){
        super(props);
         this.onSubmit=this.onSubmit.bind(this);
         this.onChangePassword=this.onChangePassword.bind(this);
         this.onChangeUsername=this.onChangeUsername.bind(this);
         this.onChangeRole=this.onChangeRole.bind(this);
        // this.clicked=this.clicked.bind(this);
         
         this.state={
             username:'',
             password:'',
             role:'user',
             failed:'',
             users:[]
         }
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
        console.log(this.state.role);
        LoginService.login(this.state.username,this.state.password,this.state.role)
                     .then( (data) => {
                         console.log(data);
                         if(data.role==='user'){
                         this.props.history.push('/user')
                         window.location.reload();
                         }else{
                            this.props.history.push('/admin')
                            window.location.reload();   
                         }
                     }) 
                     .catch((err) => {
                         this.setState({
                             failed:"Username or password does not match"
                         })
                         console.log(err);
                     });
    }

    render() {
        return (
            <div className="body">
            <form className="form" onSubmit={this.onSubmit} >
                <br/>
                <div className="account">
                    <AccountCircle style={{fontSize:100}}/>
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="textbox" className="form-control" value={this.state.username} onChange={this.onChangeUsername} placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label for="roles">Choose a role</label><br/>
                    <select className="form-control" name="roles" id="roles" value={this.state.role} onChange={this.onChangeRole}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select> 
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
               
               
            </div>
        )
     
    }

}


export default Login;


const MainCOntainer=styled.div`


   display:flex;
    justify-content: center;
    align-items: center;

h1,h2,h3,h4,h5,h6,label,span {
  font-weight: 500;
  font-family: 'Fira Sans', sans-serif;
}


.form{
    
    width: 600px;
    margin-top:30px;
    margin-bottom: 100px;
   
}


.account{
  text-align: center;
}


.custom-control-label {
  font-weight: 400;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}`;