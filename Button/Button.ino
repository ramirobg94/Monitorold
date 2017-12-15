// constants won't change. They're used here to 
// set pin numbers:
const int buttonPin = 8;     // the number of the pushbutton pin
const int ledPin =  2;      // the number of the LED pin
const int toPi = 7; // the number of the sendData pin
const int fromPi = 4; // the number of the receiveData pin
const int buttonRefresh = 12;  //the number of the refresh button
const int RefreshOutPi = 11;   //the number of the sendData of the refresh button

// Variables will change:
int ledState = LOW;         // the current state of the output pin
int buttonState = LOW;             // the current reading from the input pin
int lastButtonState = LOW;   // the previous reading from the input pin

int fresh = LOW;
int pushButton = LOW;
int refreshState= LOW;
int lastRefreshState= LOW;

// the following variables are long's because the time, measured in miliseconds,
// will quickly become a bigger number than can be stored in an int.
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonRefresh, INPUT);
  pinMode(RefreshOutPi, OUTPUT);
  pinMode(fromPi, INPUT);
  pinMode(toPi, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // read the state of the switch into a local variable:
  int reading;
  int readingConfirm;

  int readingRefresh;
  int readingRefreshConfirm;

    pushButton = digitalRead(buttonPin);
    refreshState = digitalRead(buttonRefresh);
    // check to see if you just pressed the button 
    // (i.e. the input went from LOW to HIGH),  and you've waited 
    // long enough since the last press to ignore any noise:  

    // If the switch changed, due to noise or pressing:
      // reset the debouncing timer
      lastDebounceTime = millis();
    
     // this is all that's new to the code 
     // toggles the ledState variable each time the button is pressed 
     Serial.println(pushButton);
        if (pushButton == HIGH) {
          digitalWrite(toPi,HIGH);
          delay(3000);
          digitalWrite(toPi,LOW);
        } 
    

    //if(readingRefresh != lastRefreshState){
      //lastDebounceTime = millis();

      if(refreshState == HIGH) {
        digitalWrite(RefreshOutPi,HIGH);
        delay(3000);
        digitalWrite(RefreshOutPi,LOW);
      }
    //}
  
    if ((millis() - lastDebounceTime) > debounceDelay) {
      // whatever the reading is at, it's been there for longer
      // than the debounce delay, so take it as the actual current state:
      //reading = LOW;
      ledState = LOW;
      buttonState = LOW;
      refreshState = readingRefresh;
    } 
  
  // set the LED using the state of the button:
    readingConfirm = digitalRead(fromPi);
    digitalWrite(ledPin, readingConfirm);

    //The refresh button was pressed
    readingRefresh = digitalRead(buttonRefresh);
    digitalWrite(RefreshOutPi,readingRefresh);
    // save the reading.  Next time through the loop,
    // it'll be the lastButtonState:
    //lastButtonState = reading;  
    lastRefreshState = readingRefresh;
}
