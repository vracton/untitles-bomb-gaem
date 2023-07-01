var socket = io();
var modulesFromCenter = {x:0, y:0}
var modulesFromCenterP = {x:1, y:1}
var moduleCount = 9
var strikeCount = 0
const alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
var moduleArray = [new Array(3), new Array(3), new Array(3)]
var activeModule = null
var playing = false
var timeLeft = 0
var modulesSolved = 0
var completed = false

function updateBombPos(){
  let x, y
  activeModule.disable()
  activeModule = moduleArray[modulesFromCenterP.y][modulesFromCenterP.x]
  activeModule.enable()
  if (modulesFromCenter.x === 0) {
    x = "-50%"
  } else {
    x = `calc((80vmin + 6px) * ${modulesFromCenter.x} - 50%)`
  }
  if (modulesFromCenter.y === 0) {
    y = "-50%"
  } else {
    y = `calc((80vmin + 6px) * ${modulesFromCenter.y} - 50%)`
  }
  document.getElementById("bomb").style.transform = "translate("+x+", "+y+")"
}

function addStrike(){
  strikeCount++
  moduleArray[1][1].addStrikeI(strikeCount)
  if (strikeCount >= 3){
    endGame()
  }
  const sound = new Audio("/fail.wav")
  sound.play()
}

function clickSound(){
  const sound = new Audio("/click.wav")
  sound.play()
}

function moduleSolved(){
  modulesSolved++
  if (modulesSolved == 8){
    completed = true
    endGame()
  }
  const sound = new Audio("/correct.wav")
  sound.play()
}

function endGame(){
  if (playing){
    playing = false
    timeLeft = moduleArray[1][1].stop()
    if (timeLeft < 0){
      timeLeft = 0
    }
    activeModule.disable()
    document.getElementById("modules").innerHTML = "You completed "+modulesSolved+"/8 modules."
    if (timeLeft === 1){
      document.getElementById("timeLeft").innerHTML = "You had 1 second left."
    } else {
      document.getElementById("timeLeft").innerHTML = "You had "+timeLeft+" seconds left."
    }
    if (completed){
      document.getElementById("result").innerHTML = "<span style='color:#04e300'>You defused the bomb and won!</span>"
    } else {
      if (strikeCount === 3){
        document.getElementById("result").innerHTML = "<span style='color:#e30000'>You made too many mistakes!</span>"
      } else {
        document.getElementById("result").innerHTML = "<span style='color:#e30000'>You ran out of time!</span>"
      }
    }
    document.getElementById("bomb").style.display = "none"
    document.getElementById("resultScreen").style.display = "block"
  }
}

function randomModule(pos){
  const randInt = Math.floor(Math.random()*2)
  if (randInt === 0){
    return new ButtonModule(pos)
  } else if (randInt === 1) {
    return new HexaModule(pos)
  }
}

//make smart enable and generation
window.onload = () => {
  //load modules
  moduleArray[0][0] = randomModule(1)
  moduleArray[0][1] = randomModule(2)
  moduleArray[0][2] = randomModule(3)
  moduleArray[1][0] = randomModule(4)
  moduleArray[1][2] = randomModule(6)
  moduleArray[2][0] = randomModule(7)
  moduleArray[2][1] = randomModule(8)
  moduleArray[2][2] = randomModule(9)
  timerModule = new TimerModule(5)
  moduleArray[1][1] = timerModule
  activeModule = timerModule
  activeModule.enable()
  //set up keybinds
  document.onkeydown = (e) => {
    if (e.key === "ArrowUp") {
      if (modulesFromCenter.y < Math.sqrt(moduleCount) - 2) {
        modulesFromCenter.y++
        modulesFromCenterP.y--
        updateBombPos()
      }
    } else if (e.key === "ArrowDown") {
      if (modulesFromCenter.y > -Math.sqrt(moduleCount) + 2) {
        modulesFromCenter.y--
        modulesFromCenterP.y++
        updateBombPos()
      }
    } else if (e.key === "ArrowLeft") {
      if (modulesFromCenter.x < Math.sqrt(moduleCount) - 2) {
        modulesFromCenter.x++
        modulesFromCenterP.x--
        updateBombPos()
      }
    } else if (e.key === "ArrowRight") {
      if (modulesFromCenter.x > -Math.sqrt(moduleCount) + 2) {
        modulesFromCenter.x--
        modulesFromCenterP.x++
        updateBombPos()
      }
    }
  };
  playing = true
}