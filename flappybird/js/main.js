ave = new Aves();//15 creamos una instancia de la clase aves

function preload(){
    ave.carga();//16 usamos el método que carga los recursos

}


function setup(){
    createCanvas(502, 632); //creamos el canvas a la medida del fondo
    ave.crear();//17 ejecutamos el método que crear los sprites y el grupo

}


function draw(){
    ave.movimiento();//18
    ave.controles();//19
    drawSprites();//20

}

