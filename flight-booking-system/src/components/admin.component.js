import React, { Component } from 'react'
import FlightService from '../services/flight.service'
import Table from 'react-bootstrap/Table';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import Style from './admin.component.css';


class Admin extends Component {
 
  


  constructor(){
    
    super();

   this.removeFlight=this.removeFlight.bind(this);
   this.clicked=this.clicked.bind(this);
   this.onChangeName=this.onChangeName.bind(this);
   this.onChangeFrom=this.onChangeFrom.bind(this);
   this.onChangeTo=this.onChangeTo.bind(this);
   this.onChangeDate=this.onChangeDate.bind(this);
   this.onChangeFare=this.onChangeFare.bind(this);
   this.addFlight=this.addFlight.bind(this);
   this.updateFlight=this.updateFlight.bind(this);
     
      this.state={
        flights:[],
        hasError:false,
        add:false,
        name:'',
        from:'',
        to:'',
        date:'',
        fare:''
      }
  }

  onChangeName(e){
    this.setState({
          name:e.target.value
    });
  }

  
  onChangeFrom(e){
    this.setState({
          from:e.target.value
    });
  }

  onChangeTo(e){
    this.setState({
          to:e.target.value
    });
  }

  onChangeDate(e){
    this.setState({
          date:e.target.value
    });
  }

  onChangeFare(e){
    this.setState({
          fare:e.target.value
    });
  }

  
  componentDidMount(){
    FlightService.find()
                 .then(res => {
                   this.setState({...this.state,
                     flights:res
                   })
                 })
                 .catch(err => {
                   this.setState({hasError:true})
                 })
  }

  removeFlight(id){
     console.log('inside delete!!!!');
     console.log(id);
       FlightService.delete(id)
                    .then(response => {
                      
                      FlightService.find()
                      .then(res => {
                        this.setState({...this.state,
                          flights:res
                          
                        })
                      })
                      .catch(err => {
                        this.setState({hasError:true})
                      });
                      
                    })
                    .catch(err => {
                      console.log(err)
                    });
      

  }

  clicked(msg){
     var trial=document.getElementById("addRow");
     if(trial.style.visibility==="collapse"){
       trial.style.visibility="visible";
     }else{
      trial.style.visibility="collapse";
     }
  }

  addFlight(){
     FlightService.add(this.state.name,this.state.from,this.state.to,this.state.date,this.state.fare)
                  .then(response => {
                      FlightService.find()
                      .then(res => {
                        this.setState({...this.state,
                          flights:res,
                          name:'',
                          from:'',
                          to:'',
                          date:'',
                          fare:''
                        })
                      })
                      .catch(err => {
                        this.setState({hasError:true})
                      });
                      var addRow=document.getElementById("addRow");
                      if(addRow.style.visibility==="collapse"){
                        addRow.style.visibility="visible";
                      }else{
                       addRow.style.visibility="collapse";
                      }
                     
                    })
                    .catch(err => {
                      console.log(err)
                    });
  }

  updateFlight(id){
                console.log("inside update");
                console.log(id);



                console.log(this.state.name+this.state.from+this.state.to+this.state.date+this.state.fare);
                

                FlightService.update(id,this.state.name,this.state.from,this.state.to,this.state.date,this.state.fare)
                .then(response => {
                  FlightService.find()
                  .then(res => {
                    this.setState({...this.state,
                      flights:res,
                      name:'',
                      from:'',
                      to:'',
                      date:'',
                      fare:''
                    })
                  })
                  .catch(err => {
                    this.setState({hasError:true})
                  });

                  
                })
                .catch(err => {
                  console.log(err)
                });
}
 
 
  render() {

    
  
    
    return (
      <>
      <h3 className={Style.h3}>Flights</h3>
      
     
      <div style={{textAlign:"right"}}>

      <Button
          variant="contained"
          color="primary"
          startIcon={<AddBoxIcon />}
          onClick={() => { this.clicked("clicked!") } }
          
      >
          Add
      </Button><br/><br/><br/>
      
     
      </div>
      
      <Table striped bordered hover className="table">
      <thead>
        <th>Flight Name</th>
        <th>From</th>
        <th>To</th>
        <th>Date</th>
        <th>Fare</th>
        <th colSpan="2">Actions</th>
      </thead>
      <tbody>
          <tr style={{visibility:"collapse"}} id="addRow">
            <td><input type="textbox" className="form-control" placeholder="Enter flight name" value={this.state.name} onChange={this.onChangeName}/></td>
            <td><input type="textbox" className="form-control" placeholder="Enter from" value={this.state.from} onChange={this.onChangeFrom}/></td>
            <td><input type="textbox" className="form-control" placeholder="Enter to" value={this.state.to} onChange={this.onChangeTo}/></td>
            <td><input type="textbox" className="form-control" placeholder="Enter date" value={this.state.date} onChange={this.onChangeDate}/></td>
            <td><input type="textbox" className="form-control" placeholder="Enter fare" value={this.state.fare} onChange={this.onChangeFare}/></td>
            <td colSpan="2" >
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddIcon />}
                          onClick={() => {this.addFlight()}}
                        >
                          Add Flight
                        </Button>
              </td>
          </tr>
          {this.state.hasError ? <div>Error occured fetching data</div> : (this.state.flights.map( flight => 
            
                
               
                 <tr key={flight._id} >
                   <td id="t1" ><input type="textbox"  className="form-control" defaultValue={flight.name} onChange={this.onChangeName}/></td>
                   <td id="t2" ><input type="textbox"  className="form-control" defaultValue={flight.from} onChange={this.onChangeFrom} /></td>
                   <td id="t3" ><input type="textbox"  className="form-control" defaultValue={flight.to} onChange={this.onChangeTo}/></td>
                   <td id="t4" ><input type="textbox"  className="form-control" defaultValue={flight.date.toString().split('T')[0]} onChange={this.onChangeDate}/></td>
                   <td id="t5" ><input type="textbox"  className="form-control" defaultValue={flight.fare} onChange={this.onChangeFare}/></td>
                   <td>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon />}
                          onClick={() => { this.updateFlight(flight._id) } }
                        >
                          Edit
                        </Button>
                   </td>
                   <td> <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                         
                           onClick={() => { this.removeFlight(flight._id) } }
                        >
                          Delete
                        </Button>
                    </td>
                  
                 </tr>
          
               
          ))}
       </tbody>
        </Table>
        
      </>
  )
  }
}

export default Admin;
