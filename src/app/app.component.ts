import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportService } from './facility.service';
import { Params,ActivatedRoute} from '@angular/router';
import {Rides,BookingDetails} from './rides';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [TransportService],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Transport Facility Management';
  openform = false; 
  openDetail = false;
  showMessage1 = false;
  showMessage2 = false; 
  form: FormGroup;
  message:String;
  searchValue:String;
  details:any;
  showData=false;
  vacantSeat : number;
  bookingDetails :any = {};
  bookingCount : any;
  today = new Date();
 
  constructor(private transportService:TransportService,private fb: FormBuilder,private route: ActivatedRoute) {

    this.form = this.fb.group({
      empId: ['', Validators.required],
      vehicleType: ['', Validators.required], 
      vehicleNumber: ['', Validators.required],
      vacantSeats: ['', Validators.required],
      time: ['', Validators.required],
      pickUpPoint: ['', Validators.required],
      destination: ['', Validators.required],

  });

  }

  ngOnInit() {

    console.log(this.today);
    //this.onClickOpenForm();
  }

  onClickOpenForm(){
    this.openform=true; 
    this.openDetail = false; 
    this.showMessage2 = false;
    this.showMessage1=false;
    this.showData=false;
    }

    showDetails(){
      this.showMessage1 = false;
      this.showMessage2 = false;
      this.openDetail = true;
      this.openform = false;

    }

    onSubmitForm(){
      this.transportService.addRides(this.form.value);
      this.form.reset();
      this.openform = false;
      this.showMessage1 = true;
      this.message="Ride added successfully!";
  }

  showRideDetails(empId){

      
     this.transportService.getBookingDetails(empId.value).subscribe(data=>{
       if(data > 0){
        this.message = "Cannot make two bookings!";
        this.showMessage2 = true;
       }
       else{
        this.transportService.showRides(empId.value).subscribe(details => this.details = details);
        this.showData=true;
        this.showMessage1 = false;
        this.showMessage2 = false;
       
       }
     });
     
     
       
      
      
       
   
   
}

onOptionsSelected(vehicleType){
    console.log(vehicleType);
    this.transportService.showRides(vehicleType).subscribe(details => this.details = details);
}

updateDetails(ride: Rides,empId){
  ride.vacantSeats = ride.vacantSeats - 1;
  this.bookingDetails.empId = ride.empId;
  this.bookingDetails.bookedEmpId = empId.value;
  this.transportService.updateDetails(ride);
  this.showData = false;
  this.showMessage2 = true;
  this.message = "Ride booked successfully!";
  
  console.log(this.bookingDetails);
  this.transportService.addBookingDetails(this.bookingDetails);

  if(ride.vacantSeats == 0 ){
    console.log("Here It comes 1");
      this.transportService.removeRide();
  }
} 
}
 