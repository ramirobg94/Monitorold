
pragma solidity ^0.4.4;

contract GrandHouse {

	struct Alert {
		uint idAlert; // "Habitacion"
		address owner; // 0x..
		address hub;
		bytes32 alertName;
		bytes32 range; // "12:30,15:40"
		bool state; // on/off
		uint port;
	}

	struct Device {
		uint idDevice; //hub+numberOfDevices
		address owner;
		address hub;
		bytes32 deviceName;
		uint port;
	}

	struct Home {
		address owner; // 0x..
		address hub; // 0x..
		bytes32 name;
		uint[] idDevices; // ["idDevices"]
		uint[] idAlerts;
	}

	uint numberOfDevices;
	uint numberOfAlerts;

	mapping(uint => Alert) private alertsList;
	mapping(address => Home) private homesList;
	mapping(uint => Device) private devicesList;

	function createHome(address hub, bytes32 name) public returns(bool success) {

			Home memory homeNew; 
			homeNew.hub = hub;
			homeNew.owner = msg.sender;
			homeNew.name = name;

			homesList[hub] = homeNew;

	        return true;	
	}

	function addDevice(address hub, bytes32 deviceName, uint port) public returns(bool success){
			
			Device memory deviceNew;
			deviceNew.idDevice = numberOfDevices;
			deviceNew.deviceName = deviceName;
			deviceNew.owner = msg.sender;
			deviceNew.hub = hub;
			deviceNew.port = port;

			homesList[hub].idDevices.push(numberOfDevices);
			devicesList[numberOfDevices] = deviceNew;
			numberOfDevices++;

			return true;
	}

	function addAlert(address hub, bytes32 alertName, bytes32 range, uint port) returns(bool success){
		
		Alert memory alertNew;
		alertNew.idAlert = numberOfAlerts;
		alertNew.owner = msg.sender;
		alertNew.hub = hub;
		alertNew.alertName = alertName;
		alertNew.range = range;
		alertNew.port = port;
		alertNew.state = true;

		homesList[hub].idAlerts.push(numberOfAlerts);
		alertsList[numberOfAlerts] = alertNew;
		numberOfAlerts++;

		return true;
	}

	function getMyHome(address hub) public view returns(address, address, bytes32, uint[], uint[] ) {
		require(homesList[hub].owner == msg.sender || homesList[hub].hub == hub);
		return (homesList[hub].owner, homesList[hub].hub, homesList[hub].name, homesList[hub].idDevices, homesList[hub].idAlerts);
		//return homesList[hub];
	}

	function getAlertById(uint idAlert) public constant returns(uint, address, address, bytes32, bytes32, bool, uint){
		//require( alertsList[idAlert].owner == msg.sender);
		return ( alertsList[idAlert].idAlert, alertsList[idAlert].owner, alertsList[idAlert].hub, alertsList[idAlert].alertName, alertsList[idAlert].range, alertsList[idAlert].state, alertsList[idAlert].port );
	}

	function getDeviceById(uint idDevice) public constant returns(uint, address, address, bytes32, uint){
		//require( devicesList[idDevice].owner == msg.sender);
		return ( devicesList[idDevice].idDevice, devicesList[idDevice].owner, devicesList[idDevice].hub, devicesList[idDevice].deviceName, devicesList[idDevice].port );
	}

	function switchAlert(uint idAlert) public returns(bool success) {
		require( alertsList[idAlert].owner == msg.sender );
		if( alertsList[idAlert].state == true ) {
			alertsList[idAlert].state = false;
		} else {
			alertsList[idAlert].state = true;
		}
		return true;
	}

	function removeAlert(uint idAlert, address hub) public returns(bool success) {
		require( alertsList[idAlert].owner == msg.sender );
		delete alertsList[idAlert];
		delete homesList[hub].idAlerts[idAlert];
		return true;
	}

	function removeDevice(uint idDevice, address hub) public returns(bool success) {
		//first it is necesary remove all the alerts	
		require( devicesList[idDevice].owner == msg.sender );
		delete devicesList[idDevice];
		delete homesList[hub].idDevices[idDevice];
		return true;
	}

}