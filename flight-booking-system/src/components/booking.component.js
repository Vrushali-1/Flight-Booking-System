import React, { Component } from 'react';
import LoginService from '../services/login.service';
import FlightService from '../services/flight.service';
import BookingService from '../services/booking.service';
import Button from '@material-ui/core/Button';
export class Booking extends Component {

    constructor(props){
       
        super(props);
        
        this.book=this.book.bind(this);
        this.onChangeQuantity=this.onChangeQuantity.bind(this);
        
        this.state={
            id:this.props.match.params.id,
            currentUser:LoginService.getCurrentUser(),
            flight:{},
            quantity:'1',
            showSuccessMsg:false
        }
       
    }

    onChangeQuantity(e){
        
        this.setState({
            quantity:e.target.value
        })
    }

    componentDidMount(){
       
        FlightService.findOne(this.state.id)
                      .then(response =>{
                          this.setState({...this.state,
                              flight:response
                          })
                         
                      })
                      .catch(err => {
                          console.log(err)
                      });
        console.log(this.state.flight);
        console.log(this.state.currentUser.user);
    }

    book(){
         
         const flight={
             name:this.state.flight.name,
             from:this.state.flight.from,
             to:this.state.flight.to,
             date:this.state.flight.date,
             fare:this.state.flight.fare
         };
         
         BookingService.book(this.state.currentUser.user,flight,this.state.quantity)
                       .then(response => {
                           console.log(response);
                           this.setState({
                               showSuccessMsg:true
                           })

                       })
                       .catch(err => {
                           console.log(err);
                       })

    }
    render() {
        
       
        return (
            <div style={{display:"flex",
                        justifyContent : "center",
                        alignItems: "center",
                        marginBottom: "100px"}}>

            <form>
            <h5 style={{textAlign:"center"}}>Flight Details</h5>
            <div className="form-group">
                    <label>Flight Name</label> 
                    <input type="text" className="form-control" value={this.state.flight.name} disabled />
                </div>

                <div className="form-group">
                    <label>From</label>
                    <input type="text" className="form-control"  value={this.state.flight.from}  disabled/>
                </div>

                <div className="form-group">
                    <label>To</label>
                    <input type="text" className="form-control" value={this.state.flight.to} disabled/>
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input type="text" className="form-control" value={this.state.flight.date} disabled/>
                </div>

                <div className="form-group">
                    <label>Fare</label>
                    <input type="text" className="form-control" value={this.state.flight.fare} disabled/>
                </div>

                <h5 style={{textAlign:"center"}}>Personal Details</h5>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" value={this.state.currentUser.user.firstname} disabled/>
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" value={this.state.currentUser.user.lastname} disabled/>
                </div>

                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" className="form-control" value={this.state.currentUser.user.gender} disabled />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" value={this.state.currentUser.user.email} disabled />
                </div>

                <div className="form-group">
                    <label>Quantity</label>
                    <input type="text" className="form-control" value={this.state.quantity} onChange={this.onChangeQuantity} />
                </div>

                <div style={{textAlign:"center"}}>
                <Button
                          variant="contained"
                          color="primary"
                          onClick={() => { this.book('clicked') } }
                          
                >
                          Book
                </Button>
                </div>
                {this.state.showSuccessMsg && (<div style={{ color:"green"}}>Booking done!</div>)}
                

            </form>
                  
            </div>
        )
    }
}

export default Booking;
