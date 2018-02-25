/*A continuación se narra el proceso constructivo, lo primero es crear la clase con las instrucción Class Ave
agregamos sólo dos propiedades, this.aves y this.fondoGrupo */
class Aves {//1
    constructor(){//2
        this.aves;//2
        this.fondoGrupo;//2
    }

    //necesitamos asegurar que todos los recursos del juego estén disponibles, por ello, debemos de crear
    //un método que haga referencia a la carga de estos recursos y que se usa en la función preload,
    //este método se llama carga
    carga(){

        const img1="./recursos/imagenes/flappy0.png";//3 alternativamente podemos usar la declarión de constante
        /*Creamos una nueva propiedad de la clase denominana aveAnimada y esta será una animación, una animación se produce
        con el método loadAnimation(path) talque path es la ruta donde se encuentra el recurso */
        this.aveAnimada=loadAnimation(img1,"./recursos/imagenes/flappy1.png","./recursos/imagenes/flappy2.png");//4
        this.aveMuerta=loadAnimation("./recursos/imagenes/flappy0.png");//4
        //fondos
        /*Si bien es cierto el fondo no es una animación necesitamos cargar su recurso a través de una imagen */
        this.fondoImagen=loadImage("./recursos/imagenes/fondo.png");//4

    }

    crear(){
        /*El objeto principal en todo juego es el sprite , es sobre el que hemos de agregar las animaciones, setear las propiedades, etc
        nosotros podemos crear un sprite, un sprite se crea con el método createSprite(x,y,[w],[h]) x,y son posiciones y w y h son el ancho y alto 
        de la imagen*/
        this.aves=createSprite(width/2,height/2,40,33);//5
        this.aves.addAnimation("volando",this.aveAnimada);//agregamos las animaciones 6
        this.aves.addAnimation("muerte",this.aveMuerta);//6
        //al definir un sprite podemos agregar los colisionadores
        this.aves.setCollider("circle",0,0,20); // colisionador, puede ser de 2 tipos : rectangle o circle, por la forma del objeto nos conviene
        //hacer uso de circle, setCollider("tipo",offsetX,offsetY,w,h) offsex y offsetY hacen referencia al desfase en pixeles respecto al centro
        //como estamos haciendo uso de un circle entonces podemos agregar solo una medida 20 
        this.aves.setVelocity(2,0); //6 configuramos la velocidad inicial del ave
        this.aves.rotateToDirection=true;//6La velocidad es un vector en consecuencia esta propiedad hace que el sprite rote hacia el vector resultante de la velocidad
        this.aves.debug=true; //6 habilitamos la propiedad de debugeo, esto hará que podamos observar un circulo indicando el número del sprite y la dimensión del sprite.

        //Hasta el momento hemos realizado todo lo necesario para setear el sprite del ave
        /*Respecto al fondo, necesitamos crear un efecto de desplazamiento del fondo, sino este quedaría de forma estática, es por ello que el fondo
        también ha de ser un sprite; sin embargo, necesitamos 3 sprites para generar dicho efecto, dado que los comportamientos son los mismos para los 
        3 sprites podemos agruparlos en un arreglo, en p5.play.js un arreglo esta definido como un grupo y se crear a través de la instrucción new Group() */
        this.fondoGrupo=new Group();//7
        for(let i=0;i<3;i++){//7
        /*Creamos todas las instrucciones necesarias como las que hicimos con el ave insertados en un for */
            /*createSprite(x,y,[w],[y]), tomamos énfasis en la posición del fondo, recordemos que son 3 fondos, el primer fondo
            ocupará el tamaño del canvas, y posicionaremos los demás posterior al primero, así también el posicionamiento del ave será un punto
            referencial para el posicionamiento del fondo */
            let fondo=createSprite(this.aves.position.x+width/4+width*i,height/2);//7
            fondo.addImage("fondo",this.fondoImagen);//7
            fondo.setCollider("rectangle",0,0,width,height);//7
            fondo.debug=true;//7
            fondo.depth=-1;//7 depth es una propiedad del sprite que hace referencia a la profundiad del sprite, si lo dejaramos sin esta propiedad
            //el fondo se sobrepondría al ave y no podríamos visualizarla
            fondo.setVelocity(-1,0);//7
            this.fondoGrupo.add(fondo);//7 finalmente agregamos el sprite al grupo.
        }


    }
    //hemos creado ya las configuraciones iniciales del sprite, ahora debemos de crear los métodos de sus movimientos y el como controlarlos
    //estos métodos serán colocados en el draw, dado que requieren una actualización constante de los eventos
    movimiento(){//8
        /* necesitamos evaluar constantemente la posición del fondo respecto al ave, puesto que el ave está avanzando de forma positiva y el fondo
        de forma negativa, cuando se cumpla una distancia que sea el equivalente al ancho esta debe hacer que el fondo se reposiciones en dos posiciones
        del ancho, hay que recordar que al ancho del fondo es el fondo del canvas.*/
        for(let i=0;i<3;i++){//9
            if(this.fondoGrupo[i].position.x<=this.aves.position.x-width){//9
                this.fondoGrupo[i].position.x=2*width+this.aves.position.x;//9
            }
        }
       console.log(this.fondoGrupo[0].position.x);//observamos la posición del fondo con index 0
       this.aves.velocity.y+=0.3;//10 en flappy bird el ave siempre está cayendo con aceleración, sabemos que la aceleración es la variación de la velocidad
       //en el tiempo, es por ello que hacemos que la velocidad varíe.
       /*La cámara es un concepto un tanto complejo, la cámara es lo que hace visible el juego, por defecto al usar la librería esta se instalay ocupa las 
       dimensiones que le otorguemos en el canvas, a continuación desplazamos el canvas 1/4 del ancho ya que el ave se encuentra al medio esto creará el efecto 
       de que el ave está desfasada un w/4 respecto al centro, además dado que el ave está en movimiento, si no movemos la cámara respecto al ave, el ave saldría 
       de la visibilidad del canvas, es por ello que agregamos la posición del ave a la posición de la cámara */
       camera.position.x=width/4+this.aves.position.x; //11
       camera.on();//11 encendemos la cámara.
    }
    /*Hasta el momento le hemos dado movimiento, al ave y el fondo, pero el ave caerá y se saldrá fuera del canvas, por ello debemos de habilitar los controles
    los métodos mouseWentDown(parámetro) y keyWentDown(parámetro) reciben las constantes LEFT y el keycode respectivamente, el keycode de la barra espaciadora es 
    32 */
    controles(){//12
        if(mouseWentDown(LEFT) || keyWentDown(32)){//13
            this.aves.velocity.y=-3;//lo que queremos es que cada vez que se presione la barra o el click izquierdo el ave varie su velocidad en forma negativa
            //recordemos que negativo es hacia arriba.
        }
        //ahora vamos al archivo main
    }



}