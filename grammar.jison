/* lexical grammar */
%lex

%%
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
[a-zA-Z]+             return 'ID';
':'                   return 'EQUALS';
','                   return 'COMMA';
'('                   return 'LP';
')'                   return 'RP';
'+'                   return 'ADD';
'-'                   return 'MIN';
'*'                   return 'TIMES';
'/'                   return 'DIVIDE';
\"[^\"]*\"            return 'STRING';

\n\s*                 return 'EOL';
<<EOF>>               return 'EOF';
[^\S\n]+              /* skip whitespace */


/lex
%left ADD MIN
%left TIMES DIVIDE
%left E

%start PROGRAM

%% /* language grammar */

PROGRAM
    : LINES EOF
        {return $1}
    ;

LINES
    : LINE EOL
        {$$ = [$1];}
    | LINE EOL LINES
        {$$ = [$1].concat($3);}
    ;

LINE
    : MAPPING
        {$$ = $1;}
    | E
        {$$ = $1;}
    ;

MAPPING
    : ID EQUALS E
        {$$ = {type: "mapping", id: $1, expression: $3}}
    ;

E
    : ID
        {$$=$1}
    | NUMBER
        {$$={type: "flow", val: $1}}
    | STRING
        {$$={type: "flow", val: $1}}
    | ID LP LIST RP
        {$$ = {type: "expression", mod: $1, args: $3}}
    | E ADD E
        {$$ = {type: "expression", mod: "add", args: [$1,$3]}}
    | E MIN E
        {$$ = {type: "expression", mod: "min", args: [$1,$3]}}
    | E TIMES E
        {$$ = {type: "expression", mod: "mult", args: [$1,$3]}}
    | E DIVIDE E
        {$$ = {type: "expression", mod: "div", args: [$1,$3]}}
    ;

LIST
    : E
        {$$ = [$1];}
    | E COMMA
        {$$ = [$1];}
    | E COMMA E
        {$$ = [$1].concat($3);}
    ;
