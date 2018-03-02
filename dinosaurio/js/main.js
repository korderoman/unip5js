var rex= new Dinosaurios();
var planta= new Cactus();
var ave= new Aves();
var fuente, contador=0, texto,gameOver=false;
var imagenBoton;
var boton;

function preload(){
    rex.cargar();
    planta.cargar();
    ave.cargar();
    fuente=loadFont("./recursos/imagenes/GeBody.ttf");
    imagenBoton=loadImage("./recursos/imagenes/reset.png");
    imagenGameOver=loadImage("./recursos/imagenes/gameOver.png");
}

function setup(){
    createCanvas(600, 400);
    rex.crear();
    planta.crearGrupo();
    ave.crearGrupo();
   boton=createImg("./recursos/imagenes/reset.png").position(width/2,height/2);
   boton.hide();
   boton.mousePressed(juegoNuevo);
    //fuente=loadFont("./recursos/imagenes/GeBody.ttf",miTexto);
   miTexto();
    setInterval(function () {if(gameOver==false){contador++;}  },100);
    setInterval(function () {planta.velocidadCactus-=0.2; ave.velocidadAve-=0.2;  },3000);

   
}

function draw(){
   

    rex.movimiento();
    rex.controles();
    planta.apareceryMover();
    ave.aparecerMover();
    planta.muerte();
    ave.muerte();
    rex.muerte(planta.cactusGrupo,ave.aveGrupo);
   
    drawSprites();
    
    
   
    text(""+contador, width-100, 50);
    if(gameOver){
        boton.show();
        image(imagenGameOver, width/2-30, height/2+30);
    }

}

//funciones de gestión del juego
function juegoTerminado(){
   rex.dino.changeAnimation("muerto");
   gameOver=true;
   updateSprites(false);
}

function juegoNuevo(){
    planta.cactusGrupo.removeSprites();
    ave.aveGrupo.removeSprites();
    planta.velocidadCactus=-4;
    ave.velocidadAve=-4;
    contador=0;
    gameOver=false;
    updateSprites(true);
    boton.hide();
}

function miTexto(){
    textSize(36);
    fill('#ED225D');
    textFont(fuente);     
}


