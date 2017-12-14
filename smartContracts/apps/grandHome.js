//import metacoin_artifacts from '../../build/contracts/MetaCoin.json'

// Import libraries
var Web3            = require('web3'),
    contract        = require("truffle-contract"),
    path            = require('path')
    MyContractJSON  = require(path.join(__dirname, './contracts/GrandHouse.json'));

// Setup RPC connection   
var provider    = new Web3.providers.HttpProvider("http://localhost:7545");

// Read JSON and attach RPC connection (Provider)
var GrandHouse = contract(MyContractJSON);
GrandHouse.setProvider(provider);

var account_one = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"; // an address
var account_two = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
var meta;
/*
MetaCoin.new().then(function(instance) {
  // Print the new address
  console.log(instance.address);
}).catch(function(err) {
  // There was an error! Handle it.
});*/


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


GrandHouse.deployed().then(function(instance) {
  //console.log(instance);
  meta = instance;
  //return meta.createHome(account_two, 'yaya', {from: account_one, gas: 200000});
  return meta.getMyHome(account_two, {from: account_one});
  //return meta.addDevice(account_two, stringToHex('puerta'), {from: account_one});
  //return meta.getMyHome(account_two, {from: account_one});
  
  //return meta.getMyHome(account_two, {from: account_two});
})
.then(function(result) {
    console.log(result);
    console.log(hexToString(result[0][0]))

})
.catch(function(e) {
  console.log("error", e)
});

/*
// Use Truffle as usual
MyContract.deployed().then(function(instance) {
    return instance.myFunction.call(arg1, arg2, {from: '0x************************'})

}).then(function(result) {
    console.log(result);

}, function(error) {
    console.log(error);
}); 
*/
/*
var meta;
MetaCoin.deployed().then(function(instance) {
  meta = instance;
  return meta.sendCoin(account_two, 10, {from: account_one});
}).then(function(result) {
  // If this callback is called, the transaction was successfully processed.
  alert("Transaction successful!")
}).catch(function(e) {
  // There was an error! Handle it.
})
*/