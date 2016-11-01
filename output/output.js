var func = function($){
var a=$[0];var b=$[1];var c=$[2];return sfstd.mult([sfstd.mult([a,b]),c]);
};
var val = sf.when(sfstd.smaller([mouseX,sf.flow(500)]),sf.flow(true),sf.flow(false));
watch([val]);
