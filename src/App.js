import { useContext, useState, useEffect, createContext } from 'react';
import './App.css';
import React from 'react';

const DisplayContext = createContext({});

const Display = () => {
  const { display } = useContext(DisplayContext);
  return (
      <div id="display">
          { display }
      </div>
  )
}

const NumPad = () => {
  const { display } = useContext(DisplayContext);

  const btnClicked = (e) => HandleButton(e, "value");

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


const HandleButton = (e) => {
  const { answer, setAnswer, setDisplay } = useContext(DisplayContext);

  console.log(e.target.value);
  let btnInput = e.target.value;

  if (e.target.value === "=") {
    setAnswer(0);
    setDisplay(0);
  } else if (parseInt(btnInput)) {
      btnInput = parseInt(btnInput);
    } 
  setAnswer(answer + e.target.value)
  }






function App() {

  const [display, setDisplay] = useState(0);

  const [answer, setAnswer] = useState(null);



  return (
    <div className="Page">
      <div className="CalcBody">
        <DisplayContext.Provider value={{display, setDisplay, answer, setAnswer}}>
          <Display />
          <NumPad />
        </DisplayContext.Provider>
      </div>
    </div>
  );
}

















































export default App;
