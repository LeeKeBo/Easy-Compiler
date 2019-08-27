var exec = require('child_process').exec;

var subPro = exec("DIR",function(error){

});
console.log(subPro.pid);

