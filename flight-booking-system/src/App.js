import React,{ Component }from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route,NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header.component';
import Login from './components/login.component';
import Home from './components/home.component'
import Signup from './components/signup.component';
import User from './components/user.component';
import Admin from './components/admin.component';
import Profile from './components/profile.component';
import LoginService from './services/login.service';
import styled from 'styled-components';
import logo from './images/Logo......png';
import Dropdown from 'react-bootstrap/Dropdown';
import Booking from './components/booking.component';
import PDF from './components/pdf.component';
import HomeIcon from '@material-ui/icons/Home';
import FaceIcon from '@material-ui/icons/Face';

class App extends Component {
  
constructor(props) {
    super();
    this.logout = this.logout.bind(this);
    this.profile=this.profile.bind(this);

    this.state = {
      showAdminPage: false,
      currentUser: undefined,
      showUserPage:false
    };
}

componentDidMount() {

    console.log('componentDidMound Called!!!!!');
    const user = LoginService.getCurrentUser();

    if (user) {
      if(user.user.role==='user'){
        this.setState({
          showUserPage:true
        })
      }
      this.setState({
          
        currentUser: LoginService.getCurrentUser(),
        showAdminPage: user.user.email.includes("vrushalipatil773@gmail.com")

     })
      
    }
}

logout() {
    LoginService.logout();
    this.props.history.push('/home');
    window.location.reload();
}

profile(){
  this.props.history.push('/profile');
  window.location.reload();
}


  render(){

  const { currentUser, showAdminPage , showUserPage} = this.state;
   return (
   <Router>
    <Header/>
   <Navbar>
            <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="#"><img style={{width:'50px'}} src={logo} alt="fly high" /> </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
                <NavLink className="nav-link" to="/home">{<HomeIcon style={{fontSize:"40"}} />}</NavLink>
            </li>
    
      
             </ul>
    
            </div>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
            {showAdminPage && (
                  <li className="nav-item">
                    <NavLink to={"/admin"} className="nav-link">
                      Admin Dashboard
                    </NavLink>
                  </li>
                  
                )
            }

            {showUserPage && (
                  <li className="nav-item">
                    <NavLink to={"/user"} className="nav-link">
                      User Dashboard
                    </NavLink>
                  </li>
                  
                )
            }

                {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    
                    <li className="nav-item">
                    <Dropdown simple={true} text="dropdown" >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                       {<FaceIcon />}
                     </Dropdown.Toggle>
                      <Dropdown.Menu>
                      <Dropdown.Item href="/profile" onClick={this.profile}>Profile</Dropdown.Item>
                      <Dropdown.Item href="/logout" onClick={this.logout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                      
                    </li>
                  </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <NavLink to={"/login"} className="nav-link">
                          Login
                        </NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink to={"/signup"} className="nav-link">
                          Sign Up
                        </NavLink>
                      </li>
                    </div>
                  )}
      
             </ul>
    
            </div>
            </nav>

            
                
            </Navbar>
    
    
    
            <Switch>
            <Route exact path='/home' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/user' component={User} />
            <Route exact path='/book/:id' component={Booking} />
            <Route exact path='/generatepdf/:id' component={PDF} />
            <Route DefaultRoute path='/home' component={Home} />
            </Switch>
           
           
           
   </Router>
    
  
    
  );
  }
}


export default App;



const Navbar=styled.div`

    .nav-link {
        color: #fff !important;
        &:hover{
        background : var(--light-blue);
        }
    }
   background: var(--dark-blue);
   
`;

