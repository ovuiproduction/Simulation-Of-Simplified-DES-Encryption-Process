import React, { useEffect, useState } from "react";

import ConversionP4 from "./ConversionP4";
import DivideAndEP from "./DivideAndEP";
import DetermineXOR from "./DetermineXOR";
import SboxResult from "./SboxResult";
import Combine from "./Combine";

export default function RoundFunction1({
  inputText,
  key1,
  p4,
  ep,
  s0,
  s1,
  initialStep,
  onResultUpdate,
}) {
  //   step
  const [step, setStep] = useState(initialStep);

  //*****Plaintext Conversion Variable

  // Expansion Conversion Result
  const [fk1_ep_result, set_fk1_ep_result] = useState([]);

  // divide
  const [fk1_Initial_N1, set_fk1_Initial_N1] = useState([]);
  const [fk1_Initial_N2, set_fk1_Initial_N2] = useState([]);

  // p4
  const [fk1_p4_result, set_fk1_p4_result] = useState([]);

  // xor
  const [fk1_ep_xor, set_fk1_ep_xor] = useState([]);
  const [fk1_p4_xor, set_fk1_p4_xor] = useState([]);

  // combine
  const [fk1_combine, set_fk1_combine] = useState([]);

  // sbox result
  const [fk1_sbox_result, set_fk1_sbox_result] = useState([]);

  const handleP4Conversion = (result) => {
    set_fk1_p4_result(result);
  };

  const handleEpConversion = ({ leftNibble, rightNibble, epRightNibble }) => {
    set_fk1_Initial_N1(leftNibble);
    set_fk1_Initial_N2(rightNibble);
    set_fk1_ep_result(epRightNibble);
  };

  const handle_XOR_Result = (result) => {
    if (fk1_ep_xor.length == 0) {
      set_fk1_ep_xor(result);
    } else if (fk1_p4_xor.length == 0) {
      set_fk1_p4_xor(result);
    }
  };

  const handleSboxResult = (result) => {
    set_fk1_sbox_result(result);
  };

  const handleCombineResult = (result) => {
    set_fk1_combine(result);
  };

  useEffect(() => {
    if (fk1_combine.length == 8) {
      onResultUpdate({ result: fk1_combine, lastStep: step });
    }
  }, [fk1_combine]);

  return (
    <>
      {step >= 8 && step <= 21 && (
        <>
          <DivideAndEP
            inputText={inputText}
            ep={ep}
            onResultUpdate={handleEpConversion}
            inputDes={"Result of IP"}
          />
          <h2>
          XOR the expanded half with subkey K1
            <button onClick={() => setStep(9)}>Apply XOR</button>
          </h2>
        </>
      )}

      {step >= 9 && step <= 21 && (
        <>
          <DetermineXOR
            inputText1={fk1_ep_result}
            inputText2={key1}
            onResultUpdate={handle_XOR_Result}
            inputDes1={"EP Result"}
            inputDes2={"Subkey-1"}
          />
          <h2>
          Apply the S-Boxes (S0 and S1) to the result
            <button onClick={() => setStep(10)}>Apply S-Box</button>
          </h2>
        </>
      )}

      {step >= 10 && step <= 21 && (
        <>
          <SboxResult
            inputText={fk1_ep_xor}
            s0={s0}
            s1={s1}
            onResultUpdate={handleSboxResult}
            inputDes={"EP Result ⊕ Subkey-1"}
          />
          <h2>
          Apply the P4 permutation to the output of the S-Boxes
            <button onClick={() => setStep(11)}>Apply P4</button>
          </h2>
        </>
      )}

      {step >= 11 && step <= 21 && (
        <>
          <ConversionP4
            inputText={fk1_sbox_result}
            p4={p4}
            onResultUpdate={handleP4Conversion}
          />
          <h2>
          XOR the P4 output with the left half (L)
            <button onClick={() => setStep(12)}>Apply XOR</button>
          </h2>
        </>
      )}

      {step >= 12 && step <= 21 && (
        <>
          <DetermineXOR
            inputText1={fk1_p4_result}
            inputText2={fk1_Initial_N1}
            onResultUpdate={handle_XOR_Result}
            inputDes1={"P4 Result"}
            inputDes2={"Initial Left Nibble"}
          />
          <h2>
            Combining P4 Result and Initial Nibble
            <button onClick={() => setStep(13)}>Apply Combine</button>
          </h2>
        </>
      )}

      {step >= 13 && step <= 21 && (
        <>
          <Combine
            inputText1={fk1_p4_xor}
            inputText2={fk1_Initial_N2}
            onResultUpdate={handleCombineResult}
          />
        </>
      )}
    </>
  );
}
