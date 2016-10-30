// myparser.js
var fs = require("fs");
var jison = require("jison");
var generate = require("./generate");

var bnf = fs.readFileSync("grammar.jison", "utf8");

var parser = new jison.Parser(bnf);


var input = fs.readFileSync("test.sf", "utf8");

var lexer = parser.lexer,
    token;
lexer.setInput(input);
while (!lexer.done) {
    token = lexer.lex();
    /* Look up the token name if necessary */
    if (token in parser.terminals_) {
       token = parser.terminals_[token];
    }
    console.log('<' + token + ', ' + lexer.yytext + '>');
}

var ast = parser.parse(input);
console.log(JSON.stringify(ast, null, 4));
generate(ast);
//module.exports = parser;
