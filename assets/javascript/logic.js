$( document ).ready(function() {

//Initialize Firebase
var config = {
  apiKey: "AIzaSyDV0qM5aO-kBwDxgnzgEdKdeboFKchlWIk",
  authDomain: "train-schedule-225d4.firebaseapp.com",
  databaseURL: "https://train-schedule-225d4.firebaseio.com",
  projectId: "train-schedule-225d4",
  storageBucket: "train-schedule-225d4.appspot.com",
};

firebase.initializeApp(config);
var database = firebase.database();

//Button for Adding Trains

$("#add-train-btn").on("click", function() {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrainTime = $("#startInput").val().trim();
  var trFrequency = $("#frequencyInput").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    place: destination,
    time: firstTrainTime,
    frequency: trFrequency
  }

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.place);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  //clears text boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#startInput").val("");
  $("#frequencyInput").val("");

});


// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrainTime = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;
  
  //Train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

 //Append input into table
  var tr = $("<tr>");
  $("tbody").append(tr);
  tr.append("<td>" + trainName + "</td>" + "<td>" + destination + "</td>" + "<td>" + frequency + "</td>");

var firstTrain = moment(firstTrainTime, "HH:mm").subtract("1, years");
console.log(firstTrain);


var timeDifference = moment().diff(moment(firstTrain), "minutes");

var calculation = timeDifference % frequency;

var minutesAway = frequency - calculation;
moment(minutesAway).minutes();

var currentTime = (moment().format("hh:mm:ss a"));

var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
tr.append("<td>" + nextArrival + "</td>" + "<td>" + minutesAway + "</td>" );

});
});


  
  
