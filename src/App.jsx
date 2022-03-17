import { useState } from "react";
import "./App.css";

function App() {
  

  const styles = {
    buttonGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: "10px",
      margin: "10px",
    },
    buttonSelected: {
      backgroundColor: "darkgray",
    },
  };

  const [state, setState] = useState({
    currentNumber: "0",
    previousNumber: "",
    operator: "",
    wasLastKeyOperator: false,
  });


  function handleClick(e, symbol){
    e.preventDefault();
    const isNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(symbol);
    const isOperator = ["+", "-", "x", "÷"].includes(symbol);
    const isSpecialOperator = ["%", "+/-"].includes(symbol);
    const isDecimal = symbol === ".";
    const isClear = symbol === "AC";
    const isEqual = symbol === "=";



    if (isNumber) {
      if(state.wasLastKeyOperator){
        setState({
          ...state,
          currentNumber: symbol,
          wasLastKeyOperator: false,
        });
      }
      else{
        if(state.currentNumber === "0"){
          setState({
            ...state,
            currentNumber:  symbol,
            wasLastKeyOperator: false,
          });
        }
        else{
          setState({
            ...state,
            currentNumber: state.currentNumber + symbol,
            wasLastKeyOperator: false,
          });
        }
      }
    }
    if (isDecimal){
      const decimalAlreadyExists = state.currentNumber.includes(".");
      if (!decimalAlreadyExists) {
        setState((prevState) => ({
          ...prevState,
          currentNumber: prevState.currentNumber + symbol,
        }));
      }
    }
    if (isOperator) {
       if (state.operator === "") {
        setState((prevState) => ({
          ...prevState,
          previousNumber: prevState.currentNumber,
          currentNumber: "0",
          operator: symbol,
          wasLastKeyOperator: true,
        }));
      }
      else{
        const result = getResult();
        setState((prevState) => ({
          ...prevState,
          currentNumber: result,
          previousNumber: result,
          operator: symbol,
          wasLastKeyOperator: true,
        }));
      }
    }
    if (isSpecialOperator) {
      if (symbol === "%") {
        setState((prevState) => ({
          ...prevState,
          currentNumber: prevState.currentNumber / 100,
          wasLastKeyOperator: true,
        }));
      }
      if (symbol === "+/-") {
        setState((prevState) => ({
          ...prevState,
          currentNumber: prevState.currentNumber * -1,
          wasLastKeyOperator: true,
        }));
      }
    }

    if (isClear) {
      setState({
        currentNumber: "0",
        previousNumber: "",
        operator: "",
        wasLastKeyOperator: false,
      });
    }
    if (isEqual) {
      const result = getResult()
      setState({
        currentNumber: result,
        previousNumber: "",
        operator: "",
        wasLastKeyOperator: false,
      });
    }
  }

  function getResult(){
    const firstNumber = parseFloat(state.previousNumber);
    const secondNumber = parseFloat(state.currentNumber);
    let result;
    if (state.operator === "+") {
      result = firstNumber + secondNumber;
    }
    if (state.operator === "-") {
      result = firstNumber - secondNumber;
    }
    if (state.operator === "x") {
      result = firstNumber * secondNumber;
    }
    if (state.operator === "÷") {
      result = firstNumber / secondNumber;
    }
    if (state.operator === "") {
      result = secondNumber;
    }

    return result + "";
  }

  function isSymbolSelected(symbol){
    return state.operator === symbol;
  }

  const symbols = [
    "AC",
    "+/-",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  const Button = ({ label, onClick, isSelected}) => {
    return <button id={label} style={isSelected ? styles.buttonSelected:{}} onClick={onClick}>{label}</button>;
  };

  return (
    <div>
      <h1>{state.currentNumber || 0}</h1>
      <div style={styles.buttonGrid}>
        {symbols.map((symbol) => (
          <Button label={symbol} key={symbol} onClick={(e)=> handleClick(e, symbol)} isSelected = {isSymbolSelected(symbol)}/>
        ))}
      </div>
    </div>
  );
}

export default App;
