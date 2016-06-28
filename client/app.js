/*

console.log("START");

var canvasDiv = document.getElementById("canvasDiv");

console.log(canvasDiv);

var canvas = document.createElement("canvas");

canvas.setAttribute("width", 600);
canvas.setAttribute("height", 600);
canvas.setAttribute("id", "canvas");
canvasDiv.appendChild(canvas);

if (typeof G_vmlCanvasManager != 'undefined'){
    canvas = G_vmlCanvasManager.initElement(canvas);
}

var context = canvas.getContext("2d");


context.rect(0,0,600,600);
context.stroke();




console.log(podatoci.length);

for (var i=0; i<podatoci.length; i++){
    var shot = podatoci[i];

    if (shot.made == 1) {
        context.beginPath();
        context.arc(shot.x + 300, shot.y + 50, 1, 0, 2 * Math.PI);
        //context.moveTo(shot.x+300,shot.y+300);
        //context.lineTo(100,250);
        context.stroke();
    }
}

context.scale(-1, 1);



*/
