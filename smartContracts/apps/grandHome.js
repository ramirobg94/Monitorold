//import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// Import libraries
var Web3            = require('web3'),
    contract        = require("truffle-contract"),
    path            = require('path')
    MyContractJSON  = require(path.join(__dirname, './contracts/GrandHouse.json'));
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
// Setup RPC connection   
var provider    = new Web3.providers.HttpProvider("http://130.240.5.78:7545");

// Read JSON and attach RPC connection (Provider)
var GrandHouse = contract(MyContractJSON);
GrandHouse.setProvider(provider);

var account_one = "0x93ed0241a4c5bc06cc5f78f2bbb1bde512a14f78"; // an address
//var account_two = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
var meta;
/*
MetaCoin.new().then(function(instance) {
  // Print the new address
  console.log(instance.address);
}).catch(function(err) {
  // There was an error! Handle it.
});*/
const numOfPins = 40;
var myAlerts;
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var button = new Gpio(17, 'in', 'both'); // use GPIO pin 17, and specify that it is input
var door = new Gpio(27, 'in', 'both'); // use GPIO pin 27 to get door's sensor
var sensor = new Gpio(22, 'in', 'both'); // use GPIO pin 22 to get sensor's data
var doorLed = new Gpio(23, 'out'); // use GPIO pin 23 to send Door's answer
var sensorLed = new Gpio(24, 'out'); // use GPIO pin 24 to send Sensor's answer
var buttonState = 0;
var buttonRefresh = new Gpio(18,'in','both');

function hexToString (hex) {
    var string = '';
    for (var i = 0; i < hex.length; i += 2) {
      string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return string;
  }

function stringToHex(str) {
  var arr = str.split('');
  var hex = "0x";
  for (var i = 0; i < 32; i++){
    if(arr.length > i){
      hex += str.charCodeAt(i).toString(16);
    }else{
      hex += "00";
    }
  }
  return hex;
}

function init(){
  getMyHome();
}

function someEvent(port) {
        console.log(port)
        let alertsInThisPort = myAlerts[port];
        if(alertsInThisPort.length <= 0)return;
        for(var n = 0; n < alertsInThisPort.length; n++){
         //console.log(alertsInThisPort[n]);
          var alertId = alertsInThisPort[n][0];
          var alertName = hexToString(alertsInThisPort[n][3]);
          var alertRange = hexToString(alertsInThisPort[n][4]);
          var alertStatus = alertsInThisPort[n][5];
          var alertPort = alertsInThisPort[n][6];
          if(alertPort == port && alertStatus == true){
            doIHaveToFire(alertRange)
          }
        }
      }

      function HMToTimeStamp(hour){
        var d = new Date();
        var h = hour.split(':')[0];
        var m = hour.split(':')[1];
        var dt = d.getMonth()+1 +'/'+d.getDate()+'/'+d.getFullYear()+' '+h+':'+m;
      
        var f =  new Date(dt);
        return f;
      }
      function doIHaveToFire(range){
        //console.log(range.split(''));
        var rangeSplited = range.split('').filter(function(entry) { 
            return entry == ':' || 
              entry == ',' || 
              entry == '0' ||
              entry == '1' ||
              entry == '2' ||
              entry == '3' ||
              entry == '4' ||
              entry == '5' ||
              entry == '6' ||
              entry == '7' ||
              entry == '8' ||
              entry == '9'; 
            });
        var nowTimeStamp = Date.now();
        var newRange = rangeSplited.join('').split(',');
        if( nowTimeStamp >= HMToTimeStamp(newRange[0]) && nowTimeStamp <= HMToTimeStamp(newRange[1])){
          console.log("*************************ALARM**************")
          fireAlert();
        }
      }
      function fireAlert(){
        console.log("alert")
        
	//$('#led').addClass("dark");
        //$('#led').addClass("light");
	LED.writeSync(0);
	LED.writeSync(1);
        setTimeout(function(){LED.writeSync(0);}, 3000);
      }

function setupAlerts(alerts){
      const getAlerts = alerts.map(function(alert){return meta.getAlertById(alert, {from: account_one})});
      
      Promise.all(getAlerts)
      .then(
        function(values){
          console.log("setUpAlerts",values);
          setAlerts(values);
        }
        );
    }

function setAlerts(alertsToSet) {
        myAlerts = new Array(numOfPins);
        for(var i= 0; i < myAlerts.length; i++){
          myAlerts[i] = new Array();
        }
        for(var j = 0; j < alertsToSet.length; j++){
          console.log((alertsToSet[j][6]+'')*1)
          myAlerts[(alertsToSet[j][6]+'')*1].push(alertsToSet[j]);
        }
console.log("setAlerts",myAlerts)
      }

function getMyHome(hubAddress){
      console.log(account_one)
      GrandHouse.deployed()
      .then(function(instance) {        meta = instance;
        return meta.getMyHome(account_one, {from: account_one});
      })
      .then(function(result) {
        console.log(result)
         setupAlerts(result[4])
        })
      .catch(function(e) {
        console.log("error get my home", e)
      });
    }

buttonRefresh.watch(function(err,value){
	if(err){
		return;
	}

	if(value === 1){
		init();
	}
   }
);



button.watch(function (err, value) { //function to set/unset led
  console.log("The button was pressed");
  
  if (err){//if error
     console.error('There was an error', err);
     return;
  }

  if(value === 1){
	someEvent(17);
  }

});

door.watch(function (err, value) { //function to set/unset led
  console.log("The door's sensor was activated");
  
  if (err){//if error
     console.error('There was an error', err);
     return;
  }

  if(value === 0){
     someEvent(27);
  }

});

sensor.watch(function (err, value) { //function to set/unset led
  console.log("The light's sensor was activated");
  
  if (err){//if error
     console.error('There was an error', err);
     return;
  }

  if(value === 1){
	someEvent(22);
  }

});

//setTimeout(endBlink, 5000); //stop blinking after 5 seconds
function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  doorLed.writeSync(0);
  doorLed.unexport();
  sensorLed.writeSync(0);
  sensorLed.unexport();
  button.unexport(); // Unexport Button GPIO to free resources
  door.unexport();
  sensor.unexport();
  buttonRefresh.unexport();
};

process.on('SIGINT', unexportOnClose); //function to run when user closes using ctrl+c

init();
