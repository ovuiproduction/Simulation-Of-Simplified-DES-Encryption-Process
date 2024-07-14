import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import "../css/SimpleDES.css";
import LSC1 from "./LSC1";
import ConversionP10 from "./ConversionP10";
import ConversionP8 from './ConversionP8';
import LSC2 from "./LSC2";

export default function SimpleDES() {
  const [plaintext, setPlaintext] = useState("");
  const [randomkey, setRandomkey] = useState([0,0,1,0,0,1,0,1,1,1]);
  const [p10, setP10] = useState([3, 5, 2, 7, 4, 10, 1, 9, 8, 6]);
  const [p8, setP8] = useState([6,3,7,4,8,5,10,9]);
  const [step, setStep] = useState(0);

  const [p10ConvertedKey,setP10ConvertedKey] = useState([]);
  const [leftShiftResult1, setLeftShiftResult1] = useState([]);
  const [p8ConvertedKey,setP8ConvertedKey] = useState([]);
  const [leftShiftResult2, setLeftShiftResult2] = useState([]);

  const handleP10Conversion = (result) => {
    setP10ConvertedKey(result);
  };

  const handleLeftshiftResultUpdate = (result) => {
    setLeftShiftResult1(result);
  };

  const handleLeftshift2ResultUpdate = (result) => {
    setLeftShiftResult2(result);
  };

  const handleP8Conversion = (p8ConvertedKey) => {
    setP8ConvertedKey(p8ConvertedKey);
  };

  return (
    <>
      <header className="header">
        <h1 className="header-text">DES Algorithm - 8 Bit</h1>
      </header>
      <div className="main-block">
        <div className="input-block">
          <h2>PlainText</h2>
          <OtpInput
            value={plaintext}
            onChange={setPlaintext}
            numInputs={8}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
          <h2>Key</h2>
          <OtpInput
            value={randomkey.join("")}
            onChange={(e)=>setRandomkey(e.target.value.split(""))}
            numInputs={10}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
        </div>
      </div>
      <div className="submit-btn-block">
        <button onClick={() => setStep(1)} className="submit-btn">
          Start
        </button>
      </div>
      <div className="solution-block">
        {step >= 1 && (
          <div className="solution-sub-block">
            <h1>Key Generation</h1>
            <div className="result-number-block">
            <h3>10 Bit Key :   
                <span className="bit-block">
              {randomkey.map((element,index)=>(
                <span key={index} className="bit-element">{element}</span>
              ))}
              </span> 
            </h3>
            </div>
            <h2>
              Applying P10 On 10 Bit Random key
              <button onClick={() => setStep(2)}>Apply P10</button>
            </h2>
            {step >= 2 && step <= 12 && (
              <>
              <ConversionP10 randomKey={randomkey} p10={p10} onResultUpdate={handleP10Conversion} />
              <h2>
               Applying Left Shift
              <button onClick={() => setStep(3)}>Apply Left Shift</button>
            </h2>
            </>
            )}

          {step >= 3 && step <= 12 && (
            <>
              <LSC1 p10ConvertedKey={p10ConvertedKey} onResultUpdate={handleLeftshiftResultUpdate} />
              <h2>
              Applying P8
              <button onClick={() => setStep(4)}>Apply P8</button>
              </h2>
           </>
          )}

          {step >= 4 && step <= 12 && (
            <>
              <ConversionP8 leftShiftResult={leftShiftResult1} p8={p8} onResultUpdate={handleP8Conversion} />
              <h2>
               Start Key2 Generation
              <button onClick={() => setStep(5)}>Apply Left Shift 2</button>
              </h2>
            </>
          )}   

          {step >= 5 && step <= 12 && (
            <>
              <LSC2 leftShiftResult={leftShiftResult1} onResultUpdate={handleLeftshift2ResultUpdate} />
              <h2>
              Applying P8
              <button onClick={() => setStep(6)}>Apply P8</button>
              </h2>
           </>
          )}

          {step >= 6 && step <= 12 && (
            <>
              <ConversionP8 leftShiftResult={leftShiftResult2} p8={p8} onResultUpdate={handleP8Conversion} />
              <h2>
               Start With PlainText
              <button onClick={() => setStep(7)}>Apply Initial Permutation</button>
              </h2>
            </>
          )}   



          
          </div>
        )}
      </div>
    </>
  );
}
