var socket = io();
var modulesFromCenter = {x:0, y:0}
var moduleCount = 9

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

document.onkeydown = (e) => {
  if (e.key === "e") {
    // const count = Number(prompt());
    // document.documentElement.style.setProperty("--moduleCountSqrt", Math.ceil(Math.sqrt(count)));
    // moduleCount = count
    // document.getElementById("bomb").innerHTML = ""
    // for (let i = 1; i <= count; i++) {
    //   const module = document.createElement("div")
    //   module.innerText = i
    //   module.classList.add("module")
    //   document.getElementById("bomb").appendChild(module)
    // }
  } else if (e.key === "ArrowUp") {
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