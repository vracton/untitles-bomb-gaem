class Module {
  create(moduleName){
    const children = document.getElementById(moduleName).childNodes
    let cChildren = []
    for (let i of children){
      cChildren.push(i.cloneNode(true))
    }
    this.addElements(cChildren)
    this.addToScreen()
    this.randomize()
    this.addLogic(this.elements)
  }

  addElements(children){
    this.elements = []
    for (let i of children){
      this.elements.push(i)
    }
  } 

  addToScreen(){
    for (let i of this.elements){
      this.moduleCont.appendChild(i)
    }
    this.disable()
  }

  disable(){
    for (let i of this.elements) {
      if (i.nodeName.toLowerCase() === "button" || i.nodeName.toLowerCase() === "input"){
        i.disabled = true
      }
    }
  }

  enable(){
    for (let i of this.elements) {
      if (i.nodeName.toLowerCase() === "button" || i.nodeName.toLowerCase() === "input"){
        i.disabled = false
      }
    }
  }

  reset() {
    addStrike()
    this.randomize()
  }

  solved(){
    this.solveState()
    moduleSolved()
  }
}

class ButtonModule extends Module {
  constructor(moduleNumber){
    super()
    this.moduleCont = document.getElementById("m"+moduleNumber)
    this.create("buttonModule")
  }

  randomize(){
    this.numClicks = 0
    this.neededClicks = 0
    if (Math.random() >= 0.5){
      this.moduleCont.querySelector("#main").style.backgroundColor = "#e30000"
    } else {
      this.moduleCont.querySelector("#main").style.backgroundColor = "#009be3"
      this.neededClicks += 2
    }
    if (Math.random() >= 0.5){
      this.moduleCont.querySelector("#main").innerHTML = "Detonate"
      this.neededClicks += 1
    } else {
      this.moduleCont.querySelector("#main").innerHTML = "Defuse"
      this.neededClicks += 2
    }
    this.clickUp = this.neededClicks > 2 
  }

  addLogic(){
    this.moduleCont.querySelector("#main").addEventListener("click", ()=>{
      this.numClicks++
      clickSound()
      if (this.numClicks > this.neededClicks){
        this.reset()
      }
    })
    this.moduleCont.querySelector("#top").addEventListener("click", ()=>{
      clickSound()
      if (this.numClicks === this.neededClicks && this.clickUp){
        this.disable()
        this.solved()
      } else {
        this.reset()
      }
    })
    this.moduleCont.querySelector("#bottom").addEventListener("click", ()=>{
      clickSound()
      if (this.numClicks === this.neededClicks && !this.clickUp){
        this.disable()
        this.solved()
      } else {
        this.reset()
      }
    })
  }

  solveState() {
    this.moduleCont.querySelector("#main").innerHTML = "Defused"
    this.moduleCont.querySelector("#main").style.backgroundColor = "#04e300"
  }
}