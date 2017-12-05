/* The First test, communication between Arduino UNO and Raspberry Pi B+, using a voltage converter
to send data from Arduino UNO to Raspberry Pi B+. When the button is pressed, the led will turn on
or off.*/


var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var button = new Gpio(17, 'in', 'both'); // use GPIO pin 17, and specify that it is input
var buttonState = 0;
//var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms

button.watch(function (err, value) { //function to set/unset led
  console.log("The button was pressed");
  
  if (err){//if error
     console.error('There was an error', err);
     return;
  }

  if(value === 1){
     LED.writeSync(1);
     console.log("Turned on the led");
  }else{
     LED.writeSync(0);
     console.log("Turned off the led");
  }

//  LED.writeSync(buttonState);
//  buttonState = !buttonState;

//  if (value === 1) { //check the pin state, if the state is 1 (or button pressed)
//    console.log("enciende led");
//    LED.writeSync(1); //set pin state to 1 (turn LED on)
//  } else {
//    LED.writeSync(0); //set pin state to 0 (turn LED off)
//  }
});

//function endBlink() { //function to stop blinking
//  clearInterval(blinkInterval); // Stop blink intervals
//  LED.writeSync(0); // Turn LED off
//  LED.unexport(); // Unexport GPIO to free resources
//}

//setTimeout(endBlink, 5000); //stop blinking after 5 seconds
function unexportOnClose() { //function to run when exiting program
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  button.unexport(); // Unexport Button GPIO to free resources
};
