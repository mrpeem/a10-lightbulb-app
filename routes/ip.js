var http = require('http');
var userIP = require('../userIP.json');
var userData = require('../userData.json');
var defaultUserData = require('../defaultUserData.json');
var ipIndex, hostname;

exports.getIPIndex = function()
{
  return ipIndex;
}


 
function getIP() 
{ 
  return new Promise(function(resolve, reject) 
  {
    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) 
    {
      resp.on('data', function(ip) 
      {
        hostname = require('os').hostname();
        resolve(ip.toString());
      });
    });
  });
}

exports.getUserData = async function main() {
  var ip = await getIP();

  var i, ipIndex;
  for (i = 0; i < userIP.length; i++)
  {
    if (ip == userIP[i].ip &&
        hostname == userIP[i].hostname)
    {
      console.log("user ip in system");
      ipIndex = i;
      return userData[ipIndex];
    }
  }
  console.log("user not in system yet; push to userIP.json");

  ipIndex = userIP.length; 
  userIP.push( {"ip": ip, "hostname" : hostname} ); //store IP
  console.log(userIP[ipIndex]);

  var newUserData = JSON.parse(JSON.stringify(defaultUserData));
  newUserData.ipIndex = ipIndex;
  newUserData.ip = ip;
  newUserData.hostname = hostname;

  userData.push(newUserData);      //add new userData to the array
  

  return userData[ipIndex];

}

exports.updateUserData = function(usrData)
{
  userData = usrData;
};