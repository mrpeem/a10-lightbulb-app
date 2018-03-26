
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
      if (macAddress == wholeUserData[i].ip &&
          hostname == wholeUserData[i].hostname)
      {
        console.log("user ip in system");
        //console.log(wholeUserData);
        ipIndex = i;
        console.log("index = "+i)
        console.log('da fuq?? returning..: ') 
        if (wholeUserData[i].email == null) //logging out
        {
          callback(userData[i]);
          break;
        }
        else //logging in 
        {
          console.log(wholeUserData[i])

          wholeUserData[i].loginStatus = true;

          callback(wholeUserData[i]);
          break;
        }
      }

      else if (i == wholeUserData.length - 1)
      {
        console.log("user not in system yet; push to userIP.json");
        console.log("current user data");
        console.log(userData);

        userIP.push( {"ip": macAddress, "hostname" : hostname} ); //store IP

        var newUserData = JSON.parse(JSON.stringify(defaultUserData));
        newUserData.userIdNumber = wholeUserData.length;
        newUserData.ipIndex = wholeUserData.length;
        newUserData.ip = macAddress;
        newUserData.hostname = hostname;

        console.log("PUSHING THIS SHIT@!!!!!!!!!!!!!")
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