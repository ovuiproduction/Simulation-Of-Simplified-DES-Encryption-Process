import React, { useEffect, useState } from "react";
import "../css/Combine.css";

export default function Combine({ inputText1, inputText2, onResultUpdate }) {

  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult([...inputText1, ...inputText2]);
  });

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
          fk1_P4_xor :
          <span className="bit-block">
            {inputText1.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        <h3>
          fk1_initial_N2 :
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
        combine result : {" "}
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
