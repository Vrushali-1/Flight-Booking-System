import React, { Component } from 'react'
import BookingService from '../services/booking.service';
import Table from 'react-bootstrap/Table';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export class PDF extends Component {


    constructor(props){
        super(props)
        this.download=this.download.bind(this);
        this.state={
            bookings:[]
        }
    }

    componentDidMount(){
         BookingService.search(this.props.match.params.id)
                        .then(response => {
                            this.setState({
                                bookings:response
                            })
                            
                            console.log(response);
                        })
    }

    download() {
        var element = document.getElementById('pdfTable');

        html2canvas(element,{scrollY: -window.scrollY}).then((canvas) => {
          var imgData = canvas.toDataURL('image/png');
          var doc = new jspdf('p','pt');
          doc.addImage(imgData, 130, 250, 300, 300);
          doc.save("receipt.pdf");
        })
    };
    
    render(props) {
       
        return (
            <div  style={{display:"flex",
                  justifyContent : "center",
                 alignItems: "center",
                 marginBottom: "100px"}} >
                
                
              <div>
                { this.state.bookings.map(item => 

                    <Table striped bordered hover className="table" id="pdfTable" style={{width:"500px"}}>
                   <tr><td colSpan="2"><h3>FLY HIGH AIRLINES</h3></td></tr>
                   <tr><td colSpan="2">Booking Details</td></tr>
                   <tr>
                       <td>Booking No:</td><td>{item.bookingNo}</td>
                   </tr> 
                   <tr>
                       <td>Quantity:</td><td>{item.quantity}</td>
                   </tr> 
                   <tr>
                       <td>Ammount:</td><td>{item.ammount}</td>
                   </tr> 
                   <tr><td colSpan="2">Personal Details</td></tr>
                   <tr><td>Name</td><td>{`${item.user.firstname} ${item.user.lastname}`}</td></tr>
                   <tr>
                       <td>Gender</td><td>{item.user.gender}</td>
                   </tr>
                   <tr>
                       <td>Email</td><td>{item.user.email}</td>
                   </tr>
                   <tr><td colSpan="2">Flight Details</td></tr>
                   <tr>
                       <td>From</td><td>{item.flight.from}</td>
                   </tr>
                   <tr>
                       <td>To</td><td>{item.flight.to}</td>
                   </tr>
                   <tr>
                       <td>Date</td><td>{item.flight.date}</td>
                   </tr>

                   
                   </Table>
                )}
               
                   
                    <div style={{textAlign:"center"}}>
                    <Button
                                             variant="contained"
                                            color="primary"
                                            startIcon={<GetAppIcon />}
                                            onClick={() => {this.download()}}
                                             
                    >
                                           Download PDF

                    </Button>
                    </div><br/><br/>
                    <div style={{textAlign:"center"}}>
                    <Button
                                             variant="contained"
                                            color="primary"
                                            startIcon={<ArrowBackIcon />}
                                            onClick={() => {
                                                this.props.history.push('/user');
                                                window.location.reload();
                                            }}
                                            
                    >
                                           Back 

                    </Button>
                    </div>
                    
                
              
                </div>
                  
                
                
            </div>
        )
    }
}

export default PDF;
