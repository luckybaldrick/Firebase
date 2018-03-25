
// Initialize Firebase

var config = {
    apiKey: "AIzaSyBkmPFYIiB9zoOMkZRfqQ0N0x73LdjHrgQ",
    authDomain: "project-1-65d68.firebaseapp.com",
    databaseURL: "https://project-1-65d68.firebaseio.com",
    projectId: "project-1-65d68",
    storageBucket: "project-1-65d68.appspot.com",
    messagingSenderId: "1045978577307"
  };
  firebase.initializeApp(config);
  
var currentTime = moment();
var database = firebase.database();
var trainName = "d";
var destination = "";
var firstTrain = "";
var freq = "";
var nextArrival = "";
var minAway = "";

$("#add-train-btn").on("click", function() {
    event.preventDefault();
    trainName = $("#train-name-input").val().trim();
    destination = $("#dest-input").val().trim();
    firstTrain = $("#first-input").val().trim();
    freq = $("#freq-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        freq: freq,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    console.log(trainName);
});

database.ref().on("child_added", function (childSnapshot) {
    firstTrain = moment(childSnapshot.val().firstTrain);
    trainName = childSnapshot.val().trainName;
    destination = childSnapshot.val().destination;
    freq = childSnapshot.val().freq;
    var firstTrainConverted = moment(firstTrain._i, "hh:mm").subtract("1, years");
    var difference = currentTime.diff(moment(firstTrainConverted), "minutes");
    var remainder = difference % freq;
    minAway = freq - remainder;
    nextArrival = moment().add(minAway, "minutes").format("hh:mm a");

    $("#train-table-body").append ("<tr><th>" + trainName + "</th><th>" + destination + "</th><th>" + freq + "</th><th>" + nextArrival + "</th><th>" + minAway + "</th></tr>")
    console.log(minAway);
    console.log(difference);
    console.log(remainder);
    // console.log(firstTrainConverted);
})
