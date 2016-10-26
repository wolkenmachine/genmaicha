// myparser.js
var fs = require("fs");
var jison = require("jison");
var generate = require("./generate");

var bnf = fs.readFileSync("grammar.jison", "utf8");
var parser = new jison.Parser(bnf);

var input = fs.readFileSync("test.sf", "utf8");

var ast = parser.parse(input);
console.log(ast);
generate(ast);
//module.exports = parser;
