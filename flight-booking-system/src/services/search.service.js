import axios from "axios";
const API_URL = "http://localhost:9000/flight/search";

class SearchService{


    search(from,to,date){
        return axios
               .post(API_URL,{
                   from,to,date
               },
               )
               .then(response => {
                   return response.data.flights
               })
    }




}


export default new SearchService();