let calc = new Calculator();

function Calculator() {

	this.methods = {
  	"+": (a, b) => a + b,
    "-": (a, b) => a - b,
  }
  
  this.calculate = (str) => {
		let arr = str.split(' ');
    const operator = arr[1];
    const num1 = +arr[0];
    const num2 = +arr[2];
    
    if (!this.methods[operator] || isNaN(num1) || isNaN(num2)) {
      return NaN;
    }
    
    return this.methods[operator](num1, num2)
  }
  
  this.addMethod = (name, func) => {
  	this.methods[name] = func;
  }
}

console.log( calc.calculate("3 - 7") ); // 10

let powerCalc = new Calculator();
powerCalc.addMethod("*", (a, b) => a * b);
powerCalc.addMethod("/", (a, b) => a / b);
powerCalc.addMethod("**", (a, b) => a ** b);

let result = powerCalc.calculate("21 / 3");
console.log( result ); // 7