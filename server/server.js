const express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const http = require("http");
const mongoose = require('mongoose');
const { APP_ID } = require("@angular/core");
const { Timestamp } = require("mongodb");
const { time } = require("console");
const CONNECTION_URL = "mongodb+srv://shisoni:shisoni@lootkamaal-wbiet.mongodb.net/test";
const DATABASE_NAME = "TransportFacility";

const app = express();

//const port = process.env.PORT || 4200;

const server = http.createServer(app);

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
//app.use(express.static('dist'));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


var Schema = mongoose.Schema;

var ridesSchema = new Schema({
   empId : {type: String,required : true,unique:true},
   vehicleType : {type: String,required : true},
   vehicleNumber : {type: String,required: true},
   vacantSeats : {type: Number,required: true},
   time : {type: String,required: true},
   date: {type:Date,required:true,default:Date.now},
   pickUpPoint : {type: String,required: true},
   destination : {type: String,required: true}

    }
   );

   var bookingSchema = new Schema({
       empId :  {type: String,required : true},
       bookedEmpId :  {type: String,required : true}
   });


var Rides = mongoose.model('Rides', ridesSchema);
var BookingDetails = mongoose.model('BookingDetails', bookingSchema);




var database,collection1,collection2;


app.post('/api/addRide', function(req, res) {

    console.log(req.body);
    var ride = new Rides({
        empId : req.body.empId,
        destination : req.body.destination,
        vehicleType : req.body.vehicleType,
        vehicleNumber: req.body.vehicleNumber,
        pickUpPoint : req.body.pickUpPoint,
        time : req.body.time,
        vacantSeats : req.body.vacantSeats,
        date : Date.now()
    })
    
    collection1.save(ride)
    .then(result => {
    })
    .catch(error => console.error(error))
});

app.get('/api/getRide/:empId', function(req, res) {
    var empId= req.params.empId;
    collection1.find({empId:{ $ne: empId }}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.get('/api/getFilter/:vehicleType', function(req, res) {
    var vehicleType= req.params.vehicleType;
    collection1.find({vehicleType:{ $eq: vehicleType }}).toArray((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.put('/api/updateRide', function(req, res) {
    
    collection1.findOneAndUpdate({'empId':req.body.empId},{$set:{'vacantSeats':req.body.vacantSeats}}, { upsert: true, new: true },function(error, result)  {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.delete('/api/deleteRide', function(req, res) {
  
   
    var query = {vacantSeats : 0};
    collection1.remove(query,function(error, result)  {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
    });
});

app.post('/api/addBookingDetails', function(req, res) {
   
collection2.insertOne(req.body)
    .then(result => {
    })
    .catch(error => console.error(error))
});

app.get('/api/getBookingDetails/:bookedEmpId', function(req, res) {
    var bookedEmpId= req.params.bookedEmpId;
   
    collection2.countDocuments({bookedEmpId: bookedEmpId },function(error, result)  {
        if(error) {
            return res.status(500).send(error);
        }
        return res.json(result);
    });
});

server.on('listening',function(){
    console.log('ok,server is running');
})


server.listen(8080, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection1 = database.collection("Rides");
        collection2 = database.collection("BookingDetails");
        
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });

    
     

});