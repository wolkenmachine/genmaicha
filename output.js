var sf = require("./stockflow");
var sfstd = require("./stockflowstd");
var a = sf.flow("hello how are you");
sfstd.watch([a]);
