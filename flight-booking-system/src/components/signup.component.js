import React, { Component } from 'react';
import LoginService from '../services/login.service';
import Person from '@material-ui/icons/Person';

export class Signup extends Component {

    constructor(props){
        super(props);

        this.onSubmit=this.onSubmit.bind(this);
        //this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangePassword=this.onChangePassword.bind(this);
        //this.onChangeUsername=this.onChangeUsername.bind(this);
       // this.onChangeFirstname=this.onChangeFirstname(this);
      //  this.onChangeLastname=this.onChangeLastname(this);
        //this.onChangeGender=this.onChangeGender(this);
        //this.onChangeRole=this.onChangeUsername(this); 
         
         
         this.state={
            firstname:'',
            lastname:'',
            gender:'female', 
            email:'',
            username:'',
            password:'',
            failed:''
            
         }
    }


    onChangeEmail(e){
        this.setState({
              email:e.target.value
        });
    }

    onChangeFirstname(e){
        this.setState({
              firstname:e.target.value
        });
    }

    onChangeLastname(e){
        this.setState({
              lastname:e.target.value
        });
    }

    onChangeGender(e){
        this.setState({
              gender:e.target.value
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
                    <input type="text" className="form-control" placeholder="First name" value={this.state.firstname} onChange={this.onChangeFirstname.bind(this)}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" value={this.state.lastname} onChange={this.onChangeLastname.bind(this)}/>
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
                    <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail.bind(this)} />
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter Username" value={this.state.username} onChange={this.onChangeUsername.bind(this)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.onChangePassword.bind(this)} />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
            </div>      
                
            
        )
    }
}

export default Signup;
