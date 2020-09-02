import axios from "axios";
import authHeader from './auth.service'
const API_URL = "http://localhost:5000/flight/";

class FlightService{

    find(){
        
        
        return  axios
         .get(API_URL+"find",{
             headers:authHeader()
         })
         .then(response =>{
           
            return response.data.flights;
         });
    };

    delete(id){
        return axios
               .delete(API_URL+"delete/"+id,{
                   headers:authHeader()
               })
               .then(response => {
                   return response.data
               });
               
    }

    add(name,from,to,date,fare){
        return axios
               .post(API_URL+"add",{
                   name,
                   from,
                   to,
                   date,
                   fare
               },
               { 
                headers:authHeader()  
               })
               .then(response => {
                return response.data.flight
               });
    };

    update(id,name,from,to,date,fare){
        console.log("inside update service");
        return axios
               .put(API_URL+"update/"+id,{
                   name,
                   from,
                   to,
                   date,
                   fare
               },
               { 
                headers:authHeader()  
               })
               .then(response => {
                return response.data
               });
    }

    findOne(id){
        return axios
               .get(API_URL+"findone/"+id,
               { 
                headers:authHeader()  
               })
               .then(response => {
                  return response.data.flight
                 
               });
    }
        
}


export default new FlightService();
