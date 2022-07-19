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
  const audio = document.querySelector('audio')
  let invadersRemoved = []
  let currrentSpaceshipIndex = 115
  let rightPath = true
  let direction = 1
  let invadersAuto
  let gameScore = 0
  
  // ? Generate grid cells
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    // cell.innerText = i
    cell.dataset.index = i
    cells.push(cell)
    grid.appendChild(cell)
  }
  console.log('GRID HAS BEEN CREATED!')
  console.log(cells)

  const invaders = [
    2,3,4,5,6,7,8,
    13,14,15,16,17,18,19
  ]

  // Execution
  // ?? CHANGE CHARACTER CLASSES

  // ? set invaders grid position - add class
  function addInvaders() {
    for (let i = 0; i < invaders.length; i++) {
      if (!invadersRemoved.includes(i)) {
        cells[invaders[i]].classList.add('invader')
      }
      // console.log('INVADER ADD FUNCTION LOOP')
    }
  }
  addInvaders()

  // ? clears invaders grid position - remove class
  function removeInvaders() {
    for (let i = 0; i < invaders.length; i++) {
      cells[invaders[i]].classList.remove('invader')
      // console.log('INVADER REMOVE FUNCTION LOOP')
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
    // console.log('SPACESHIP HAS MOVED')
    cells[currrentSpaceshipIndex].classList.add('spaceship')
  }
  document.addEventListener('keydown', moveSpaceship)


  // ? Invader auto movement function
  // Still to do:
  // if spaceship class contains bomb: then remove life from playerLives

  function moveInvaders() {
    const leftEdge = invaders[0] % width === 0
    const rightEdge = invaders[invaders.length - 1] % width === width - 1
    removeInvaders()
    // console.log('INVADERS REMOVED')
    // GRID EDGE RIGHT: move down plus one left
    if (rightEdge && rightPath) {
      for (let i = 0; i < invaders.length; i++) {
        invaders[i] += width + 1
        direction = - 1
        rightPath = false
      }
    }

    // GRID EDGE LEFT: move down plus one right
    if (leftEdge && !rightPath) {
      for (let i = 0; i < invaders.length; i++) {
        invaders[i] += width - 1
        direction = 1
        rightPath = true
      }
    }

    // INCREMENT INVADERS: move by one cell in current direction
    for (let i = 0; i < invaders.length; i++) {
      invaders[i] += direction
    }

    addInvaders()

    // ENDGAME SCENARIOS: gameover or player wins

    // Invaders breach Spaceship
    if (cells[currrentSpaceshipIndex].classList.contains('invader', 'spaceship')) {
      // update game view to 'GAMEOVER' screen
      window.alert('GAMEOVER: spaceship is breached')
      clearInterval(invadersAuto)
    }

    // Invaders reach bottom of grid
    for (let i = 0; i < invaders.length; i++) {
      if (invaders[i] > (cells.length)) {
        window.alert('GAMEOVER: invaders reach grid bottom')
        clearInterval(invadersAuto)
      }
    }

    // Invaders destroyed, Spaceship/Player wins
    if (invadersRemoved.length === invaders.length) {
      window.alert('PLAYER WINS: all invaders have been destroyed')
      clearInterval(invadersAuto)
    }
  }
  invadersAuto = setInterval(moveInvaders, 800)

  // ? Shoot function
  function shoot(event) {
    let laserAuto
    let currentLaserIndex = currrentSpaceshipIndex
    function moveLaser() {
      cells[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      cells[currentLaserIndex].classList.add('laser')
      

      // when laser collides with invader: remove invader and run explosion
      if (cells[currentLaserIndex].classList.contains('invader')) {
        cells[currentLaserIndex].classList.remove('laser')
        cells[currentLaserIndex].classList.remove('invader')
        cells[currentLaserIndex].classList.add('explosion')
        audio.src = 'sounds/invader-destroyed.wav'
        audio.play()

        setTimeout(() => cells[currentLaserIndex].classList.remove('explosion'), 300)
        clearInterval(laserAuto)

        // record destroyed invaders
        const invaderRemoved = invaders.indexOf(currentLaserIndex)
        invadersRemoved.push(invaderRemoved)
        // console.log('INVADER HAS BEEN DESTROYED')
        // console.log(`INVADERS DESTROYED = ${invadersRemoved}`)

        // update gameScore variable
        gameScore += 100
        scoreBoard.innerHTML = gameScore
        // console.log('SCORE HAS BEEN UPDATED')
      }
    }

    switch (event.key) {
      case 'ArrowUp':
        audio.src = 'sounds/laser.wav'
        audio.play()
        laserAuto = setInterval(moveLaser, 100)
    }
  }

  document.addEventListener('keydown', shoot)
    
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