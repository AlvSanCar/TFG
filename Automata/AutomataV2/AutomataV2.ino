#include <UTFT_SPI.h>
#include <Wire.h>
#include <ArduCAM.h>
#include <SPI.h>
#include <SoftwareSerial.h>


// set pin 10 as the slave select for the digital pot:
const int SPI_CS = 10;

ArduCAM myCAM(OV5642,10);
UTFT myGLCD(SPI_CS);

SoftwareSerial BT1(3, 2); // RX | TX
String ssid = "MOVISTAR_BFA9";
String pass = "2Xwumqt6f7vx2pini263";
String ip_server   = "192.168.1.33";
String port_server = "8080";

String consulta;

//Datos Robot SL
int IRR = 9;
int IRL = 8;
int IRC = 20;

//MOTOR A --> Rueda derecha
int ENA = 6;
int IN1 = 13;
int IN2 = 12;

//MOTOR B --> Rueda Izquierda
int ENB = 5;
int IN3 = 11;
int IN4 = 10;

int vel = 100;

int Trigger = 21;
int Echo = 22;
int plaza = 0;
String eslibre = "1";


void setup()
{
  Serial.begin(9600);
 BT1.begin(9600);
  //Configuración modulo ESP
  ConfigurarModulo();
  int es_linked = ConectarHTTPServer();
 
 //Configuración Arducam
  uint8_t vid,pid;
  uint8_t temp;
  #if defined (__AVR__)
    Wire.begin(); 
  #endif
  #if defined(__arm__)
    Wire1.begin(); 
  #endif
  Serial.begin(115200);
  Serial.println("ArduCAM Start!"); 

  // set the SPI_CS as an output:
  pinMode(SPI_CS, OUTPUT);

  // initialize SPI:
  SPI.begin(); 
  //Check if the ArduCAM SPI bus is OK
  myCAM.write_reg(ARDUCHIP_TEST1, 0x55);
  temp = myCAM.read_reg(ARDUCHIP_TEST1);
  if(temp != 0x55)
  {
    Serial.println("SPI interface Error!");
    while(1);
  }
  
  //Change MCU mode
  myCAM.write_reg(ARDUCHIP_MODE, 0x00);

  //Check if the camera module type is OV5642
  myCAM.rdSensorReg16_8(OV5642_CHIPID_HIGH, &vid);
  myCAM.rdSensorReg16_8(OV5642_CHIPID_LOW, &pid);
  if((vid != 0x56) || (pid != 0x42))
    Serial.println("Can't find OV5642 module!");
  else
    Serial.println("OV5642 detected");
  
  //Change to JPEG capture mode and initialize the OV5642 module  
  myCAM.set_format(JPEG);
  myCAM.InitCAM();
  myCAM.write_reg(ARDUCHIP_TIM, VSYNC_LEVEL_MASK);    //VSYNC is active HIGH

  //Definicion SigueLineas
  pinMode (ENA, OUTPUT);
  pinMode (IN1, OUTPUT);
  pinMode (IN2, OUTPUT);
  pinMode (ENB, OUTPUT);
  pinMode (IN3, OUTPUT);
  pinMode (IN4, OUTPUT);
  pinMode (IRR, INPUT);
  pinMode (IRL, INPUT);
  pinMode (IRC, INPUT);
  pinMode(Trigger, OUTPUT); //pin como salida
  pinMode(Echo, INPUT);  //pin como entrada
  digitalWrite(Trigger, LOW);//Inicializamos el pin con 0

}

