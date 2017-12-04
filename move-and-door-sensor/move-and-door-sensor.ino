long distanceSensor;
long timeLight;
long distanceDoor;
long timeDoor;
void setup(){
  Serial.begin(9600);
  pinMode(9, OUTPUT); /*Trigger Sensor Lights*/
  pinMode(8, INPUT); /*Echo Sensor Lights*/
  pinMode(11, OUTPUT);/*Led Lights*/
  pinMode(7, OUTPUT); /*Trigger Sensor Door*/
  pinMode(6, INPUT); /*Echo Sensor Door*/
  pinMode(10, OUTPUT); /*Led Door*/
}

void loop(){
  digitalWrite(9,LOW); /* Por cuestión de estabilización del sensor*/
  delayMicroseconds(5);
  digitalWrite(9, HIGH); /* envío del pulso ultrasónico*/
  delayMicroseconds(10);
  timeLight=pulseIn(8, HIGH); /* Función para medir la longitud del pulso entrante. Mide el tiempo que transcurrido entre el envío
  del pulso ultrasónico y cuando el sensor recibe el rebote, es decir: desde que el pin 12 empieza a recibir el rebote, HIGH, hasta que
  deja de hacerlo, LOW, la longitud del pulso entrante*/


  digitalWrite(7,LOW); /* Por cuestión de estabilización del sensor*/
  delayMicroseconds(5);
  digitalWrite(7, HIGH); /* envío del pulso ultrasónico*/
  delayMicroseconds(10);
  timeDoor=pulseIn(6, HIGH);
  
  distanceDoor= int(0.017*timeDoor); 
  distanceSensor= int(0.017*timeLight); /*fórmula para calcular la distancia obteniendo un valor entero*/

  if (distanceDoor<=10){
    digitalWrite(10,HIGH);
  }
  else{
    digitalWrite(10,LOW);
  }
  
  if (distanceSensor<=20){
    digitalWrite(11,HIGH);
  }
  else{
    digitalWrite(11,LOW);
  }
  
  
  /*Monitorización en centímetros por el monitor serial*/
  Serial.println("Distancia Luz");
  Serial.println(distanceSensor);
  Serial.println(" cm");
  Serial.println("Distancia Puerta");
  Serial.println(distanceDoor);
  Serial.println(" cm");
  delay(1000);
}
