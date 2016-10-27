
//var sf = require("./stockflow");

var sfstd = {};

var timer = function(input){
    var speed = input[0].get();
    var time = sf.flow(0);
    setInterval(function(){
        time.set(time.get()+1);
    }, speed);
    return time;
};

var watch = function(input){
    input[0].connect(function(value){
        console.log(""+": "+value);
    });
    return input;
};

/* math */
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

/* boolean logic */
sfstd.is = function(inputflows){
    return sf.map(inputflows, function(a,b){return a===b;});
};

sfstd.isnt = function(inputflows){
    return sf.map(inputflows, function(a,b){return a!==b;});
};

sfstd.larger = function(inputflows){
    return sf.map(inputflows, function(a,b){return a>b;});
};

sfstd.smaller = function(inputflows){
    return sf.map(inputflows, function(a,b){return a<b;});
};

sfstd.largeroris = function(inputflows){
    return sf.map(inputflows, function(a,b){return a>=b;});
};

sfstd.smalleroris = function(inputflows){
    return sf.map(inputflows, function(a,b){return a<=b;});
};
//module.exports = sfstd;
