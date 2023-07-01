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
  if (modulesSolved == 1){
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
    activeModule.disable()
    if (completed){
      console.log("you live")
    } else {
      console.log("you died")
    }
  }
}

//make smart enable and generation
window.onload = () => {
  //load modules
  buttonModuleT = new ButtonModule(1)
  moduleArray[0][0] = buttonModuleT
  hexaModuleT = new HexaModule(2)
  moduleArray[0][1] = hexaModuleT
  timerModuleT = new TimerModule(5)
  moduleArray[1][1] = timerModuleT
  activeModule = timerModuleT
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