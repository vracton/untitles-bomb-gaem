class Module {
  create(moduleName) {
    const children = document.getElementById(moduleName).childNodes;
    let cChildren = [];
    for (let i of children) {
      cChildren.push(i.cloneNode(true));
    }
    this.addElements(cChildren);
    this.addToScreen();
    this.randomize();
    this.addLogic(this.elements);
  }

  addElements(children) {
    this.elements = [];
    for (let i of children) {
      this.elements.push(i);
    }
  }

  addToScreen() {
    for (let i of this.elements) {
      this.moduleCont.appendChild(i);
    }
    this.disable();
  }

  disable() {
    for (let i of this.elements) {
      if (
        i.nodeName.toLowerCase() === "button" ||
        i.nodeName.toLowerCase() === "input"
      ) {
        i.disabled = true;
      }
    }
  }

  enable() {
    for (let i of this.elements) {
      if (
        i.nodeName.toLowerCase() === "button" ||
        i.nodeName.toLowerCase() === "input"
      ) {
        i.disabled = false;
      }
    }
  }

  reset() {
    addStrike();
    this.randomize();
  }

  solved() {
    this.solveState();
    moduleSolved();
  }

  solveState() {}
  randomize() {}
  addLogic() {}
  solveState() {}
}

class ButtonModule extends Module {
  constructor(moduleNumber) {
    super();
    this.moduleCont = document.getElementById("m" + moduleNumber);
    this.create("buttonModule");
  }

  randomize() {
    this.numClicks = 0;
    this.neededClicks = 0;
    if (Math.random() >= 0.5) {
      this.moduleCont.querySelector("#main").style.backgroundColor = "#e30000";
    } else {
      this.moduleCont.querySelector("#main").style.backgroundColor = "#009be3";
      this.neededClicks += 2;
    }
    if (Math.random() >= 0.5) {
      this.moduleCont.querySelector("#main").innerHTML = "Detonate";
      this.neededClicks += 1;
    } else {
      this.moduleCont.querySelector("#main").innerHTML = "Defuse";
      this.neededClicks += 2;
    }
    this.clickUp = this.neededClicks > 2;
  }

  addLogic() {
    this.moduleCont.querySelector("#main").addEventListener("click", () => {
      this.numClicks++;
      clickSound();
      if (this.numClicks > this.neededClicks) {
        this.reset();
      }
    });
    this.moduleCont.querySelector("#top").addEventListener("click", () => {
      clickSound();
      if (this.numClicks === this.neededClicks && this.clickUp) {
        this.disable();
        this.solved();
      } else {
        this.reset();
      }
    });
    this.moduleCont.querySelector("#bottom").addEventListener("click", () => {
      clickSound();
      if (this.numClicks === this.neededClicks && !this.clickUp) {
        this.disable();
        this.solved();
      } else {
        this.reset();
      }
    });
  }

  solveState() {
    this.moduleCont.querySelector("#main").innerHTML = "Defused";
    this.moduleCont.querySelector("#main").style.backgroundColor = "#04e300";
  }
}

class HexaModule extends Module {
  constructor(moduleNumber) {
    super();
    this.moduleCont = document.getElementById("m" + moduleNumber);
    this.create("hexaModule");
  }

  randomize() {
    let displayString = "";
    this.wantedString = "";
    for (let i = 0; i < 4; i++) {
      const letter = alpha[Math.floor(Math.random() * alpha.length)];
      this.wantedString += letter;
      displayString += letter.charCodeAt(0).toString(16) + " ";
    }
    displayString = displayString.trimEnd().toUpperCase();
    this.moduleCont.querySelector("#display").innerHTML = displayString;
    console.log(this.wantedString);
  }

  addLogic() {
    this.moduleCont.querySelector("#submit").addEventListener("click", () => {
      clickSound();
      if (
        this.moduleCont.querySelector("#answer").value.toLowerCase().trim() ===
        this.wantedString
      ) {
        this.disable();
        this.solved();
      } else {
        this.reset();
      }
    });
  }

  solveState() {
    this.moduleCont.querySelector("#display").innerHTML = "Defused";
  }
}

class TimerModule extends Module {
  constructor(moduleNumber) {
    super();
    this.moduleCont = document.getElementById("m" + moduleNumber);
    this.create("timerModule");
  }

  randomize() {
    this.solved = false;
    this.timeLeft = 60;
  }

  addLogic() {
    this.interval = setInterval(
      (function (self) {
        return function () {
          const mc = self.moduleCont;
          self.timeLeft--;
          const timeLeft = self.timeLeft;
          if (timeLeft >= 0) {
            mc.querySelector("#mins").innerHTML = "00";
            if (timeLeft.toString().length === 1) {
              mc.querySelector("#secs").innerHTML = "0" + timeLeft;
            } else {
              mc.querySelector("#secs").innerHTML = timeLeft;
            }
          } else {
            if (!this.solved){
              endGame()
            }
          }
        };
      })(this),
      1000
    );
  }

  addStrikeI(strikeCount){
    if (strikeCount > 0 && strikeCount < 3){
      this.moduleCont.querySelector("#strike"+strikeCount).classList.add("usedStrike")
    }
  }

  stop(){
    clearInterval(this.interval)
    return this.timeLeft
  }
}
