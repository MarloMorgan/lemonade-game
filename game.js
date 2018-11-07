'use strict'
// -- base constructor game

function Game(canvasElement) {
    this.canvasElement = canvasElement;
    this.level = 1;
    this.message ='';
    this.ctx = this.canvasElement.getContext('2d');
    this.player = null;
    this.score = 0;
    this.enemies = []; 
    this.checkEnemies;
    this.lives = 3;
    this.initialPositionPlayer = {
    x: this.canvasElement.width/2,
    y: this.canvasElement.height - 100
  }
    this.gameIsOver = false;
    this.speedEnemies;
    this.playerSpeed;
    this.levelOneCheck = false;
    this.levelThreeCheck = false;
    this.levelTwoCheck = false;
}

// game methods
Game.prototype.start = function() {
  this.startLoop();
}

Game.prototype.startLoop = function() {
  this.player = new Player(this.canvasElement, this.initialPositionPlayer);
// message
  this.ctx = this.canvasElement.getContext('2d');

  this.handleKeyUp = function(event) {
      if (event.key === 'ArrowRight') {
        this.player.setDirection(0);
      } else if (event.key === 'ArrowLeft') {
        this.player.setDirection(0);
      }
    }.bind(this);

  this.handleKeyDown = function(event) {
    if (event.key === 'ArrowRight') {
      this.player.setDirection(1);
    } else if (event.key === 'ArrowLeft') {
      this.player.setDirection(-1);
    }
  }.bind(this)
  
  document.addEventListener('keydown', this.handleKeyDown);
  document.addEventListener('keyup', this.handleKeyUp);
  
  //this.intervalId = setInterval(this.levelTime.bind(this) , 7000);


  var loop = function() {
    this.checkAllCollisions();
    this.updateAll();
    this.clearAll();
    this.drawAll();
    //this.checkRound();

    // create more enemies 
    if (Math.random() > this.checkEnemies) {
     //var x = this.canvasElement.width * Math.random();
      this.enemies.push(new Enemy(this.canvasElement, this.speedEnemies));
    }

      
    if (Math.random() > 0.96) {
      this.enemies.push(new Enemy(this.canvasElement));
    }

    if (this.level === 3) {
      clearInterval(this.intervalId);
      console.log('no more')
    }
      
   

    if (!this.gameIsOver) {
      requestAnimationFrame(loop);
    }
  
}.bind(this);
    
  // this loop runs once, but the others are called continuously (look at requestAnimationFrame)      
    loop();
}

Game.prototype.updateAll = function() {
  this.player.update(); 
  this.enemies.forEach(function(enemy) {
      enemy.update();
    })
}

Game.prototype.clearAll = function() {
  this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  this.enemies = this.enemies.filter(function(enemy) {
  return enemy.isInScreen();
});
}


Game.prototype.drawAll = function() {
  this.player.draw();
  this.enemies.forEach(function(enemy) {
    enemy.draw();
  })
}

Game.prototype.checkAllCollisions = function() {
  this.enemies.forEach(function(enemy, index) {
    if (this.player.collidesWithEnemy(enemy)) {
      this.score = this.player.score += enemy.points;
      this.updateScore(this.score);
      this.levelTime();

      //this.lostLive(this.player.lives);
      this.enemies.splice(index, 1);
      
      /* if (this.player.score === this.levelThresholds[1]){
        console.log('Congratulations. You have made it to level 2');
        this.levelTwo();
    
      } 

      if (this.score === this.levelThresholds[2] ){
        console.log('Congratulations. You have made it to level 3');
        this.levelThree();
      }
  */

      if (this.player.score <= 0) {
        this.gameIsOver = true;
        this.finishGame();
      }
    }
  }.bind(this)); 
}

Game.prototype.onGameOverCallback = function(callback) {
  this.gameOverCallback = callback;
}

Game.prototype.onLiveLost = function(callback) {
  this.lostLive = callback;
}

Game.prototype.onPoints = function(callback) {
  this.updateScore = callback;
}


Game.prototype.messageSend = function(callback) {
  this.updateMessage = callback;
}

Game.prototype.finishGame = function() {
  this.gameOverCallback();
}


Game.prototype.levelTime = function () {
  console.log(this.score)
  if(this.score >= 10 && this.score < 20 && !this.levelOneCheck ) {
    this.levelOneCheck = true;
    this.level++;
    this.checkEnemies = 0.96;
    this.speedEnemies = 4;
    console.log('ciao,livello');
    this.message = 'Congratulations, you reached: ' + this.level;
    this.updateMessage(this.message);

} else if (this.score >= 20 && this.score < 30 && !this.levelTwoCheck) {
  this.levelTwoCheck = true;
    this.level++;
    this.checkEnemies = 0.93;
    this.speedEnemies = 6;
    this.message = 'Congratulations, you reached: ' + this.level;
    this.updateMessage(this.message);

} else if (this.score >= 30 && !this.levelThreeCheck) {
    this.levelThreeCheck = true;
    this.level++;
    this.rateEnemies = 0.90;
    this.speedEnemies = 7;
    this.message = 'Congratulations, you reached: ' + this.level;
    this.updateMessage(this.message);

  } 
};


