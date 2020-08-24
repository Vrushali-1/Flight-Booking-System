import React, { Component } from "react";
import LoginService from "../services/login.service";


class Profile extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
        currentUser: LoginService.getCurrentUser()
      };
    }
    
    render() {
      const { currentUser } = this.state;
  
      if(currentUser===null){
          return null;
      }else{
      return (
        <div className="container">

         
            <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
        
          <p>
            <strong>Token:</strong>{" "}
            {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
          </p>
          <p>
            <strong>Id:</strong>{" "}
            {currentUser.user._id}
          </p>
          <p>
            <strong>Firstname:</strong>{" "}
            {currentUser.user.firstname}
          </p>
          <p>
            <strong>Lastname:</strong>{" "}
            {currentUser.user.lastname}
          </p>
          <p>
            <strong>Gender:</strong>{" "}
            {currentUser.user.gender}
          </p>
          <p>
            <strong>Username:</strong>{" "}
            {currentUser.user.username}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {currentUser.user.email}
          </p>
          <p>
            <strong>Role:</strong>
            {currentUser.user.role}
          </p>
         
        </div>
      );
      }
    }
}


  export default Profile; 