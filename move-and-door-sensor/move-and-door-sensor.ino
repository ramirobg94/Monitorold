long distanceSensor;
long timeLight;
long distanceDoor;
long timeDoor;
int doorAnswer;
int sensorAnswer;

void setup(){
  Serial.begin(9600);
  pinMode(9, OUTPUT); /*Trigger Sensor Lights*/
  pinMode(8, INPUT); /*Echo Sensor Lights*/
  pinMode(11, OUTPUT);/*Led Lights*/
  pinMode(7, OUTPUT); /*Trigger Sensor Door*/
  pinMode(6, INPUT); /*Echo Sensor Door*/
  pinMode(10, OUTPUT); /*Led Door*/
  pinMode(2, OUTPUT); /*Pi Door*/
  pinMode(4, OUTPUT); /*Pi Sensor*/
  pinMode(12, INPUT); /*Pi Door*/
  pinMode(13, INPUT); /*Pi Sensor*/
}

void loop(){
  digitalWrite(9,LOW); /* Stabilize sensor*/
  delayMicroseconds(5);
  digitalWrite(9, HIGH); /* Ultrasonic pulse sent*/
  delayMicroseconds(10);
  timeLight=pulseIn(8, HIGH); 

  digitalWrite(7,LOW); /* Stabilize sensor*/
  delayMicroseconds(5);
  digitalWrite(7, HIGH); /* Ultrasonic pulse sent*/
  delayMicroseconds(10);
  timeDoor=pulseIn(6, HIGH);
  
  distanceDoor= int(0.017*timeDoor); /*formula to calculate the distance*/
  distanceSensor= int(0.017*timeLight); /*formula to calculate the distance*/

  if (distanceDoor<=10){
    digitalWrite(2,HIGH);
  }
  else{
    digitalWrite(2,LOW);
  }
  
  if (distanceSensor<=20){
    digitalWrite(4,HIGH);
  }
  else{
    digitalWrite(4,LOW);
  }

  doorAnswer = digitalRead(12);
  sensorAnswer = digitalRead(13);

  if (doorAnswer == 1){
    digitalWrite(10,LOW);
  }
  else{
    digitalWrite(10,HIGH);
  }
  
  if (sensorAnswer == 1){
    digitalWrite(11,HIGH);
  }
  else{
    digitalWrite(11,LOW);
  }
  
  
  /*Terminal*/
  Serial.println("Light Distance");
  Serial.println(distanceSensor);
  Serial.println(" cm");
  Serial.println("Door Distance");
  Serial.println(distanceDoor);
  Serial.println(" cm");
  delay(1000);
}
