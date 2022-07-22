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
  const livesBoard = document.querySelector('.lives')
  const startButton = document.querySelector('#start-btn')
  const playagainButton = document.querySelector('#playagain-btn')
  const startOverlay = document.querySelector('#start-overlay')
  const gameoverOverlay = document.querySelector('#gameover-overlay')
  const audio = document.querySelector('audio')
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
  let rightPath = true
  let direction = 1
  let invadersAuto
  let bombAuto
  let gameScore = 0
  let bombPositionX = 0
  let bombPositionY = 16
  let playerLives = 3
  const invaders = [
    2,3,4,5,6,7,8,
    13,14,15,16,17,18,19
  ]

  // gameState - 1 = start; 2 = in-game; 3 = gameover
  let gameState = 1

  // ? Start game function
  // player presses spacebar to start game
  // reset player lives to three
  // reset game score to 0
  // reset invader movement to start position
  // reset spaceship movement to start position
  function startGame() {
    console.log('GAME START FUNCTION HAS RUN')
    gameoverOverlay.style.display = 'none'
    startOverlay.style.display = 'none'
    gameState = 2
    console.log(gameState)
    createGrid()
    addInvaders()
    addSpaceship()
    invadersAuto = setInterval(moveInvaders, 800)
    bombAuto = setInterval(bomb, 3000)
  }
  startButton.addEventListener('click', startGame)


  function gameover() {
    console.log('GAMEOVER FUNCTION HAS RUN')
    gameState = 3
    console.log(gameState)
    clearInterval(invadersAuto)
    clearInterval(bombAuto)
    removeSpaceship()
    removeInvaders()
    gameoverOverlay.style.display = 'flex'
  }

  function playAgain() {
    console.log('PLAYAGAIN BUTTON CLICKED')
    location.reload()
  }

  playagainButton.addEventListener('click', playAgain)
  // ? Generate grid cells
  
  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      // cell.innerText = i
      cell.dataset.index = i
      cells.push(cell)
      grid.appendChild(cell)
    }
    console.log('GRID HAS BEEN CREATED!')
    
  }
  
  // ? Remove grid cells - reverse createGrid()
  // function removeGrid() {
  //   console.log('REMOVEGRID FUNCTION HAS RAN')
  //   console.log(grid)
  //   for (let i = 3; i < 124 ; i++) {
  //     console.log(grid.children[i])
  //     // grid.removeChild(grid.children[i])
  //     grid[i].remove()
  //     console.log('removegrid loop')
  //   }
  //   console.log(grid)
  // }
  

  // Execution
  // ?? CHANGE CHARACTER CLASSES

  // ? set invaders grid position - add class
  function addInvaders() {
    console.log('ADDINVADER FUNCTION RAN')
    for (let i = 0; i < invaders.length; i++) {
      if (!invadersRemoved.includes(i)) {
        cells[invaders[i]].classList.add('invader')
      }
      // console.log('INVADER ADD FUNCTION LOOP')
    }
  }
  

  // ? clears invaders grid position - remove class
  function removeInvaders() {
    console.log('REMOVEINVADERS FUNCTION RAN')
    for (let i = 0; i < invaders.length; i++) {
      cells[invaders[i]].classList.remove('invader')
      // console.log('INVADER REMOVE FUNCTION LOOP')
    }
  }

  // ? add spaceship class
  function addSpaceship() {
    cells[currrentSpaceshipIndex].classList.add('spaceship')
    console.log('ADDSPACESHIP FUNCTION RAN')
  }
  // ? remove spaceship class
  // takes in a position argument then removes the spaceship class to given cell
  function removeSpaceship() {
    cells[currrentSpaceshipIndex].classList.remove('spaceship')
    console.log('REMOVESPACESHIP FUNCTION RAN')
  }

  // if ( gameState === 2 ) {
  //   console.log('FUNCTION HAS RAN AT INGAME')
  // } else {
  //   console.log('GAMESTATE HAS STOPPED FUNCTION')
  // }

  // ??? GAME FUNCTIONS

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
    if ( gameState === 2 ) {
      console.log('FUNCTION HAS RAN AT INGAME')
      console.log('MOVESPACESHIP FUNCTION RAN')
      cells[currrentSpaceshipIndex].classList.remove('spaceship')
      switch (event.key) {
        case 'ArrowLeft' :
          if (currrentSpaceshipIndex % width !== 0) {
            currrentSpaceshipIndex -= 1
            bombPositionX -= 1
            console.log(bombPositionX)
          }
          break
        case 'ArrowRight' :
          if (currrentSpaceshipIndex % width < width - 1) {
            currrentSpaceshipIndex += 1
            bombPositionX += 1
            console.log(bombPositionX)
          } 
          break
      }
      // console.log('SPACESHIP HAS MOVED')
      cells[currrentSpaceshipIndex].classList.add('spaceship')
    } else {
      console.log('GAMESTATE HAS STOPPED FUNCTION')
    }
    
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
      bombPositionY += width
      console.log(bombPositionY)
    }

    // GRID EDGE LEFT: move down plus one right
    if (leftEdge && !rightPath) {
      for (let i = 0; i < invaders.length; i++) {
        invaders[i] += width - 1
        direction = 1
        rightPath = true
      }
      bombPositionY += width
      console.log(bombPositionY)
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
      console.log('GAMEOVER: spaceship is breached')
      clearInterval(invadersAuto)
      gameover()
    }

    // Invaders reach bottom of grid
    for (let i = 0; i < invaders.length; i++) {
      if (invaders[i] > (cells.length)) {
        console.log('GAMEOVER: invaders reach grid bottom')
        clearInterval(invadersAuto)
        clearInterval(bombAuto)
        gameover()
      }
    }

    // Invaders destroyed, Spaceship/Player wins
    if (invadersRemoved.length === invaders.length) {
      console.log('PLAYER WINS: all invaders have been destroyed')
      clearInterval(invadersAuto)
      clearInterval(bombAuto)
      gameover()
    }

    // Player runs out of lives
    if (playerLives === 0) {
      console.log('GAMEOVER: player is out of lives')
      clearInterval(invadersAuto)
      clearInterval(bombAuto)
      gameover()
    }
  }

  // ? invadersAuto = setInterval(moveInvaders, 800)













  // ? Shoot function
  function shoot(event) {
    let laserAuto
    let currentLaserIndex = currrentSpaceshipIndex
    function moveLaser() {
      if (currentLaserIndex < 0 || gameState !== 2 ) {
        clearInterval(laserAuto)
      } else { 
        cells[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        cells[currentLaserIndex].classList.add('laser')
      }
      // when laser collides with invader: remove invader and run explosion
      if (cells[currentLaserIndex].classList.contains('invader')) {
        cells[currentLaserIndex].classList.remove('laser')
        cells[currentLaserIndex].classList.remove('invader')
        cells[currentLaserIndex].classList.add('explosion')
        audio.src = 'sounds/invader-destroyed.wav'
        audio.play()
      
        setTimeout(() => cells[currentLaserIndex].classList.remove('explosion'), 200)
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

    if ( gameState === 2 ) {
      console.log('FUNCTION HAS RAN AT INGAME')
      switch (event.key) {
        case 'ArrowUp':
          audio.src = 'sounds/laser.wav'
          audio.play()
          laserAuto = setInterval(moveLaser, 100)
      }
    } else {
      console.log('GAMESTATE HAS STOPPED FUNCTION')
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



  // ? Invader Bombing function
  // Periodically drop bombs from same column as spaceship + and same row as invaders
  // If bombs collide with spaceship: explode animation, play sound and remove one life.

  function bomb() {
    console.log('BOMB FUNCTION RAN')
    let bombAuto
    // let bombStart = currrentSpaceshipIndex
    let currentBombIndex = bombPositionX + bombPositionY
    console.log(currentBombIndex)
    function dropBomb() {
      if  (currentBombIndex > 120) {
        clearInterval(bombAuto)
      } else {
        cells[currentBombIndex].classList.remove('bomb')
        currentBombIndex += width
        cells[currentBombIndex].classList.add('bomb')
      }
      if (cells[currentBombIndex].classList.contains('laser')) {
        cells[currentBombIndex].classList.remove('laser')
        cells[currentBombIndex].classList.remove('bomb')
        cells[currentBombIndex].classList.add('explosion')
        audio.src = 'sounds/spaceship-destroyed.wav'
        audio.play()

        console.log('BOMB AND LASER COLLISION')

        setTimeout(() => cells[currentBombIndex].classList.remove('explosion'), 200)
        clearInterval(bombAuto)
      }
      if (cells[currentBombIndex].classList.contains('spaceship')) {
        cells[currentBombIndex].classList.remove('bomb')
        cells[currentBombIndex].classList.add('explosion')
        playerLives -= 1 
        livesBoard.innerHTML = playerLives
        audio.src = 'sounds/spaceship-destroyed.wav'
        audio.play()

        setTimeout(() => cells[currentBombIndex].classList.remove('explosion'), 200)
        clearInterval(bombAuto)
      }
      
      

    }
    bombAuto = setInterval(dropBomb, 400)
  }



  // ----


  // setInterval(bomb, 3000)




























  

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