class Cactus{
    constructor(){
        this.aparicion=90;
    }
    cargar(){

        this.img1=loadImage("./recursos/imagenes/cactus1.png");
        this.img2=loadImage("./recursos/imagenes/cactus2.png");
        this.img3=loadImage("./recursos/imagenes/cactus3.png");

    }

    crearGrupo(){
        this.cactusGrupo=new Group();
        var self=this;
         setInterval(function(){self.aparicion=floor(random(40, 90))},4000);
    }

    apareceryMover(){
            //let aparicion=90;        
            //let aparicion=floor(random(90,270));
            let variarCactus=floor(random(1, 4));
            let imagenCactus;
            let desfasePosicion;
            let dxCollider, dyCollider;
         if(frameCount%this.aparicion==0){
            if(variarCactus==1){imagenCactus=this.img1; desfasePosicion=0; dxCollider=20; dyCollider=43;}
            else if(variarCactus==2){imagenCactus=this.img2; desfasePosicion=5;dxCollider=30; dyCollider=30;}
            else if(variarCactus==3){imagenCactus=this.img3; desfasePosicion=5;dxCollider=45; dyCollider=30;}
            let c=createSprite(width+width/4,height-40+desfasePosicion);
             c.addImage(imagenCactus);
             c.setCollider("rectangle",0,0,dxCollider,dyCollider);
             c.debug=true;
             c.setVelocity(-4,0);
             this.cactusGrupo.add(c);
         }
         
         //console.log(this.aparicion);
    }

    muerte(){
        for(let i=0; i<this.cactusGrupo.length;i++){
            if(this.cactusGrupo[i].position.x<-width/4){
                this.cactusGrupo[i].remove();
            }
        }
    }

}