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
  const grid = document.querySelector('.game-grid')
  const scoreBoard = document.querySelector('.score')

  // Variables
  // ? width = 11
  // ? cellcount = width * width
  // ? gameScore
  // ? Player lives
  // ? direction 
  // ? invadersId
  // ? spaceshipIndex
  // ? invadersRemoved
  // ? invaders array

  const width = 11
  const cellCount = width * width
  const cells = []
  let invadersRemoved = []
  let currrentSpaceshipIndex = 115
  
  // ? Generate grid cells
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.innerText = i
    cell.dataset.index = i
    cells.push(cell)
    grid.appendChild(cell)
  }
  console.log('GRID HAS BEEN CREATED!')
  console.log(cells)

  const invaders = [
    2,3,4,5,6,7,8,
    13,14,15,16,17,18,19,
    24,25,26,27,28,29,30
  ]

  // Execution
  // ?? CHANGE CHARACTER CLASSES

  // ? set invaders grid position - add class
  function addInvaders() {
    for (let i = 0; i < invaders.length; i++) {
      if (!invadersRemoved.includes(i)) {
        cells[invaders[i]].classList.add('invader')
      }
      console.log('INVADER ADD FUNCTION LOOP')
    }
  }
  addInvaders()

  // ? clears invaders grid position - remove class
  function removeInvaders() {
    for (let i = 0; i < invaders.length; i++) {
      cells[invaders[i]].classList.remove('invader')
      console.log('INVADER REMOVE FUNCTION LOOP')
    }
  }

  // ? add spaceship class
  cells[currrentSpaceshipIndex].classList.add('spaceship')
  // ? remove spaceship class
  // takes in a position argument then removes the spaceship class to given cell

  // ? remove laser class
  // takes in a position argument then adds the laser class to given cell
  // ? add laser class
  // takes in a position argument then removes the laser class to given cell


  // ?? CHARACTER MOVEMENTS

  // ? Spaceship movement function
  // const keyCode = event.keyCode
  // const left = 37
  // const right = 39
  // remove spaceship from current position
  // check keycode on the event and match with direction using if else statements
  // change value of spaceshipIndex
  // then add spaceship to current position
  // if spaceship reach left or right grid edge then add/remove from spaceshipIndex

  function moveSpaceship(event) {
    cells[currrentSpaceshipIndex].classList.remove('spaceship')
    switch (event.key) {
      case 'ArrowLeft' :
        if (currrentSpaceshipIndex % width !== 0) currrentSpaceshipIndex -= 1
        break
      case 'ArrowRight' :
        if (currrentSpaceshipIndex % width < width - 1) currrentSpaceshipIndex += 1
        break
    }
    console.log('SPACESHIP HAS MOVED')
    cells[currrentSpaceshipIndex].classList.add('spaceship')
  }
  document.addEventListener('keydown', moveSpaceship)


  // ? Invader auto movement function
  // remove from current position
  // if invader reach left or right grid edge then switch direction of all invaiders
  // on edge move down by one
  // incr positon by one
  // if spaceship class contains bomb: then remove life from playerLives
  // if spaceship class contains invader: run gameOver function
  // ...also when gameover execute clear interval
  // use set interval to call function after x seconds - to repeat



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