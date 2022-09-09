import { useContext, useState, createContext } from 'react';
import './App.css';
import React from 'react';

const DisplayContext = createContext({});
let clearDisplay = false; // toggle for display
let runTotal = null;
let numerator = null;
let operator = null;
let afterEquals = false;

const Display = () => {
  const { display } = useContext(DisplayContext);
  return (
      <div id="display">
          { display }
      </div>
  )
}

const NumPad = () => {
  const { display, setDisplay, prevNum, setPrevNum, operand, setOperand } = useContext(DisplayContext);  
  // console.log(display)
  
  const btnClicked = (e) => {
    
    HandleButton(e, 
      display,
      setDisplay,
      operand, 
      setOperand);}
      
      return (
        <div id="button-area">
    <button onClick={btnClicked} className="Button" id="neg" value={"neg"}>neg</button>
    <button onClick={btnClicked} className="Button" id="divide" value={"/"}>/</button>
    <button onClick={btnClicked} className="Button" id="multiply" value={"x"}>x</button>
    <button onClick={btnClicked} className="Button" id="clear" value="clear">clear</button>
    <button onClick={btnClicked} className="Button" id="seven" value={7}>7</button>
    <button onClick={btnClicked} className="Button" id="eight" value={8}>8</button>
    <button onClick={btnClicked} className="Button" id="nine" value={9}>9</button>
    <button onClick={btnClicked} className="Button" id="add" value={"+"}>+</button>
    <button onClick={btnClicked} className="Button" id="four" value={4}>4</button>
    <button onClick={btnClicked} className="Button" id="five" value={5}>5</button>
    <button onClick={btnClicked} className="Button" id="six" value={6}>6</button>
    <button onClick={btnClicked} className="Button" id="subtract" value={"-"}>-</button>
    <button onClick={btnClicked} className="Button" id="equals" value={"="}>=</button>
    <button onClick={btnClicked} className="Button" id="one" value={1}>1</button>
    <button onClick={btnClicked} className="Button" id="two" value={2}>2</button>
    <button onClick={btnClicked} className="Button" id="three" value={3}>3</button>
    <button onClick={btnClicked} className="Button" id="smiley"value={":)"}>:)</button>
    <button onClick={btnClicked} className="Button" id="zero" value={0}>0</button>
    <button onClick={btnClicked} className="Button" id="decimal" value={"."}>.</button>
  </div>
  )
}

const DoMath = (display, setDisplay) => {
  clearDisplay = true;
  numerator = parseFloat(display);

  switch(true) {
    case (operator === "+"):
      runTotal = runTotal + numerator;
      break;
      
    case (operator === "-"):
      runTotal = runTotal - numerator;
      break;

    case (operator === "x"):
      runTotal = runTotal * numerator;
      break;

    case (operator === "/"):
      runTotal = runTotal / numerator;
      break;
    }
    setDisplay(runTotal);

}

const HandleButton = (e, display, setDisplay, operand, setOperand, prevNum, setPrevNum) => {
  let btnInput = e.target.value;
  
  // clear button
  if (btnInput === "clear") {
    setDisplay(0);
    operator = null;
    runTotal = null;
    operand =  null;
    numerator = null;
    clearDisplay = false;
    afterEquals = false;

    // number input handling
  } else if (parseInt(btnInput) || btnInput == 0 || btnInput == ".") {
      if (display == 0 || clearDisplay) { // if display == 0 set display to number input

        setDisplay(btnInput);
        clearDisplay = false;

      } else {

        if (btnInput == "."){
          if (display % 1 != 0 || display[(display.toString().length - 1)] == "."){
            return
          }
        }
        setDisplay(display + btnInput);
      }

  } else if (btnInput === "+" || btnInput === "-" || btnInput === "x" || btnInput === "/") {
    if (afterEquals == true) {
      afterEquals = false;
      runTotal = parseFloat(display);
      operator = btnInput;
      clearDisplay = true;
    } else {
    if (runTotal == null) {
      runTotal = parseFloat(display);
      clearDisplay = true;
      operator = btnInput;

    } else {
      DoMath(parseFloat(display), setDisplay)

      operator = btnInput;
    }
  }

  } else if (btnInput === "=") {
    DoMath(parseFloat(display), setDisplay);
    afterEquals = true;
    }
    console.log("run total " + runTotal);
    console.log("operator " + operator);
    console.log("numerator " + numerator);
    console.log("afterEquals is " + afterEquals)
  }

///////////////////////////////////////////

function App() {
  const [display, setDisplay] = useState(0);
  const [operand, setOperand] = useState(null);

  return (
    <div className="Page">
      <div className="CalcBody">
        <DisplayContext.Provider value={{display, setDisplay, operand, setOperand}}>
          <Display />
          <NumPad />
        </DisplayContext.Provider>
      </div>
    </div>
  );
}


export default App;
