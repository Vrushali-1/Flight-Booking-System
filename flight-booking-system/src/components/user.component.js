import React, { Component } from 'react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import  './sidebar.component.css';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import BookingService from '../services/booking.service';
import Table from 'react-bootstrap/Table';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';



  

export class User extends Component {
   

    constructor(props){
        super(props);


        this.state={
            search:false,
            myBookings:false,
            bookingNo:'',
            bookings:[],
            tableSearch:false,
            myBookingss:[]
        }

        this.search=this.search.bind(this);
        this.myBooking=this.myBooking.bind(this);
        this.onChangeBookingNo=this.onChangeBookingNo.bind(this);
        this.searchBooking=this.searchBooking.bind(this);
        this.cancelBooking=this.cancelBooking.bind(this);
        this.pdf=this.pdf.bind(this);

    }

    componentDidMount(){
         BookingService.userBookings()
                       .then(response =>{
                            this.setState({
                                myBookingss:response
                            })
                       })
                       console.log(this.state.myBookingss);
    }

    search(){
         this.setState({
             search:true,
             myBookings:false
         })


    }

    myBooking(){
          this.setState({
            myBookings:true,
            search:false
        })
    }


    
    onChangeBookingNo(e){
        this.setState({
            bookingNo:e.target.value
        })
    }

    searchBooking(){

        BookingService.search(this.state.bookingNo)
                       .then(response => {
                           this.setState({
                               bookings:response,
                               tableSearch:true
                           })
                       })
        
    }

    cancelBooking(id){
        console.log(id);
        BookingService.cancel(id)
                       .then(response=>{
                           this.setState({
                               bookings:[],
                               tableSearch:false
                           })
                           BookingService.userBookings()
                           .then(response =>{
                                this.setState({
                                    myBookingss:response
                                })
                           })
                       });

    }

    pdf(id){
       
        this.props.history.push('/generatepdf/'+id);
        window.location.reload();
    }

    
   
    
    render() {
        return (
            <div>
            <div className="bar">
            <List disablePadding dense className="list">
               
               <ListItem>
                <ListItemText><a href="#" onClick={this.search}>Search Booking</a></ListItemText>
               </ListItem>

              

               <ListItem>
                <ListItemText><a href="#" onClick={this.myBooking}>My Booking</a></ListItemText>
               </ListItem>
            
            </List>
            </div>

            {this.state.search && (
                <div className="container-content">
                    
                    <form>
                    
                    <div className="form-group">
                    <label>Booking No</label>
                    <input type="textbox" className="form-control" value={this.state.bookingNo} onChange={this.onChangeBookingNo} placeholder="Enter booking no" />
                    </div>
                    <div style={{textAlign:"center"}}>
                   
                    <Button
                          variant="contained"
                          color="primary"
                          startIcon={<SearchIcon />}
                          onClick={this.searchBooking}
                         
                    >
                          Search
                    </Button><br/><br/><br/>
                    {this.state.tableSearch && (
                        <Table striped bordered hover className="table" >
                            <thead>
                                <tr>
                                    <th>Flight Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Date</th>
                                    <th>Quantity</th>
                                    <th>Ammount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.bookings.map(booking => 
                                
                                <tr key={booking._id}>
                                      <td>{booking.flight.name}</td>
                                      <td>{booking.flight.from}</td>
                                      <td>{booking.flight.to}</td>
                                      <td>{booking.flight.date}</td>
                                      <td>{booking.quantity}</td>
                                      <td>{booking.ammount}</td>
                                      <td> <Button
                                             variant="contained"
                                            color="secondary"
                                            startIcon={<CancelIcon />}
                                            onClick={() => {this.cancelBooking(booking._id)}}
                         
                                            >
                                           Cancel
                                        </Button>
                                     </td>
                                </tr>
                                
                                
                                )}
                            </tbody>
                        </Table>
                    )}
                    </div>
                    </form>
                </div>

                
            )}

            {this.state.myBookings && (
                    <div className="container-content">
                   
                    
                    <Table striped bordered hover className="table" style={{marginTop:"50px"}}>
                        <thead>
                            <th>Booking No</th>
                            <th>Flight Name</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Date</th>
                            <th>Quantity</th>
                            <th>Ammount</th>
                            <th>Action</th>
                        </thead>
                        <tbody>
                                {this.state.myBookingss.map(booking => 
                                
                                <tr key={booking._id}>
                                      <td>{booking.bookingNo}</td>
                                      <td>{booking.flight.name}</td>
                                      <td>{booking.flight.from}</td>
                                      <td>{booking.flight.to}</td>
                                      <td>{booking.flight.date}</td>
                                      <td>{booking.quantity}</td>
                                      <td>{booking.ammount}</td>
                                      <td> <Button
                                             variant="contained"
                                            color="primary"
                                            startIcon={<PictureAsPdfIcon />}
                                            onClick={()=> {this.pdf(booking.bookingNo)}}
                         
                                            >
                                           Generate Pdf
                                        </Button>
                                     </td>
                                </tr>
                                
                                
                                )}
                            </tbody>
                      
                      </Table>
                      </div>
                    )}
                    
                   
        
            </div>
        )
    }
}

export default User;
