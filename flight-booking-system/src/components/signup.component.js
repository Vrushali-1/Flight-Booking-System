import React, { Component } from 'react';
import LoginService from '../services/login.service';
import Table from 'react-bootstrap/Table';

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
            role:'admin',
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

    onChangeRole(e){
        this.setState({
              role:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        LoginService.register(this.state.firstname,this.state.lastname,this.state.gender,this.state.email,this.state.role,this.state.username,this.state.password)
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
            <div className="body">
            <form onSubmit={this.onSubmit}>
               <Table className="table">
               <tbody>
                   <tr>
                       <td>Firstname : </td><td><input type="text" name="firstname" placeholder="Enter your firstname" value={this.state.firstname} onChange={this.onChangeFirstname.bind(this)} /></td>
                   </tr>

                   <tr>
                       <td>Lastname : </td><td><input type="text" name="lastname" placeholder="Enter your lastname"  value={this.state.lastname} onChange={this.onChangeLastname.bind(this)} /></td>
                   </tr>

                   <tr>
                       <td><label for="genders">Choose a gender:</label></td><td><select name="genders" id="genders" value={this.state.gender} onChange={this.onChangeGender.bind(this)}>
                                                                                 <option value="female">F</option>
                                                                                 <option value="male">M</option>
                                                                                 </select> 
                                                                             </td>
                   </tr>

                   <tr>
                       <td>Email : </td><td><input type="text" name="email" placeholder="Enter your email" value={this.state.email} onChange={this.onChangeEmail.bind(this)} /></td>
                   </tr>

                   <tr>
                       <td>Username : </td><td><input type="text" name="username" placeholder="Enter your username" value={this.state.username} onChange={this.onChangeUsername.bind(this)} /></td>
                   </tr>

                   <tr>
                       <td><label for="roles">Choose a role:</label></td><td><select name="roles" id="roles" value={this.state.role} onChange={this.onChangeRole.bind(this)}>
                                                                                 <option value="admin">admin</option>
                                                                                 <option value="user">user</option>
                                                                                 </select> 
                                                                             </td>
                   </tr>

                   <tr>
                       <td>Password : </td><td><input type="password" name="password" placeholder="Enter your password"  value={this.state.password} onChange={this.onChangePassword} /></td>
                   </tr>
 
                   <tr>
                       <td colSpan="2" align="center"><input type="submit" name="buttonOne" value="Signup"/></td>
                   </tr>

                   <tr>
                       <td colSpan="2" align="center">{this.state.failed}</td>
                   </tr>
                   </tbody>

               </Table>
               </form>
               
               
            </div>

              
                
            
        )
    }
}

export default Signup;
