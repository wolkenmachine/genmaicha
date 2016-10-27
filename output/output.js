var multandadd = function($){var a=$[0];var b=$[1];var c=$[2];var d = sfstd.mult([sf.flow(5),c]);var e = sfstd.add([a,sfstd.mult([c,b])]);return sfstd.mult([e,sf.flow(500)]);};
var a = multandadd([sf.flow(1),sf.flow(2),sf.flow(3)]);
watch([a]);
