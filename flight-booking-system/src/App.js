import React from 'react';
import './App.css';
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login.component';
import Home from './components/home.component';
import Navigation from './components/navigation.component';
import Signup from './components/signup.component';

function App() {
  return (
    <Router>
    <h3 id="title">Flight Booking System</h3>
    <br/>
    <Navigation/>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={() => <Login isLoggedIn={false}/> } />
      <Route exact path='/signup' component={Signup} />
    </Switch>
    
    </Router>
  );
}

export default App;
