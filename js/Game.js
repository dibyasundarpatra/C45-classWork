class Game {
    constructor(){
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      cycle1 = createSprite(80,185);
      cycle1.addImage("cycle1",cycle1_img);
      //cycle1.debug = true;
      cycle2 = createSprite(80,285);
      cycle2.addImage("cycle2",cycle2_img);
      cycle3 = createSprite(80,385);
      cycle3.addImage("cycle2",cycle3_img);
      cycles = [cycle1, cycle2 ,cycle3];
    }
  
    play(){
      console.log(mouseX + ' , '+ mouseY);
      form.hide();
      
      Player.getPlayerInfo();
      player.getCyclesAtEnd();
  
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track,0,0,displayWidth*4, displayHeight-100);
        
        var index = 0;
  
        var y = 175 ;
        var x;
  
        for(var plr in allPlayers){
          index = index + 1 ;
  
          y = y + 200;
          x = displayHeight - allPlayers[plr].distance;
          cycles[index-1].x = x;
          cycles[index-1].y = y;
          
         
          if (index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60,60);
            cycles[index - 1].shapeColor = "red";
            camera.position.x = cycles[index-1].y;
            camera.position.y = displayWidth;
          }         
        }  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
  
      if(player.distance > 3860){
        gameState = 2;
        player.rank +=1
        Player.updateCyclesAtEnd(player.rank)
      }
     
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
      console.log(player.rank);
    }
  }