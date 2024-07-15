import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import "../css/SimpleDES.css";

// key Generation
import LSC1 from "./LSC1";
import ConversionP10 from "./ConversionP10";
import ConversionP8 from './ConversionP8';
import LSC2 from "./LSC2";

// Plaintext Converison
import ConversionIP from "./ConversionIP";
import ConversionP4 from "./ConversionP4";
import ConversionIPInverse from "./ConversionIPInverse";
import DivideAndEP from "./DivideAndEP";
import DetermineXOR from "./DetermineXOR";
import SboxResult from "./SboxResult";
import Combine from "./Combine";
import Swap from "./Swap";
import Fk2Update from "./Fk2Update";

export default function SimpleDES() {

  // inputs states
  const [plaintext, setPlaintext] = useState([1,0,1,0,0,1,0,1]);
  const [randomkey, setRandomkey] = useState([0,0,1,0,0,1,0,1,1,1]);
  const [p10, setP10] = useState([3, 5, 2, 7, 4, 10, 1, 9, 8, 6]);
  const [p8, setP8] = useState([6,3,7,4,8,5,10,9]);
  const [p4,setP4] = useState([2,4,3,1]);
  const [ip,setIp] = useState([2,6,3,1,4,8,5,7]);
  const [ipInverse,setIpInverse] = useState([4,1,3,5,7,2,8,6]);
  const [ep,setEp] = useState([4,1,2,3,2,3,4,1]);
  // const [s0,setS0] = useState(Array.from({ length: 4 }, () => Array(4).fill("")));
  // const [s1,setS1] = useState(Array.from({ length: 4 }, () => Array(4).fill("")));

  const s0 = [[1,0,3,2],[3,2,1,0],[0,2,1,3],[3,1,3,2]];
  const s1 = [[0,1,2,3],[2,0,1,3],[3,0,1,0],[2,1,0,3]];

  // step
  const [step, setStep] = useState(0);

  //*****Key Generation variables
  const [p10ConvertedKey,setP10ConvertedKey] = useState([]);
  const [leftShiftResult1, setLeftShiftResult1] = useState([]);
  const [leftShiftResult2, setLeftShiftResult2] = useState([]);
  const [key1,setKey1] = useState([0,0,1,0,1,0,0,0]);
  const [key2,setKey2] = useState([1,1,1,0,1,0,1,0]);


  //*****Plaintext Conversion Variable
  
  // initial permutation result
  const [ipConversionResult,setIpConversionResult] = useState([0,1,1,1,0,1,0,0]);

  // Expansion Conversion Result
  const [fk1_ep_result,set_fk1_ep_result] = useState([0,0,1,0,1,1,1,1]);
  const [fk2_ep_result,set_fk2_ep_result] = useState([]);
  
  // divide
  const [fk1_Initial_N1,set_fk1_Initial_N1] = useState([0,1,1,1]);
  const [fk1_Initial_N2,set_fk1_Initial_N2] = useState([0,1,0,0]);
  const [fk2_Initial_N1,set_fk2_Initial_N1] = useState([]);
  const [fk2_Initial_N2,set_fk2_Initial_N2] = useState([]);

  // p4
  const [fk1_p4_result,set_fk1_p4_result] = useState([]);
  const [fk2_p4_result,set_fk2_p4_result] = useState([]);

  // xor
  const [fk1_ep_xor,set_fk1_ep_xor] = useState([0,0,0,0,0,1,1,1]);
  const [fk1_p4_xor,set_fk1_p4_xor] = useState([1,0,0,1]);
  const [fk2_ep_xor,set_fk2_ep_xor] = useState([]);
  const [fk2_p4_xor,set_fk2_p4_xor] = useState([]);

  // combine
  const [fk1_combine,set_fk1_combine] = useState([]);
  const [fk2_combine,set_fk2_combine] = useState([]);

  // swap
  const [swap_result,setSwapResult] = useState([0,1,0,0,1,0,0,1]);

  // sbox result
  const [fk1_sbox_result,set_fk1_sbox_result] = useState([0,1,1,1])
  const [fk2_sbox_result,set_fk2_sbox_result] = useState([]);

  // IP inverse conversion result
  const [ipInverseConversionResult,setIpInverseConversionResult] = useState([]);


  const handleP10Conversion = (result) => {
    setP10ConvertedKey(result);
  };

  const handleLeftshiftResultUpdate = (result) => {
    setLeftShiftResult1(result);
  };

  const handleLeftshift2ResultUpdate = (result) => {
    setLeftShiftResult2(result);
  };

  const handleP8Conversion = (result) => {
    if(key1.lenght == 0){
      setKey1(result);
    }else{
      setKey2(result);
    }
  }; 

  const handleP4Conversion = (result)=>{
    if(fk1_p4_result.length == 0){
      set_fk1_p4_result(result);
    }else{
      set_fk2_p4_result(result);
    }
  }

  const handleIPConversion = (result) => {
    setIpConversionResult(result);
  };

  const handleEpConversion = ({ leftNibble,rightNibble,epRightNibble }) => {
    if(fk1_ep_result.lenght == 0){
      set_fk1_Initial_N1(leftNibble);
      set_fk1_Initial_N2(rightNibble);
      set_fk1_ep_result(epRightNibble);
    }else{
      set_fk2_Initial_N1(leftNibble);
      set_fk2_Initial_N2(rightNibble);
      set_fk2_ep_result(epRightNibble);
    }
  };

  const handle_XOR_Result=(result)=>{
    if(fk1_ep_xor.length == 0){
      set_fk1_ep_xor(result);
    }
    else if(fk1_p4_xor.length == 0){
      set_fk1_p4_xor(result);
    }else if(fk1_ep_xor.length == 0){
      set_fk2_ep_xor(result);
    }else{
      set_fk2_p4_xor(result);
    }
  }

  const handleSboxResult = (result)=>{
    if(fk1_sbox_result.length == 0){
      set_fk1_sbox_result(result);
    }else{
      set_fk2_sbox_result(result);
    }
  }

  const handleIpInverseConversion = (result)=>{
    setIpInverseConversionResult(result);
  }

  const handleCombineResult = (result)=>{
    if(fk1_combine.length == 0){
      set_fk1_combine(result);
    }else{
      set_fk2_combine(result);
    }
  }

  const handleSwapResult = (result)=>{
    setSwapResult(result);
  }

  return (
    <>
      <header className="header">
        <h1 className="header-text">DES Algorithm - 8 Bit</h1>
      </header>
      <div className="main-block">
        <div className="input-block">
          <h2>PlainText</h2>
          <OtpInput
            value={plaintext.join("")}
            onChange={(e)=>setPlaintext(e.target.value.split(""))}
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
            {/* <h1>Key Generation</h1>
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
            </h2> */}
            {/* {step >= 2 && step <= 12 && (
              <>
              <ConversionP10 randomKey={randomkey} p10={p10} onResultUpdate={handleP10Conversion} />
              <h2>
               Applying Left Shift
              <button onClick={() => setStep(3)}>Apply Left Shift</button>
            </h2>
            </>
            )} */}
{/* 
          {step >= 3 && step <= 12 && (
            <>
              <LSC1 p10ConvertedKey={p10ConvertedKey} onResultUpdate={handleLeftshiftResultUpdate} />
              <h2>
              Applying P8
              <button onClick={() => setStep(4)}>Apply P8</button>
              </h2>
           </>
          )} */}

          {/* {step >= 4 && step <= 12 && (
            <>
              <ConversionP8 leftShiftResult={leftShiftResult1} p8={p8} onResultUpdate={handleP8Conversion} />
              <h2>
               Start Key2 Generation
              <button onClick={() => setStep(5)}>Apply Left Shift 2</button>
              </h2>
            </>
          )}    */}

          {/* {step >= 5 && step <= 12 && (
            <>
              <LSC2 leftShiftResult={leftShiftResult1} onResultUpdate={handleLeftshift2ResultUpdate} />
              <h2>
              Applying P8
              <button onClick={() => setStep(6)}>Apply P8</button>
              </h2>
           </>
          )} */}

          {/* {step >= 6 && step <= 12 && (
            <>
              <ConversionP8 leftShiftResult={leftShiftResult2} p8={p8} onResultUpdate={handleP8Conversion} />
              <h2>
               Start With PlainText
              <button onClick={() => setStep(7)}>Apply Initial Permutation</button>
              </h2>
            </>
          )}    */}

        {/* {step >= 1 && step <= 12 && (
            <>
              <ConversionIP inputText={plaintext} ip={ip} onResultUpdate={handleIPConversion} />
              <h2>
               Applying Divide and EP
              <button onClick={() => setStep(8)}>Apply Divide & Ep</button>
              </h2>
            </>
        )}    */}

        {/* {step >= 1 && step <= 12 && (
            <>
              <DivideAndEP inputText={ipConversionResult} ep={ep} onResultUpdate={handleEpConversion} />
              <h2>
               Applying XOR with Key 1
              <button onClick={() => setStep(8)}>Apply XOR</button>
              </h2>
            </>
        )}    */}

        {/* {step >= 1 && step <= 12 && (
            <>
              <DetermineXOR inputText1={fk1_ep_result} inputText2={key1}  onResultUpdate={handle_XOR_Result} />
              <h2>
               Applying Sbox 
              <button onClick={() => setStep(2)}>Apply Sbox</button>
              </h2>
            </>
        )}    */}

        {/* {step >= 1 && step <= 12 && (
            <>
              <SboxResult inputText={fk1_ep_xor} s0={s0} s1={s1} onResultUpdate={handleSboxResult} />
              <h2>
               Applying Sbox 
              <button onClick={() => setStep(2)}>Apply Sbox</button>
              </h2>
            </>
        )}    */}

        {/* {step >= 1 && step <= 12 && (
            <>
              <ConversionP4 inputText={fk1_sbox_result} p4={p4} onResultUpdate={handleP4Conversion} />
              <h2>
               Applying XOR 
              <button onClick={() => setStep(2)}>Apply xor</button>
              </h2>
            </>
        )}    */}

        {/* {step >= 2 && step <= 12 && (
            <>
              <DetermineXOR inputText1={fk1_p4_result} inputText2={fk1_Initial_N1} onResultUpdate={handle_XOR_Result} />
              <h2>
               Applying Combine 
              <button onClick={() => setStep(3)}>Apply xor</button>
              </h2>
            </>
        )}    */}

{/* 
        {step >= 1 && step <= 12 && (
            <>
              <Combine inputText1={fk1_p4_xor} inputText2={fk1_Initial_N2} onResultUpdate={handleCombineResult} />
              <h2>
               Applying Swap 
              <button onClick={() => setStep(2)}>Apply Swap</button>
              </h2>
            </>
        )}   

        {step >= 2 && step <= 12 && (
            <>
              <Swap inputText={fk1_combine} onResultUpdate={handleSwapResult} />
              <h2>
               Applying Fk2 
              <button onClick={() => setStep(3)}>Apply EP</button>
              </h2>
            </>
        )}    */}

           <Fk2Update inputText={swap_result} initialStep={step} />          
          </div>
        )}
      </div>
    </>
  );
}
