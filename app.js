function init() {

  // Think? - Game Functionality:

  // Invaders need to move side to side and down the screen - automatically.
  // Invaders need to disappear when shot by the spaceship.
  // Spaceship needs to move only horizontally at the bottom end of screen
  // spaceship needs to shoot
  // Once the spaceship destroys the wave of invaders: game starts again or another wave/level
  // Record game score - everytime an invader is shot the player receives points.
  // Invaders will periodically drop bombs on the spaceship - if hit lose one life.
  // When the player runs out of lives: restart game or go to gameover view.


  // Elements
  // ? grid

  // Variables
  // ? scoreBoard - to span element
  // ? width = 11
  // ? cellcount = width * width
  // ? gameScore
  // ? Player lives
  // ? direction 
  // ? invadersId
  // ? spaceshipIndex
  // ? invadersRemoved

  // ? invaders array
  // 

  // Execution
  // ? Generate grid cells
  // This function finds the cellCount and makes a new element on every loop, attaching it to the grid container
  // will loop through a set number of times based on the cellCount
  // Every loop a new div element will be created and appended to the grid element above
  // use innertext to create cell index numbers to help in the development of the grid movement 
  // - to be removed after dev and stored as a value

  // ?? CHANGE CHARACTER CLASSES

  // ? set invaders grid position - add class
  // use for loop to add invader class to cells 
  // uses invaders array to target cell
  // ? clears invaders grid position - remove class
  // use for loop to remove invader class to cells 
  // uses invaders array to target cell

  // ? add spaceship class
  // takes in a position argument then adds the spaceship class to given cell
  // ? remove spaceship class
  // takes in a position argument then removes the spaceship class to given cell

  // ? remove laser class
  // takes in a position argument then adds the laser class to given cell
  // ? add laser class
  // takes in a position argument then removes the laser class to given cell


  // ?? CHARACTER MOVEMENTS

  // ? Invader auto movement function
  // remove from current position
  // if invader reach left or right grid edge then switch direction of all invaiders
  // on edge move down by one
  // incr positon by one

  // if spaceship class contains bomb: then remove life from playerLives
  // if spaceship class contains invader: run gameOver function
  // ...also when gameover execute clear interval


  // use set interval to call function after x seconds - to repeat

  // ? Spaceship movement function
  // const keyCode = event.keyCode
  // const left = 37
  // const right = 39

  // remove spaceship from current position
  // check keycode on the event and match with direction using if else statements
  // change value of spaceshipIndex
  // then add spaceship to current position
  // if spaceship reach left or right grid edge then add/remove from spaceshipIndex

  // ? Shoot function
  // laserId variable
  // laserIndex variable = spaceshipIndex
  // ? laser movement function inside shoot function
  // remove laser class from current position
  // change laser index value
  // add laser class to current position

  // if current laserIndex cell contains invader class
  // then remove laser class
  // also remove invader class
  // add boom class to cell - use set timeout to remove class after 0.3 seconds

  // remove destroyed invader from invaders array
  // push invader to invadersRemoved array
  // update gameScore variable - add 10 points
  // update scoreBoard with gameScore use innerHTML
  // console log invadersRemoved

  // use set interval to repeat laser movement function - laser moves up grid

  // ? Start game function
  // player presses spacebar to start game
  // reset player lives to three
  // reset game score to 0
  // reset invader movement to start position
  // reset spaceship movement to start position

  // ? Gameover function
  // game ends when
  // then add gameover class to grid + innerhtml 'GAMEOVER'
  // reset player lives to three
  // reset game score to 0
  // reset invader movement to start position
  // reset spaceship movement to start position



  // Events

  // ? when up arrow key is clicked run shoot function
  // ? when left or right arrow keys are clicked run moveSpaceship function
  // ? 




















}

window.addEventListener('DOMContentLoaded', init)