class Calculator {
  constructor(outTotal, outHistory) {
    this.outTotal = outTotal;
    this.outHistory = outHistory;
    this.clear();
  }

  clear() {
    this.outTotalOperend = "";
    this.outHistoryOperend = "";
    this.operation = undefined;
  }

  delete() {
    this.outTotalOperend = this.outTotalOperend.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.outTotalOperend.includes(".")) return;
    this.outTotalOperend = this.outTotalOperend.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.outTotalOperend === "") return;
    if (this.outHistoryOperend !== "") {
      this.compute();
    }

    this.operation = operation;
    this.outHistoryOperend = this.outTotalOperend;
    this.outTotalOperend = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.outHistoryOperend);
    const curr = parseFloat(this.outTotalOperend);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "x":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      case "%":
        computation = (prev / curr) * 100;
        break;
      default:
        return;
    }

    if (Number.isInteger(computation)) this.outTotalOperend = computation;
    else this.outTotalOperend = computation.toFixed(2);
    this.operation = undefined;
    this.outHistoryOperend = "";
  }

  getDisplayNumbers(number) {
    const stringNumber = number.toString();
    const intengerNumber = parseFloat(stringNumber.split(".")[0]);
    const decimalNumber = stringNumber.split(".")[1];
    let intengerDisplay;
    if (isNaN(intengerNumber)) {
      intengerDisplay = "";
    } else {
      intengerDisplay = intengerNumber.toLocaleString("kz", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalNumber != null) {
      return `${intengerDisplay}.${decimalNumber}`;
    } else {
      return intengerDisplay;
    }
  }

  updateDisplay() {
    this.outTotal.innerText = this.getDisplayNumbers(this.outTotalOperend);
    if (this.operation != null) {
      this.outHistory.innerText = `${this.getDisplayNumbers(
        this.outHistoryOperend
      )} ${this.operation} `;
    } else {
      this.outHistory.innerText = "";
    }
  }
}

// Connecting the buttons
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
// Connecting the output screens
const outTotal = document.querySelector("[data-calc-total]");
const outHistory = document.querySelector("[data-calc-history]");

const calculator = new Calculator(outTotal, outHistory);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

// Buttons on header
let yourbuttons = document.getElementsByClassName("change_button");
for (let i = yourbuttons.length - 1; i >= 0; i--) {
  var currentbtn;
  yourbuttons[i].onclick = function () {
    if (currentbtn) {
      currentbtn.classList.remove("active");
    }
    this.classList.add("active");
    currentbtn = this;
  };
}
