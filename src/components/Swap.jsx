import React, { useEffect, useState } from "react";
import "../css/SimpleDES.css";

export default function Swap({ inputText,onResultUpdate }) {

  const [result, setResult] = useState([]);
  const leftNibble = inputText.slice(0,inputText.length/2);
  const rightNibble = inputText.slice(inputText.length/2);

  useEffect(() => {
    setResult([...rightNibble,...leftNibble]);
  },[]);

  useEffect(()=>{
    if(result.length == 8){
        if(onResultUpdate){
          onResultUpdate(result);
        }
    }
},[result]);

  return (
    <>
      <div className="result-number-block">
      <h3>
          Combine key  :
          <span className="bit-block">
            {inputText.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        <div className="combine-block">
        <h3>
          Left Nibble :
          <span className="bit-block">
            {leftNibble.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        <h3>
          Right Nibble :
          <span className="bit-block">
            {rightNibble.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        </div>
        <h3>
        Swap result : {" "}
          <span className="bit-block">
            {result.map((char, i) => (
              <span key={i} className="bit-element">
                {char}
              </span>
            ))}
          </span>
        </h3>
      </div>
    </>
  );
}
