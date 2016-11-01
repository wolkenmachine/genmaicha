#Examples
### Variables & Mappings

```
a: 5
b: "hello"
c: false

d: (a+5*20) //105
e: b + " " + "world" //hello world
f: false and false //true
```

You can only define a variable once. This is because you are defining a variable *over time*. When one variable changes it's value all the depenant variables update.
```
doubleX: mouseX * 2 //whenever the user moves the mouse, doubleX will update automatically
```

### Functions
Functions take an argument list and define an abstracted mapping that can be used multiple times
```
multiplyAndAdd: (a,b,c) -> a*b+c
multiplyAndAdd(1, 2, 3) //five
multiplyAndAdd(3, 2, 1) //seven
```
Multiline functions are defined by using indentation. The last line is the implied return.
```
multiplyAndAdd: (a,b,c) ->
	d:a*b
	d+c

multiplyAndAdd(1, 2, 3) //five
```

### When statements
*when* is Genmaicha's version of *if*. You can assign variables based on conditionals.
```
name: when id==5: "foo" else: "bar"
```

### Arrays
An array is defined with square brackets. They can contain any kind of variable.
```
list: [1,"john",false]
matrix: [[1,2],[3,4]]
```
Arrays can be *unfolded*. Which means that the array gets sequentialized over time, and can be treated just as any other variable.
```
list: [1,2,3]
newlist: unfold list as element: element * 5   //[5,10,15]
```
