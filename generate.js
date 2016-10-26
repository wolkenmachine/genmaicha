var fs = require("fs");

var output = 'var sf = require("./stockflow");\n';
output += 'var sfstd = require("./stockflowstd");\n';

function generate(ast){
    ast.map(function(line){
        if(line.type === "assignment"){
            output += "var "+ line.id + " = sf.flow(" + line.val + ");\n";
        }
        if(line.type === "mapping"){
            output += "var "+ line.id + " = "+expression(line.expression)+";\n";
        }
        if(line.type === "expression"){
            output += expression(line)+";\n";
        }
    });
    fs.writeFileSync("output.js", output);
    eval(output);
}

function expression(e){
    if(e.type){
        if (e.type==="expression"){
            var args = e.args.map(function(a){
                return expression(a);
            });
            return "sfstd."+e.mod+"(["+args+"])";
        }

        if(e.type==="flow"){
            return "sf.flow(" + e.val + ")";
        }
    }
    return e;
}

module.exports = generate;
