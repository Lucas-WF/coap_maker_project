#include <WiFi.h>
#include <coap-simple.h>
#include <WiFiUdp.h>

#define SUCCESS_RESPONSE "Success"
#define BLUE_LED 2

WiFiUDP Udp;
Coap coap(Udp);

void callback_do_something(CoapPacket &packet, IPAddress ip, int port);
       
void setup(){
  Serial.begin(115200);

  pinMode(BLUE_LED, OUTPUT);

  WiFi.mode(WIFI_STA);
       
  // Place the ssid and password
  WiFi.begin("", "");
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println(WiFi.status());
  }

  digitalWrite(BLUE_LED, HIGH);
  
  Serial.println(WiFi.localIP());

  coap.server(callback_do_something, "route");
  coap.start();

}
    
void loop(){
  delay(1000);
  coap.loop();
}

void callback_do_something(CoapPacket &packet, IPAddress ip, int port) {

  coap.sendResponse(ip, port, packet.messageid, SUCCESS_RESPONSE, sizeof(SUCCESS_RESPONSE), COAP_CREATED, COAP_TEXT_PLAIN, packet.token, packet.tokenlen);
  Serial.println(SUCCESS_RESPONSE);

  delay(5000);

  return;
}
