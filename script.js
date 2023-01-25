class Calculator {
  constructor(dataPreviousText, dataCurrentText) {
    this.dataCurrentText = dataCurrentText;
    this.dataPreviousText = dataPreviousText;
    this.clear();
  }
  clear() {
    this.currentOperand = " ";
    this.previousOperand = " ";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    if (operation == "10x") {
      this.operation = "10^";
    } else if (operation == "xy") {
      this.operation = "^";
    } else if (operation == "2") {
      this.operation = "√";
    } else if (operation == "x2") {
      this.operation = "^2";
    } else if (operation == "1/X") {
      this.operation = "1/";
    } else if (operation == "n!") {
      this.operation = "!";
    }

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) && isNaN(current)) return;
    console.log(this.operation);

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "mod":
        computation = prev % current;
        break;
      case "log":
        computation = Math.log10(current);
        break;
      case "ln":
        computation = Math.log10(current) * 2.303;
        break;
      case "10^":
        computation = Math.pow(10, current);
        break;
      case "^":
        computation = Math.pow(prev, current);
        break;
      case "√":
        computation = Math.sqrt(current);
        break;
      case "^2":
        computation = Math.pow(prev, 2);

        break;
      case "1/":
        computation = 1 / current;

        break;
      case "!":
        if (prev < 0) {
            computation = -1;
        }

        
        else if (prev === 0) {
            computation = 1;
        }
   
        else {
          let fact = 1;
          for (let i = 1; i <= prev; i++) {
            fact *= i;
          }
          computation = fact;
        }
       

        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.previousOperand = "";
    this.operation = undefined;
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigit = parseFloat(stringNumber.split(".")[0]);
    const decimalDigit = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigit)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigit.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.dataCurrentText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.dataPreviousText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.dataPreviousText.innerText = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[ data-operation ]");

const equalsButton = document.querySelector("[data-equals]");
const dataAllClearButton = document.querySelector("[data-all-clear]");
const clearButton = document.querySelector("[data-delete]");
const dataPreviousText = document.querySelector("[data-prvious]");
const dataCurrentText = document.querySelector("[data-current]");

const calculator = new Calculator(dataPreviousText, dataCurrentText);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
dataAllClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
