import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import FlightIcon from '@material-ui/icons/Flight';
import SearchService from '../services/search.service';
import LoginService from '../services/login.service';
import Table from 'react-bootstrap/Table';

class Home extends Component{
  
    constructor(props){
        
        super(props);

        this.onChangeFrom=this.onChangeFrom.bind(this);
        this.onChangeTo=this.onChangeTo.bind(this);
        this.onChangeDate=this.onChangeDate.bind(this);
        this.search=this.search.bind(this);
        

        this.state={
            from:'',
            to:'',
            date:Date,
            flights:[],
            showTable:false,
            hasError:false,
            currentUser:undefined,
            redirect:'/user'
        };
    }

    componentDidMount() {

        console.log('componentDidMound Called!!!!!');
        this.setState({
              
            currentUser: LoginService.getCurrentUser()
         })
          
    }
    

    onChangeFrom(e) {
        this.setState({
            from:e.target.value
        })
    }

    onChangeTo(e){
        this.setState({
            to:e.target.value
        })
    }

    onChangeDate(e){
        this.setState({
            date:e.target.value
        })
    }

    book(id){
        if(this.state.currentUser){
            this.props.history.push('/book/'+id);
            window.location.reload();
           
            
        }else{
            alert("You must login first to book flight!");
            this.props.history.push('/login')
            window.location.reload();

        }
      
    }

   
    search(){
        SearchService.search(this.state.from,this.state.to,this.state.date,this.state.fare)
                        .then(res => {
                            this.setState({...this.state,
                              flights:res,
                              showTable:true
                            })
                        })
                        .catch(err => {
                            this.setState({hasError:true})
                        })
                    
    }

    render(){
        const {showTable}=this.state;
        return (
            <div style={{display:"flex",
                justifyContent : "center",
                alignItems: "center",
                marginBottom: "100px"}}
            >
                <div>
                <form className="form">
                <div style={{textAlign:"center"}}>
                <FlightIcon style={{fontSize:70}} /><br/>
                <h2>Search Flights</h2>
                </div>

                <div className="form-group">
                    <label>From</label>
                    <input type="textbox" className="form-control" value={this.state.from} onChange={this.onChangeFrom} placeholder="Enter takeoff city" />
                </div>


                <div className="form-group">
                    <label>To</label>
                    <input type="textbox" className="form-control" value={this.state.to} onChange={this.onChangeTo} placeholder="Enter landing city" />
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" value={this.state.date} onChange={this.onChangeDate} placeholder="Select Date" />
                </div>

                
                <div  style={{textAlign:"center"}}>
                <Button
                          variant="contained"
                          color="primary"
                          startIcon={<SearchIcon />}
                          onClick={this.search}
                         
                >
                          Search
                </Button>
                </div>
            </form>

            {showTable && (
                <Table striped bordered hover className="table">
                <thead>
                <th>Flight Name</th>
                <th>From</th>
                <th>To</th>
                <th>Date</th>
                <th>Fare</th>
                <th>Book</th>
                </thead>
                <tbody>
                {this.state.hasError ? <div>Error occured fetching data</div> : (this.state.flights.map( flight => 
                <tr key={flight._id}>
                <td>{flight.name}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
                <td>{flight.date.toString().split('T')[0]}</td>
                <td>{flight.fare}</td>
                <td><Button
                          variant="contained"
                          color="primary"
                          onClick={() => {this.book(flight._id)}}
                >
                          Book
                </Button></td>
                </tr>
                ))}
                 </tbody>
                 </Table>
             )}
            </div><br/><br/>
             
 

            </div>
        )
    }
}

export default Home;