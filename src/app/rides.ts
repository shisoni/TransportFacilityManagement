import { Time } from '@angular/common';
import { Timestamp } from 'rxjs';

export interface Rides{

    empId : string,
    vehicleType :string,
    vehicleNumber:number,
    time:Time,
    pickUpPoint:string,
    destination:string,
    vacantSeats:number,
    date:Date 
}       

export interface BookingDetails{
    empId: string,
    bookedEmpId : string 
}