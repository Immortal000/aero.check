const int gasSensor_0 = 0; // multi gas? 
const int gasSensor_1 = 1; // carbon monoxide
const int gasSensor_2 = 2; // smoke
const int gasSensor_3 = 3; // butane , propane (sensitive) 

void setup(){
  Serial.begin(9600);      // sets the serial port to 9600
}
void loop(){
  float voltage_0; // voltage values to be sent to javascript 
  float voltage_1;
  float voltage_2;
  float voltage_3;

  voltage_0 = getCO(gasSensor_0); // functions to read gas sensor values, manually calibrated
  voltage_1 = getVoltage(gasSensor_1);
  voltage_2 = getSmoke(gasSensor_2);
  voltage_3 = getButane(gasSensor_3);


  Serial.print(voltage_0); // multi gas 
  Serial.print(",");
  Serial.print(voltage_1); // CO
  Serial.print(","); 
  Serial.print(voltage_2); // smoke 
  Serial.print(",");
  Serial.println(voltage_3); // butane

  // Serial.println(voltage);
  delay(500);
}

float getButane(int pin)
{
  return (analogRead(pin));
}

float getCO(int pin)
{
  return (analogRead(pin));
}

float getSmoke(int pin)
{
  return (analogRead(pin));
}

float getVoltage(int pin){
  return (analogRead(pin) * 3);
}
