import React ,{useEffect,useState} from 'react';

import ConversionP4 from "./ConversionP4";
import ConversionIPInverse from "./ConversionIPInverse";
import DivideAndEP from "./DivideAndEP";
import DetermineXOR from "./DetermineXOR";
import SboxResult from "./SboxResult";
import Combine from "./Combine";

export default function Fk2Update({inputText,initialStep}){

  // inputs states
//   const [plaintext, setPlaintext] = useState([1,0,1,0,0,1,0,1]);
  const [p4,setP4] = useState([2,4,3,1]);
//   const [ip,setIp] = useState([2,6,3,1,4,8,5,7]);
  const [ipInverse,setIpInverse] = useState([4,1,3,5,7,2,8,6]);
  const [ep,setEp] = useState([4,1,2,3,2,3,4,1]);
  // const [s0,setS0] = useState(Array.from({ length: 4 }, () => Array(4).fill("")));
  // const [s1,setS1] = useState(Array.from({ length: 4 }, () => Array(4).fill("")));

  const s0 = [[1,0,3,2],[3,2,1,0],[0,2,1,3],[3,1,3,2]];
  const s1 = [[0,1,2,3],[2,0,1,3],[3,0,1,0],[2,1,0,3]];

//   step
    const [step,setStep] = useState();
    useEffect(()=>{
        setStep(initialStep);
    },[]);

  //  key 
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
  const [swap_result,setSwapResult] = useState([]);

  // sbox result
  const [fk1_sbox_result,set_fk1_sbox_result] = useState([0,1,1,1])
  const [fk2_sbox_result,set_fk2_sbox_result] = useState([]);

  // IP inverse conversion result
  const [cipherText,setCipherText] = useState([]);


 
  const handleP4Conversion = (result)=>{
      set_fk2_p4_result(result);
  }

  const handleEpConversion = ({ leftNibble,rightNibble,epRightNibble }) => {
      set_fk2_Initial_N1(leftNibble);
      set_fk2_Initial_N2(rightNibble);
      set_fk2_ep_result(epRightNibble);
  };

  const handle_XOR_Result=(result)=>{
    if(fk2_ep_xor.length == 0){
      set_fk2_ep_xor(result);
    }
    else if(fk2_p4_xor.length == 0){
      set_fk2_p4_xor(result);
    }
  }

  const handleSboxResult = (result)=>{
    set_fk2_sbox_result(result);
  }

  const handleIpInverseConversion = (result)=>{
    setCipherText(result);
  }

  const handleCombineResult = (result)=>{
    set_fk2_combine(result);
  }

    return(
        <>
          {step >= 1 && step <= 12 && (
            <>
              <DivideAndEP inputText={inputText} ep={ep} onResultUpdate={handleEpConversion} />
              <h2>
               Applying XOR with Key 1
              <button onClick={() => setStep(2)}>Apply XOR</button>
              </h2>
            </>
        )}   

        {step >= 2 && step <= 12 && (
            <>
              <DetermineXOR inputText1={fk2_ep_result} inputText2={key2}  onResultUpdate={handle_XOR_Result} />
              <h2>
               Applying Sbox 
              <button onClick={() => setStep(3)}>Apply Sbox</button>
              </h2>
            </>
        )}   

        {step >= 3 && step <= 12 && (
            <>
              <SboxResult inputText={fk2_ep_xor} s0={s0} s1={s1} onResultUpdate={handleSboxResult} />
              <h2>
               Applying Sbox 
              <button onClick={() => setStep(4)}>Apply Sbox</button>
              </h2>
            </>
        )}   

        {step >= 4 && step <= 12 && (
            <>
              <ConversionP4 inputText={fk2_sbox_result} p4={p4} onResultUpdate={handleP4Conversion} />
              <h2>
               Applying XOR 
              <button onClick={() => setStep(5)}>Apply xor</button>
              </h2>
            </>
        )}   

        {step >= 5 && step <= 12 && (
            <>
              <DetermineXOR inputText1={fk2_p4_result} inputText2={fk2_Initial_N1} onResultUpdate={handle_XOR_Result} />
              <h2>
               Applying Combine 
              <button onClick={() => setStep(6)}>Apply xor</button>
              </h2>
            </>
        )}   


        {step >= 6 && step <= 12 && (
            <>
            <Combine inputText1={fk2_p4_xor} inputText2={fk2_Initial_N2} onResultUpdate={handleCombineResult} />
            <h2>
            Applying IP Inverse 
            <button onClick={() => setStep(7)}>Apply Swap</button>
            </h2>
            </>
        )}   

        {step >= 7 && step <= 12 && (
            <>
            <ConversionIPInverse inputText={fk2_combine} ipInverse={ipInverse} onResultUpdate={handleIpInverseConversion} />
            <h1>Cipher Text : 
            <span className="bit-block">
                {cipherText.map((element,j)=>(
                    <span key={j} className="bit-element">{element}</span>
                ))}
            </span>
            </h1>
            </>
        )}   

        </>
    );
}