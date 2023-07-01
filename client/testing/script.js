var socket = io();
var modulesFromCenter = {x:0, y:0}
var moduleCount = 9
var strikeCount = 0
const alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

function updateBombPos(){
  let x, y
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
  console.log("strike")
  strikeCount++
  if (strikeCount >= 3){
    console.log("yu died")
  }
}

function clickSound(){
  console.log("clicked")
}

function moduleSolved(){
  console.log("moduleSolved")
}

document.onkeydown = (e) => {
  if (e.key === "ArrowUp") {
    if (modulesFromCenter.y < Math.sqrt(moduleCount) - 2) {
      modulesFromCenter.y++
      updateBombPos()
    }
  } else if (e.key === "ArrowDown") {
    if (modulesFromCenter.y > -Math.sqrt(moduleCount) + 2) {
      modulesFromCenter.y--
      updateBombPos()
    }
  } else if (e.key === "ArrowLeft") {
    if (modulesFromCenter.x < Math.sqrt(moduleCount) - 2) {
      modulesFromCenter.x++
      updateBombPos()
    }
  } else if (e.key === "ArrowRight") {
    if (modulesFromCenter.x > -Math.sqrt(moduleCount) + 2) {
      modulesFromCenter.x--
      updateBombPos()
    }
  }
};
//make smart enable and generation
window.onload = () => {
  buttonModuleT = new ButtonModule(1)
  hexaModuleT = new HexaModule(2)
}