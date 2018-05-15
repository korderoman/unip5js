var b = p5.board("COM5","arduino");
var boton;


function setup(){
    createCanvas(500,500);
    boton=b.pin(2,"BUTTON");
    boton.read((valor)=>{console.log(valor)});

}




function draw(){

}