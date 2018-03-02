class Aves {
    constructor(){
        this.aparicion=500;
        this.velocidadAve=-4;
    }
    
    cargar(){
        this.aveAnimada=loadAnimation("./recursos/imagenes/bird0.png","./recursos/imagenes/bird1.png");
        
    }

    crearGrupo(){
        this.aveGrupo=new Group();
        var self=this;
        setInterval(function () {self.aparicion=floor(random(250, 500));  },4000);

    }

    aparecerMover(){
        let desfasePosicion=floor(random(-5,15));
        if(frameCount%this.aparicion==0){
            let bird=createSprite(width+width/4,height-40-desfasePosicion);//en este caso varía la posicion en y
            bird.addAnimation("volar",this.aveAnimada);
            bird.setCollider("rectangle",0,0,20,20);
            bird.debug=true;
            bird.setVelocity(this.velocidadAve,0);
            this.aveGrupo.add(bird);

            
        }
    }

    muerte(){
        for(let i=0;i<this.aveGrupo.length;i++){
            if(this.aveGrupo[i].position.x<-width/4){
                this.aveGrupo[i].remove();
            }
        }
        
       // console.log(this.aveGrupo.length);
    }
    
}