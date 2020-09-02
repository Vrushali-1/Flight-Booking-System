import axios from "axios";
import authHeader from './auth.service';
import LoginService from "./login.service";
const API_URL = "http://localhost:7000/bookings/";


class BookingService{


      book(user,flight,quantityS){
         
         console.log(user);
         console.log(flight);
          console.log(quantityS);
          const quantity=Number(quantityS);
          return axios
                 .post(API_URL+"book",{
                     user,
                     flight,
                     quantity
                 },
                 {
                     headers:authHeader()
                 })
                 .then(response => {
                     return response.data.booking
                 })
                 
      }

      cancel(id){
          return axios
                 .delete(API_URL+"cancel/"+id,{
                    headers:authHeader()
                 })
                 .then(response => {
                     return response
                 })
      }

      search(id){
          return axios 
                 .get(API_URL+"search/"+id,{
                     headers:authHeader()
                 })
                 .then(response =>{
                     return response.data.booking
                 })
      }

      userBookings(){
          const userId=LoginService.getCurrentUser().user._id;
          return axios
                 .get(API_URL+"searchByUserId/"+userId,{
                     headers:authHeader()
                 })
                 .then(response => {
                     return response.data.userBookings;
                 })
      }
}


export default new BookingService();