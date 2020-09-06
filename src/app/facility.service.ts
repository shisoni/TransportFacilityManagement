import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Rides,BookingDetails} from './rides';




   

@Injectable()
export class TransportService {

    
    private localAPI_URL = 'http://localhost:8080';

  
    
    constructor(private http: HttpClient) {     
    }
    
    
    addRides(ride:Rides)
    {
        console.log(ride);
        return this.http.post(this.localAPI_URL + '/api/addRide',ride).subscribe(data=>{});
    }

    showRides(empId:String){
        return this.http.get(this.localAPI_URL + '/api/getRide/'+empId);
    }

    showFilter(vehicleType:String){
        return this.http.get(this.localAPI_URL + '/api/getFilter/'+vehicleType);
    }
 
    updateDetails(ride:Rides){
        return this.http.put(this.localAPI_URL + '/api/updateRide',ride).subscribe(data=>{});
    }
  
    removeRide(){
        
        return this.http.delete(this.localAPI_URL + '/api/deleteRide').subscribe(data=>{});
    }

    addBookingDetails(details:any[]){
        return this.http.post(this.localAPI_URL + '/api/addBookingDetails',details).subscribe(data=>{});
    }

    getBookingDetails(bookedEmpId:String){
       
        return this.http.get(this.localAPI_URL + '/api/getBookingDetails/'+bookedEmpId);
        
    }

    
}   