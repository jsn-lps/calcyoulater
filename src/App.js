import { useContext, useState, createContext } from 'react';
import './App.css';
import React from 'react';

const DisplayContext = createContext({});
let clearDisplay = false; // toggle for display


const Display = () => {
  const { display } = useContext(DisplayContext);
  return (
      <div id="display">
          { display }
      </div>
  )
}

const NumPad = () => {
  const { display, operator, setOperator, setDisplay, prevNum, setPrevNum } = useContext(DisplayContext);  console.log(display)
  
  const btnClicked = (e) => {

    HandleButton(e, 
      display,
      setDisplay,
      operator,
      setOperator,
      prevNum,
      setPrevNum);}

  return (
    <div id="button-area">
    <button onClick={btnClicked} className="Button" id="divide" value={"/"}>/</button>
    <button onClick={btnClicked} className="Button" id="multiply" value={"x"}>x</button>
    <button onClick={btnClicked} className="Button" id="subtract" value={"-"}>-</button>
    <button onClick={btnClicked} className="Button" id="clear" value="clear">clear</button>
    <button onClick={btnClicked} className="Button" id="seven" value={7}>7</button>
    <button onClick={btnClicked} className="Button" id="eight" value={8}>8</button>
    <button onClick={btnClicked} className="Button" id="nine" value={9}>9</button>
    <button onClick={btnClicked} className="Button" id="add" value={"+"}>+</button>
    <button onClick={btnClicked} className="Button" id="four" value={4}>4</button>
    <button onClick={btnClicked} className="Button" id="five" value={5}>5</button>
    <button onClick={btnClicked} className="Button" id="six" value={6}>6</button>
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


const HandleButton = (e, display, setDisplay, operator, setOperator, prevNum, setPrevNum) => {
  let btnInput = e.target.value;

  // console.log(clearDisplay)

  // clear button
  if (btnInput === "clear") {
    setDisplay(0);
    setOperator(null);
    setPrevNum(null);
    clearDisplay = false;

    // number input handling
  } else if (parseInt(btnInput) || btnInput == 0 || btnInput == ".") {
    
      if (display == 0 || clearDisplay) { // if display == 0 set display to number input
        setDisplay(btnInput);
        clearDisplay = false;
      } else {
        if (btnInput == "." && display % 1 != 0){ // NO REPEATED DECIMALS
          return
        }
        setDisplay(display + btnInput);
      }
      
      // operator handling
  } else if (btnInput === "+") {
    setOperator("+");
    setPrevNum(display)
    clearDisplay = true;

  } else if (btnInput === "-") {
    setOperator("-");
    setPrevNum(display)
    clearDisplay = true;

  } else if (btnInput === "x") {
    setOperator("x");
    setPrevNum(display)
    clearDisplay = true;
    
  } else if (btnInput === "/") {
    setOperator("/");
    setPrevNum(display)
    clearDisplay = true;  

    // equals handling
  } else if (btnInput === "=") {
    switch(true) {
      case (operator === "+"):
        setDisplay(parseFloat(prevNum) + parseFloat(display));
        break;
      case (operator === "-"):
        setDisplay(parseFloat(prevNum) - parseFloat(display));
        break;
      case (operator === "x"):
        setDisplay(parseFloat(prevNum) * parseFloat(display));
        break;
      case (operator === "/"):
        setDisplay(parseFloat(prevNum) / parseFloat(display));
        break;
      }
    }
  }




///////////////////////////////////////////

function App() {
  const [display, setDisplay] = useState(0);
  const [operator, setOperator] = useState(null);
  const [prevNum, setPrevNum] = useState(null);

  return (
    <div className="Page">
      <div className="CalcBody">
        <DisplayContext.Provider value={{display, setDisplay, operator, setOperator, prevNum, setPrevNum}}>
          <Display />
          <NumPad />
        </DisplayContext.Provider>
      </div>
    </div>
  );
}

















































export default App;
