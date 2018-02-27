var rex= new Dinosaurios();
var planta= new Cactus();

function preload(){
    rex.cargar();
    planta.cargar();

}

function setup(){
    createCanvas(600, 400);
    rex.crear();
    planta.crearGrupo();
}

function draw(){
    background(0);
    rex.movimiento();
    rex.controles();
    planta.apareceryMover();
    planta.muerte();
    rex.muerte(planta.cactusGrupo);


    drawSprites();
}

//funciones de gestión del juego
function juegoTerminado(elementoGrupo,evento){
    console.log("Muerto");
}