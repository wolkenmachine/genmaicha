
var sf = require("./stockflow");

sfstd = {};

sfstd.timer = function(input){
    var speed = input[0].get();
    var time = sf.flow(0);
    setInterval(function(){
        time.set(time.get()+1);
    }, speed);
    return time;
};

sfstd.watch = function(input){
    input[0].connect(function(value){
        console.log(""+": "+value);
    });
    return input;
};

sfstd.add = function(inputflows){
    return sf.map(inputflows, function(a,b){return a+b;});
};

sfstd.min = function(inputflows){
    return sf.map(inputflows, function(a,b){return a-b;});
};

sfstd.mult = function(inputflows){
    return sf.map(inputflows, function(a,b){return a*b;});
};

sfstd.div = function(inputflows){
    return sf.map(inputflows, function(a,b){return a/b;});
};

module.exports = sfstd;
