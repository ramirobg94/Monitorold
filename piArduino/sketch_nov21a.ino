// constants won't change. They're used here to 
// set pin numbers:
const int buttonPin = 8;     // the number of the pushbutton pin
const int ledPin =  2;      // the number of the LED pin
const int toPi = 7; // the number of the sendData pin
const int fromPi = 4; // the number of the receiveData pin

// Variables will change:
int ledState = LOW;         // the current state of the output pin
int buttonState;             // the current reading from the input pin
int lastButtonState = LOW;   // the previous reading from the input pin
//int buttonPressed = 0;            // the button was pressed

// the following variables are long's because the time, measured in miliseconds,
// will quickly become a bigger number than can be stored in an int.
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(fromPi, INPUT);
  pinMode(toPi, OUTPUT);
    Serial.begin(9600);
}

void loop() {
  // read the state of the switch into a local variable:
  int reading;
  int readingConfirm;
  
  //if(buttonPressed == 0){ // If there isn't any action with raspberry
    reading = digitalRead(buttonPin);
  

    // check to see if you just pressed the button 
    // (i.e. the input went from LOW to HIGH),  and you've waited 
    // long enough since the last press to ignore any noise:  

    // If the switch changed, due to noise or pressing:
    if (reading != lastButtonState) {
      // reset the debouncing timer
      lastDebounceTime = millis();
    
     // this is all that's new to the code 
     // toggles the ledState variable each time the button is pressed 
        if (buttonState == HIGH) {
        //buttonPressed = 1; // the button was pressed
        ledState = !ledState;
        digitalWrite(toPi,ledState);
        Serial.println(ledState);
      } 
    } 
  
    if ((millis() - lastDebounceTime) > debounceDelay) {
      // whatever the reading is at, it's been there for longer
      // than the debounce delay, so take it as the actual current state:
      buttonState = reading;
    }
  //}
  
  
  // set the LED using the state of the button:
  readingConfirm = digitalRead(fromPi);
  //if(readingConfirm == 1){
    //buttonPressed = 0;
    //digitalWrite(toPi, LOW); // Send to raspberry to that the led is on
    digitalWrite(ledPin, readingConfirm);
    // save the reading.  Next time through the loop,
    // it'll be the lastButtonState:
    lastButtonState = reading;  
  //}
  
}
