import React, { useEffect, useState } from "react";
import "../css/SimpleDES.css";

export default function Combine({ inputText1, inputText2, onResultUpdate }) {

  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult([...inputText1, ...inputText2]);
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
        <div className="combine-block">
        <h3>
          P4 ⊕ Initial Nibble Left :
          <span className="bit-block">
            {inputText1.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        <h3>
          Initial Nibble Right :
          <span className="bit-block">
            {inputText2.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        </div>
        <h3>
        New (8 bit) Word  : {" "}
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
