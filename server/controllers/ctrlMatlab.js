/*This was to test The Matlab production server, it was abondend because we can't add methods dinammically
*/


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var resultMethod;
exports.create = function (req, res) { 
           //Use MPS RESTful API to specify params using JSON
           var params = {
           	"nargout": 1,
           	"rhs": ["E:/PFE/PFE/PlateForme/PFEV0/Jupiter/matlab/FingerPrint/F001/finger.png"],
           	"outputFormat": {"mode": "small"}};
           	var result;
           	method("",params,function(responseText) {
           		var params2 = {   "nargout": 1,
           		"rhs": [ responseText],
           		"outputFormat": {"mode": "small"}}; 
           		method2("",params2,function(respons) {
           			res.json(respons);
           		});
           	});
           }

           function method(name,params,cb ) {
           	var request = new XMLHttpRequest();

//Use MPS RESTful API to specify URL
var url = "http://localhost:9910/readfromurl/readfromurl";
request.open("POST", url);

            //Use MPS RESTful API to set Content-Type
            request.setRequestHeader("Content-Type", "application/json");

            request.onload = function()
            {   //Use MPS RESTful API to check HTTP Status
            	if (request.status == 200) 
            	{
                    // Deserialization: Converting text back into JSON object
                    // Response from server is deserialized 
                    var result = JSON.parse(request.responseText);

                    //Use MPS RESTful API to retrieve response in "lhs"
                    if('lhs' in result)
                    {  
                     	//console.log("hhh2"+reslt);
                     	cb( result.lhs[0].mwdata);  }
                     	else { return "Error: " + result.error.message; }
                     }
                     else {
                     	return request.statusText; }
                     	return "Status: " + request.status + "<br>"
                     	+ "Status message: " + request.statusText + "<br>" +
                     	"Response text: " + request.responseText;
                     } 
            //Serialization: Converting JSON object to text prior to sending request
            request.send(JSON.stringify(params)); 
            
          }  

          function method2(name,params,cb) {
//Use MPS RESTful API to specify URL
var request = new XMLHttpRequest();

var url = "http://localhost:9910/pretrait/normalise";
request.open("POST", url);

            //Use MPS RESTful API to set Content-Type
            request.setRequestHeader("Content-Type", "application/json");
            request.onload = function()
            {   //Use MPS RESTful API to check HTTP Status
            	if (request.status == 200) 
            	{
                    // Deserialization: Converting text back into JSON object
                    // Response from server is deserialized 
                    var result = JSON.parse(request.responseText);

                    //Use MPS RESTful API to retrieve response in "lhs"
                    if('lhs' in result)
                    {  
                     	//console.log("hhh2"+reslt);
                     	cb( result.lhs[0].mwdata);  }
                     	else { cb("Error: " + result.error.message); }
                     }
                     else {
                     	cb(  request.statusText); }
                     	console.log( "Status: " + request.status + "<br>"
                     		+ "Status message: " + request.statusText + "<br>" +
                     		"Response text: " + request.responseText);
                     } 
            //Serialization: Converting JSON object to text prior to sending request
            request.send(JSON.stringify(params)); 
            return request.onload();
          }  

