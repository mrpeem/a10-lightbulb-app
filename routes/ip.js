
var http = require('http');
var userIP = require('../userIP.json');
var userData = require('../userData.json');
var wholeUserData = require('../wholeUserData.json')
var defaultUserData = require('../defaultUserData.json');
var ipIndex, hostname;

exports.getIPIndex = function()
{
  return ipIndex;
}


 
exports.getIP = function(callback) 
{ 
  // http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) 
  // {
  //   resp.on('data', function(ip) 
  //   {
  //     hostname = require('os').hostname();
  //     callback(ip.toString());
  //   });
  // });
  require('getmac').getMac(function(err, macAddress){
    console.log("in getmac")
    if (err)  throw err
    callback(macAddress.toString())
  });
}




exports.getUserData = function(callback) 
{ 
  console.log("IN GET USER DATA!")
  require('getmac').getMac(function(err, macAddress)
  {
    console.log("in getmac")
    if (err)  throw err
    console.log(macAddress.toString())


  
      var i, ipIndex;

    for (i = 0; i < wholeUserData.length; i++)
    {
      console.log("macAddress = "+macAddress.toString())
      if (macAddress == wholeUserData[i].ip &&
          hostname == wholeUserData[i].hostname)
      {
        console.log("user ip in system");
        ipIndex = i;
        console.log("index = "+i)
        console.log('da fuq?? returning..: ')
        console.log(wholeUserData[i])

        callback(wholeUserData[i]);
        break;
      }

      else if (i == userIP.length - 1)
      {
        console.log("user not in system yet; push to userIP.json");
        console.log("current user data");
        console.log(userData);

        ipIndex = userData.length; 
        console.log("length = "+userData.length)
        userIP.push( {"ip": macAddress, "hostname" : hostname} ); //store IP

        var newUserData = JSON.parse(JSON.stringify(defaultUserData));
        newUserData.userIdNumber = userData.length;
        newUserData.ipIndex = ipIndex;
        newUserData.ip = macAddress;
        newUserData.hostname = hostname;

        console.log("PUSHING THIS SHIT@!!!!!!!!!!!!!")
        console.log("ip index  = "+userData.length)
        console.log(newUserData);
        userData.push(newUserData);      //add new userData to the array
        wholeUserData.push(newUserData);

        callback(newUserData);
        break;
      }
    }

    
  });
}

exports.updateUserData = function(usrData)
{
  console.log("in IP's updateUserData");
  userData[usrData.userIdNumber] = usrData;
};