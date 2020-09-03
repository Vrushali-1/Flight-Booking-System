import React, { Component } from 'react';
import LoginService from '../services/login.service';
import Person from '@material-ui/icons/Person';
import FormErrors from './formerrors.component';

export class Signup extends Component {

    constructor(props){
        super(props);

        this.onSubmit=this.onSubmit.bind(this);
        this.handleUserInput=this.handleUserInput.bind(this);
         
         
         this.state={
            firstname:'',
            lastname:'',
            gender:'female', 
            email:'',
            username:'',
            password:'',
            failed:'',
            formErrors: {email: '', password: '',username:'',firstname:'',lastname:''},
            emailValid: false,
            passwordValid:false,
            usernameValid:false,
            firstnameValid:false,
            lastnameValid:false,
            formValid:false
            
         }
    }


    onChangeGender(e){
        this.setState({
            gender:e.tagert.value
        })
    }
    
    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},() => { this.validateField(name, value)});
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let usernameValid=this.state.usernameValid;
        let firstnameValid=this.state.firstname;
        let lastnameValid=this.state.lastname;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : 'email is invalid';
            break;
          case 'password':
              passwordValid=value.length>=6;
              fieldValidationErrors.password=passwordValid ? '' : 'password is invalid';
              break;
          case 'username':
                usernameValid=value.match(/^[a-zA-Z0-9]+$/);
                fieldValidationErrors.username=usernameValid ? '' : 'username is invalid';
                 break;
          case 'firstname':
                firstnameValid=value.match(/^[a-zA-Z\-]+$/);
                fieldValidationErrors.firstname=firstnameValid ? '' : 'firstname is invalid';
                break;
         case 'lastname':
                lastnameValid=value.match(/^[a-zA-Z\-]+$/);
                fieldValidationErrors.lastname=lastnameValid ? '' : 'lastname is invalid';
                break;      
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid:passwordValid,
                        usernameValid:usernameValid,
                        firstnameValid:firstnameValid,
                        lastnameValid:lastnameValid
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid && this.state.firstnameValid && this.state.lastnameValid});
    }


    onSubmit(e){
        e.preventDefault();
        LoginService.register(this.state.firstname,this.state.lastname,this.state.gender,this.state.email,this.state.username,this.state.password)
                     .then( (data) => {
                         console.log(data);
                            this.props.history.push('/login');  
                     }) 
                     .catch((err) => {
                         this.setState({
                             failed:"User exists!"
                         })
                         console.log(err);
                     });
    }

    render() {
        return (
           <div style={{display:"flex",
            justifyContent : "center",
            alignItems: "center",
            marginBottom: "100px"}}>
            <form className="form" onSubmit={this.onSubmit}>
                 <div style={{textAlign: "center",
                           marginTtop: "0px"}}>
                <Person  style={{fontSize:100}}/>
                </div>
                    

                <div className="form-group">
                    <label>First name</label> 
                    <input type="text" className="form-control" placeholder="First name" name="firstname" value={this.state.firstname} onChange={(event) => this.handleUserInput(event)}/>
                    {this.state.formErrors.firstname.length > 0 &&  
                     <span style={{color:"red"}}>{this.state.formErrors.firstname}</span>}
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="lastname" value={this.state.lastname} onChange={(event) => this.handleUserInput(event)}/>
                    {this.state.formErrors.lastname.length > 0 &&  
                     <span style={{color:"red"}}>{this.state.formErrors.lastname}</span>}
                </div>

                <div className="form-group">
                    <label for="genders">Choose a gender</label><br/>
                    <select className="form-control" name="genders" id="genders" value={this.state.gender} onChange={this.onChangeGender.bind(this)}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select> 
                </div>
       
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={this.state.email} onChange={(event) => this.handleUserInput(event)} />
                    {this.state.formErrors.email.length > 0 &&  
                     <span style={{color:"red"}}>{this.state.formErrors.email}</span>}
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter Username" name="username" value={this.state.username} onChange={(event) => this.handleUserInput(event)} />
                    {this.state.formErrors.username.length > 0 &&  
                     <span style={{color:"red"}}>{this.state.formErrors.username}</span>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.password}  onChange={(event) => this.handleUserInput(event)} />
                    {this.state.formErrors.password.length > 0 &&  
                     <span style={{color:"red"}}>{this.state.formErrors.password}</span>}
                </div>

                <button type="submit" className="btn btn-primary btn-block" disabled={!this.state.formValid}>Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
            </div>      
                
            
        )
    }
}

export default Signup;