void loop()
{
  
  uint8_t temp,temp_last;
  uint8_t start_capture = 0;
  int sensorL, sensorR,sensorC;
  int coche = 0;
  sensorL = digitalRead(IRL);
  sensorR = digitalRead(IRR);  
  sensorR = digitalRead(IRC);

  if ( sensorR == 0 && sensorL == 0 && sensorC == 0){
    Stop();
  }
  if (sensorR == 1 && sensorL == 1 && sensorC == 1 )
   {
    Stop();
    coche = comprobarPlaza();
    if (coche == 1){
      myCAM.flush_fifo();
      myCAM.clear_fifo_flag();   
      //Start capture
      myCAM.start_capture();
      if(myCAM.read_reg(ARDUCHIP_TRIG) & CAP_DONE_MASK)
      {
        Serial.println("Capture Done!");
    
        while( (temp != 0xD9) | (temp_last != 0xFF) )
        {
          temp_last = temp;
          temp = myCAM.read_fifo();
          Serial.write(temp);
        }

        //Clear the capture done flag 
         myCAM.clear_fifo_flag();
         EnviarDatos(plaza,eslibre,temp);
      }
      
    }
    
   }
   if (sensorL == 0 && sensorC == 0 && sensorR == 1)
   {
    Right();
   }
   if (sensorL == 0 && sensorC == 1 && sensorR == 0)
   {
    Forward();
   }
   if (sensorL == 0 && sensorC == 1 && sensorR == 1)
   {
    Right();
   }

   if (sensorL == 1 && sensorC == 0 && sensorR == 0)
   {
    Left();
   }
   if (sensorL == 1 && sensorC == 1 && sensorR == 0)
   {
    Left();
   }




 
}

void ConfigurarModulo() {
  BT1.println("AT");
  if (BT1.find("OK")) {
    Serial.println("Configuramos ESP8266");
    BT1.setTimeout(5000);
    BT1.flush();
    BT1.println("AT+CWMODE=1");
    //Serial.println("Modo correcto");
    BT1.flush();
    BT1.println("AT+CWJAP=\"" + ssid + "\",\"" + pass + "\"");
    BT1.setTimeout(10000);
    if (BT1.find("OK")) {
      Serial.println("Conectado a WIFI");
    }
    else {
      BT1.println("AT+CWJAP?");
      if (BT1.find("OK")) {
        Serial.println("Ya conectado WIFI");
        BT1.flush();
        BT1.println("AT+CIPMUX=0");
        if (BT1.find("OK")) {
          Serial.println("Estableciendo Numero de Conexiones");
          BT1.flush();
        }
        else {
          Serial.println("Error conexiones");
        }
      }
      else {
        Serial.println("ERROR AT");
      }
    }
  }
}

int ConectarHTTPServer() {
  BT1.flush();
  BT1.println("AT+CIPSTART=\"TCP\",\"" + ip_server + "\"," + port_server);
  if (BT1.find("Linked")) {
    Serial.println("Conectado al servido HTTP");
    return 1;
  }
  else
    Serial.println("Error conexion servidor HTTP");
  return 0;

}

void EnviarDatos(String plaza, String eslibre,uint8_t frame ) {

  consulta = "GET " + plaza + "&" + eslibre + "&" + frame + " HTTP/1.1";
  BT1.println("AT+CIPSEND=" + String(consulta.length(), DEC));
  if (BT1.find(">")) {
    Serial.println("Esperando envio");
    BT1.println(consulta);
  }
}

void Forward () {
  //MOTOR A --> Rueda derecha
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, vel);

  //MOTOR B --> Rueda Izquierda
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW );
  analogWrite(ENB, vel);
}

void Back () {
  //MOTOR A --> Rueda derecha
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, vel);

  //MOTOR B --> Rueda Izquierda
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENB, vel);
  
}

void Right (){
//MOTOR A --> Rueda derecha
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, vel);

  //MOTOR B --> Rueda Izquierda
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, vel);

}

void Left (){
//MOTOR A --> Rueda derecha
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, vel);

  //MOTOR B --> Rueda Izquierda
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, HIGH);
  analogWrite(ENB, vel);

}



void Stop (){
//MOTOR A --> Rueda derecha
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, vel);

//MOTOR B --> Rueda Izquierda
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  analogWrite(ENB, vel);

}

int comprobarPlaza(){
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);          //Enviamos un pulso de 10us
  digitalWrite(Trigger, LOW);
  int t;
  int d;

  t = pulseIn(Echo, HIGH); //obtenemos el ancho del pulso
  d = t/59;    

  if (d <= 75)
    return 1;
  else
    return 0;
}

