function init() {
  // HTML ELEMENTS
  const grid = document.querySelector('.game-grid')
  const scoreBoard = document.querySelector('.score')
  const livesBoard = document.querySelector('.lives')
  const startButton = document.querySelector('#start-btn')
  const playagainButton = document.querySelector('#playagain-btn')
  const winnerPlayButton = document.querySelector('#winnerplay-btn')
  const startOverlay = document.querySelector('#start-overlay')
  const gameoverOverlay = document.querySelector('#gameover-overlay')
  const winnerOverlay = document.querySelector('#winner-overlay')
  const audio = document.querySelector('audio')

  // VARIABLES
  const width = 11
  const cellCount = width * width
  const cells = []
  const invaders = [2, 3, 4, 5, 6, 7, 8, 13, 14, 15, 16, 17, 18, 19]
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
  let invaderSound = 0
  let invaderCostume = 0
  let gameState = 1

  // GAME STATE FUNCTIONS
  function startGame() {
    console.log('GAME START FUNCTION HAS RUN')
    gameoverOverlay.style.display = 'none'
    winnerOverlay.style.display = 'none'
    startOverlay.style.display = 'none'
    gameState = 2
    console.log(gameState)
    audio.src = 'sounds/startSound.wav'
    audio.play()
    createGrid()
    addInvaders()
    addSpaceship()
    invadersAuto = setInterval(moveInvaders, 800)
    bombAuto = setInterval(bomb, 3000)
  }
  function gameover() {
    console.log('GAMEOVER FUNCTION HAS RUN')
    audio.src = 'sounds/gameover.wav'
    audio.play()
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
  function winner() {
    console.log('WINNER FUNCTION HAS RUN')
    audio.src = 'sounds/winner.wav'
    audio.play()
    gameState = 3
    console.log(gameState)
    clearInterval(invadersAuto)
    clearInterval(bombAuto)
    removeSpaceship()
    removeInvaders()
    winnerOverlay.style.display = 'flex'
  }

  // GAME GRID CREATION
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

  // CHANGE CHARACTER CLASSES
  function addInvaders() {
    console.log('ADDINVADER FUNCTION RAN')
    invaderCostume += 1
    for (let i = 0; i < invaders.length; i++) {
      if (!invadersRemoved.includes(i)) {
        if (invaderCostume % 2 !== 0) {
          cells[invaders[i]].classList.add('invaderOne')
        } else if (invaderCostume % 2 === 0) {
          cells[invaders[i]].classList.add('invaderTwo')
        }
      }
    }
  }
  function removeInvaders() {
    console.log('REMOVEINVADERS FUNCTION RAN')
    for (let i = 0; i < invaders.length; i++) {
      cells[invaders[i]].classList.remove('invaderOne')
      cells[invaders[i]].classList.remove('invaderTwo')
    }
  }
  function addSpaceship() {
    cells[currrentSpaceshipIndex].classList.add('spaceship')
    console.log('ADDSPACESHIP FUNCTION RAN')
  }
  function removeSpaceship() {
    cells[currrentSpaceshipIndex].classList.remove('spaceship')
    console.log('REMOVESPACESHIP FUNCTION RAN')
  }

  // SPACESHIP MOVEMENT
  function moveSpaceship(event) {
    if (gameState === 2) {
      console.log('FUNCTION HAS RAN AT INGAME')
      console.log('MOVESPACESHIP FUNCTION RAN')
      cells[currrentSpaceshipIndex].classList.remove('spaceship')
      switch (event.key) {
        case 'ArrowLeft':
          if (currrentSpaceshipIndex % width !== 0) {
            currrentSpaceshipIndex -= 1
            bombPositionX -= 1
            console.log(bombPositionX)
          }
          break
        case 'ArrowRight':
          if (currrentSpaceshipIndex % width < width - 1) {
            currrentSpaceshipIndex += 1
            bombPositionX += 1
            console.log(bombPositionX)
          }
          break
      }
      cells[currrentSpaceshipIndex].classList.add('spaceship')
    } else {
      console.log('GAMESTATE HAS STOPPED FUNCTION')
    }
  }

  // INVADER MOVEMENT
  function moveInvaders() {
    const leftEdge = invaders[0] % width === 0
    const rightEdge = invaders[invaders.length - 1] % width === width - 1
    removeInvaders()
    // GRID EDGE RIGHT: move down plus one left
    if (rightEdge && rightPath) {
      for (let i = 0; i < invaders.length; i++) {
        invaders[i] += width + 1
        direction = -1
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
    invaderSound += 1
    if (invaderSound % 2 !== 0) {
      audio.src = 'sounds/invaderOne.wav'
      audio.play()
    } else if (invaderSound % 2 === 0) {
      audio.src = 'sounds/invaderTwo.wav'
      audio.play()
    }
    addInvaders()

    // ENDGAME SCENARIOS
    // Invaders breach Spaceship
    if (
      cells[currrentSpaceshipIndex].classList.contains('invader', 'spaceship')
    ) {
      // update game view to 'GAMEOVER' screen
      console.log('GAMEOVER: spaceship is breached')
      clearInterval(invadersAuto)
      gameover()
    }

    // Invaders reach bottom of grid
    for (let i = 0; i < invaders.length; i++) {
      if (invaders[i] > cells.length) {
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
      winner()
    }
    // Player runs out of lives
    if (playerLives === 0) {
      console.log('GAMEOVER: player is out of lives')
      clearInterval(invadersAuto)
      clearInterval(bombAuto)
      gameover()
    }
  }

  // SHOOT FUNCTION
  function shoot(event) {
    let laserAuto
    let currentLaserIndex = currrentSpaceshipIndex
    function moveLaser() {
      if (currentLaserIndex < 0 || gameState !== 2) {
        clearInterval(laserAuto)
      } else {
        cells[currentLaserIndex].classList.remove('laser')
        currentLaserIndex -= width
        cells[currentLaserIndex].classList.add('laser')
      }
      //laser collides with invader
      if (cells[currentLaserIndex].classList.contains('invaderOne')) {
        cells[currentLaserIndex].classList.remove('laser')
        cells[currentLaserIndex].classList.remove('invaderOne')
        cells[currentLaserIndex].classList.add('explosion')
        audio.src = 'sounds/invader-destroyed.wav'
        audio.play()
        setTimeout(
          () => cells[currentLaserIndex].classList.remove('explosion'),
          200
        )
        clearInterval(laserAuto)
        const invaderRemoved = invaders.indexOf(currentLaserIndex)
        invadersRemoved.push(invaderRemoved)
        gameScore += 100
        scoreBoard.innerHTML = gameScore
      }
      if (cells[currentLaserIndex].classList.contains('invaderTwo')) {
        cells[currentLaserIndex].classList.remove('laser')
        cells[currentLaserIndex].classList.remove('invaderTwo')
        cells[currentLaserIndex].classList.add('explosion')
        audio.src = 'sounds/invader-destroyed.wav'
        audio.play()
        setTimeout(
          () => cells[currentLaserIndex].classList.remove('explosion'),
          200
        )
        clearInterval(laserAuto)
        const invaderRemoved = invaders.indexOf(currentLaserIndex)
        invadersRemoved.push(invaderRemoved)
        gameScore += 100
        scoreBoard.innerHTML = gameScore
      }
    }
    if (gameState === 2) {
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

  function bomb() {
    console.log('BOMB FUNCTION RAN')
    let bombAuto
    let currentBombIndex = bombPositionX + bombPositionY
    console.log(currentBombIndex)
    function dropBomb() {
      if (currentBombIndex > 120 || gameState !== 2) {
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
        setTimeout(
          () => cells[currentBombIndex].classList.remove('explosion'),
          200
        )
        clearInterval(bombAuto)
      }
      if (cells[currentBombIndex].classList.contains('spaceship')) {
        cells[currentBombIndex].classList.remove('bomb')
        cells[currentBombIndex].classList.add('explosion')
        playerLives -= 1
        livesBoard.innerHTML = playerLives
        audio.src = 'sounds/spaceship-destroyed.wav'
        audio.play()
        setTimeout(
          () => cells[currentBombIndex].classList.remove('explosion'),
          200
        )
        clearInterval(bombAuto)
      }
    }
    bombAuto = setInterval(dropBomb, 400)
  }

  // EVENTS
  startButton.addEventListener('click', startGame)
  playagainButton.addEventListener('click', playAgain)
  winnerPlayButton.addEventListener('click', playAgain)
  document.addEventListener('keydown', moveSpaceship)
  document.addEventListener('keydown', shoot)
}

window.addEventListener('DOMContentLoaded', init)
