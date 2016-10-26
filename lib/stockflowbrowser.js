var mouseX = sf.flow(0);
var mouseY = sf.flow(0);
var mouseDown = sf.flow(false);
var mouseClick = sf.flow(false);

window.addEventListener("mousemove", function(e){
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);

    if(mouseClick.get()){
        mouseDown.set(true);
    } else {
        mouseDown.set(false);
    }
}, false);


window.addEventListener("mousedown", function(e){
    mouseClick.set(true);
    mouseDown.set(true);
}, false);


window.addEventListener("mouseup", function(e){
    mouseClick.set(false);
    mouseDown.set(false);
}, false);
