class Dinosaurios{
        constructor(){
            this.velocidadFondo=-2;
        }
        
    cargar(){
        const direccion="./recursos/imagenes/"
        const img1="init0.png", img2="run0.png", img3="run1.png", img4="dead.png";
        const img5="aba0.png",img6="aba1.png";
        this.dinoInicio=loadAnimation(direccion+img1);
        this.dinoCorre=loadAnimation(direccion+img2,direccion+img3);
        this.dinoMuere=loadAnimation(direccion+img4);
        this.dinoAgachado=loadAnimation(direccion+img5,direccion+img6);

        this.fondoImagen=loadImage("recursos/imagenes/fondo.png");
    }

    crear(){
        this.dino=createSprite(width/2,height-40);
        this.dino.addAnimation("inicio",this.dinoInicio);
        this.dino.addAnimation("correr",this.dinoCorre);
        this.dino.addAnimation("muerto", this.dinoMuere);
        this.dino.addAnimation("agachado",this.dinoAgachado);
        //this.dino.setCollider("rectangle",0,0,30,40);
        this.dino.debug=true;

        //fondo
        this.fondoGrupo=new Group();
        for(let i=0;i<3;i++){
            let fondo=createSprite(width/2+width*i,height/2);
            fondo.addImage("fondo",this.fondoImagen);
            fondo.setCollider("rectangle",0,0,this.fondoImagen.width,this.fondoImagen.height);
            fondo.debug=true;
            fondo.depth=-1;
            fondo.setVelocity(this.velocidadFondo,0);
            this.fondoGrupo.add(fondo);
        }
    }

    
    movimiento(){
        //el único movimiento del dinosaurio es caer
        this.dino.estaenPiso=false;
        this.dino.velocity.y+=1;
        if(this.dino.position.y>=height-40){
            this.dino.position.y=height-40;
            this.dino.estaenPiso=true;
        }
         //básicamente es movimiento del fondo
         for(let i=0;i<this.fondoGrupo.length;i+=1){
             if(this.fondoGrupo[i].position.x<-width/2){
                this.fondoGrupo[i].position.x=2*width+width/2;
             }
         }   
    }


    controles(){
        if(this.dino.estaenPiso){
            if(keyWentDown(32) && !keyDown("s")){
                //console.log("saltar");
                
                this.dino.velocity.y=-12;
            }
            if(keyDown("s")){
               // console.log("agachar");
                this.dino.changeAnimation("agachado");
                this.dino.setCollider("rectangle",0,0,45,30);
            }else{
                this.dino.changeAnimation("correr");
                this.dino.setCollider("rectangle",0,0,35,40);
            }
        }
    }

    muerte(cactusGrupo,avesGrupo){
       /*let self=this dado que se pierde el contexto podemos optar por esta alternativa
        this.dino.overlap(cactusGrupo,self.juegoTerminado);
        */
       if(this.dino.overlap(cactusGrupo) || this.dino.overlap(avesGrupo)){
           juegoTerminado();
       }
    }

    //auxiliares
    /*
    Con lo cual tendríamos que declarar una función extra; sin embargo el tratamiento de la muerte si
    bien es cierto debe ser detectado desde el propio objeto, este deb hacer un llamado a una función que esté
    de forma global pues tendrá que detener los sprites de ambos objetos
    juegoTerminado(){
        console.log("estas muerto");
    }*/



}