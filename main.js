'use strict'

function buildDOM(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0]; // this means we are adding our blocks inside the body of the HTML
}

function main() {
// we select the elements in the DOM
  var splashScreen;
  var gameScreen;
  var gameOverScreen;
  var startButton;
  var restartButton;
  var livesElement;
  var scoreElement;
  var canvasElement;
  var game;

  // the  homepage
  function buildSplash() {
    splashScreen = buildDOM(`
    <main>
    
      <div class="header">
        <div class="container">
            <h1><strong>When Life Gives You Lemons,<br>Make Lemonade</strong></h1>
        </div>
      </div>

      
        <div class="rules container">Catch the lemons and sugar to make amazing lemonades. Watch out for other fruits! <br> Ready? Hit play!</div>
          <div class="container">
            <button >Start</button>
          </div>
          <div class="container">
            <p>Make lemonades and earn points:</p>
            <ul>
              <img src="./images/lemon.png">
                <li>Lemons: they give you 1 point.</li>
                <li><img src="./images/sugar.png">
                <li>sugar: it makes your life sweeter, plus 2 points.</li>
            </ul>
        </div>
      </div>
     
    </main>
    `)

    document.body.prepend(splashScreen);

    startButton = document.querySelector('button');

    startButton.addEventListener('click', destroySplash);
   
  }

  // remove the hompegae and replace it with the one from the game
  function destroySplash() {
    splashScreen.remove();
    startButton.removeEventListener('click', destroySplash);
    buildGameScreen();
  }

  // game page
  function buildGameScreen() {
    gameScreen = buildDOM(`
      <main class="game">
      
        <div id = "nav-game" class="container">
          <div class="score">
            <img src="./images/lemonade.png">
            <p>No. of lemonades:</p>
            
            <p class="score">0 </p>   
          </div>  
        <canvas width="900px" height="500px"></canvas> 
      </main>
    `);

    document.body.prepend(gameScreen);

    canvasElement = document.querySelector('canvas');
    //lives can be found here
    livesElement = document.querySelector('.lives');
    scoreElement = document.querySelector('p.score');

    
    
    /*var timeLeft = 30;
    timerElement = document.querySelector('.time');
    var intervalId = setInterval(function(){
      timerElement.innerText = timeLeft;
      timeLeft --;
      if (timeLeft < 0){
        clearInterval(intervalId);
        destroyGameScreen()
      }
    }, 1000)
    */

    
    game = new Game(canvasElement);
    game.start(); 
    game.onGameOverCallback(destroyGameScreen);
    game.onLiveLost(updateLives);
    game.onPoints(updateScore);
    

  }

//update lives
  function updateLives(lives) {
    livesElement.innerText = lives;
  }
// update score
  function updateScore(score) {
    scoreElement.innerText = score;
  }

  
  // remove game screen and move to game over
  function destroyGameScreen() {
    gameScreen.remove();
    buildGameOverScreen();
  }


  //  game over page
  function buildGameOverScreen() {
    gameOverScreen = buildDOM(`
      <main >
      <div class="container">
        <h1>Game Over</h1>
        <p>Oh no! You lost the game. <br>Don't worry, if life gives you lemons, find someone whose life has given them vodka and...throw a party!<br> Alternatively, restart the game.</p>
        <button>Restart</button>
      </div>
      </main>  
    `);

    document.body.prepend(gameOverScreen);

    restartButton = document.querySelector('button');

    restartButton.addEventListener('click', destroyGameOverScreen)

  }
  // remove game over page and go back to the game
  function destroyGameOverScreen() {
    gameOverScreen.remove();

    restartButton.removeEventListener('click', destroyGameOverScreen)

    buildGameScreen();
  }

  buildSplash();

}

window.addEventListener('load', main);

