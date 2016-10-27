/* lexical grammar */
%lex

%%
/* control logic */
'when'                return 'WHEN';
'then'                return 'THEN';
'else'                return 'ELSE';

/* operators */
':'                   return 'SET';
','                   return 'COMMA';
'('                   return 'LP';
')'                   return 'RP';
'->'                  return 'FNC';

/* math */
'+'                   return 'ADD';
'-'                   return 'MIN';
'*'                   return 'TIMES';
'/'                   return 'DIVIDE';

/* boolean logic */
'=='                  return 'IS';
'is'                  return 'IS';
'!='                  return 'ISNT';
'isnt'                return 'IS';
'!'                   return 'NOT';
'not'                 return 'NOT';
'>'                   return 'LARGER';
'<'                   return 'SMALER';
'>='                  return 'LARGERORIS';
'<='                  return 'SMALERORIS';
'and'                 return 'AND';
'&&'                  return 'AND';

/* literals and variables */
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
\"[^\"]*\"            return 'STRING';
'true'                return 'TRUE';
'false'               return 'FALSE';
[a-zA-Z]+             return 'ID';

/* whitespace */
\n\s*                 return 'EOL';
<<EOF>>               return 'EOF';
[^\S\n]+              /* skip whitespace */


/lex
%left FNC
%left ADD MIN
%left TIMES DIVIDE

%left IS ISNT LARGER SMALLER LARGERORIS SMALLERORIS
%left WHEN THEN ELSE


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
    | WHENSTATEMENT
        {$$ = $1;}
    | E
        {$$ = $1;}
    ;

MAPPING
    : ID SET E
        {$$ = {type: "mapping", id: $1, expression: $3}}
    ;

E
    : ID
        {$$=$1}
    | NUMBER
        {$$={type: "flow", val: $1}}
    | STRING
        {$$={type: "flow", val: $1}}
    | BOOLEAN
        {$$={type: "flow", val: $1}}
    | LP LIST RP FNC E
        {$$ = {type: "mapper", args: $2, expression:$5}}
    | ID LP LIST RP
        {$$ = {type: "expression", mod: $1, args: $3}}
    | ID LP RP
        {$$ = {type: "expression", mod: $1, args: []}}
    | WHEN E THEN E ELSE E
        {$$ = {type: "when", expression: $2, then: $4, else: $6}}
    | E ADD E
        {$$ = {type: "stdexpression", mod: "add", args: [$1,$3]}}
    | E MIN E
        {$$ = {type: "stdexpression", mod: "min", args: [$1,$3]}}
    | E TIMES E
        {$$ = {type: "stdexpression", mod: "mult", args: [$1,$3]}}
    | E DIVIDE E
        {$$ = {type: "stdexpression", mod: "div", args: [$1,$3]}}
    | E IS E
        {$$ = {type: "stdexpression", mod: "is", args: [$1,$3]}}
    | E LARGER E
        {$$ = {type: "stdexpression", mod: "smaller", args: [$1,$3]}}
    | E SMALLER E
        {$$ = {type: "stdexpression", mod: "larger", args: [$1,$3]}}
    | E LARGERORIS E
        {$$ = {type: "stdexpression", mod: "smalleroris", args: [$1,$3]}}
    | E SMALLERORIS E
        {$$ = {type: "stdexpression", mod: "largeroris", args: [$1,$3]}}
    ;

BOOLEAN
    : TRUE
        {$$ = true}
    | FALSE
        {$$ = false}
    ;

LIST
    : LISTELEM
        {$$ = [$1];}
    | LISTELEM COMMA LIST
        {$$ = [$1].concat($3);}
    ;

LISTELEM
    : E
        {$$ = $1;}
    ;
