import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import OtpInput from "react-otp-input";
import "../css/SimpleDES.css";
import TwoDigitInput from "./TwoDigitInput";
import MatrixInput from "./MatrixInput";

export default function SimpleDES() {
  const [plaintext, setPlaintext] = useState("");
  const [key, setKey] = useState("");
  const [p10, setP10] = useState(new Array(10).fill(""));
  const [p8, setP8] = useState(new Array(8).fill(""));
  const [p4, setP4] = useState(new Array(4).fill(""));
  const [ip, setIp] = useState(new Array(8).fill(""));
  const [ipInverse, setIpInverse] = useState(new Array(8).fill(""));
  const [ep, setEp] = useState(new Array(8).fill(""));
  const [matrixS0, setMatrixS0] = useState(Array.from({ length: 4 }, () => Array(4).fill("")));
  const [matrixS1, setMatrixS1] = useState(Array.from({ length: 4 }, () => Array(4).fill("")));


  const [cipher, setCipher] = useState("");
  const [keyP10,setKeyP10] = useState("");
  const [keyP10LCS1,setkeyP10LCS1] = useState("");
  const [keyP10LCS2,setkeyP10LCS2] = useState("");

  const handleIpChange = (value) => {
    const updatedIp = value.split("");
    setIp(updatedIp);
  };

  const handleP4Change = (value) => {
    const updatedP4 = value.split("");
    setP4(updatedP4);
  };

  const handleEpChange = (value) => {
    const updatedEp = value.split("");
    setEp(updatedEp);
  };

  const handleIpInverseChange = (value) => {
    const updatedIpInverse = value.split("");
    setIpInverse(updatedIpInverse);
  };

  const [key1, setKey1] = useState([0, 0, 1, 0, 1, 1, 1, 1]);
  const [key2, setKey2] = useState([1, 1, 1, 0, 1, 0, 1, 0]);

  const updateKey = () => {
    let updatedKeyP10 = p10.map((index) => key.charAt(index - 1));
    setKeyP10(updatedKeyP10);
    updatedKeyP10 = lsc1(updatedKeyP10);
    setkeyP10LCS1(updatedKeyP10);
    let key_1 = convertIntoP8(updatedKeyP10);
    updatedKeyP10 = convertIntoLcs2(updatedKeyP10);
    setkeyP10LCS2(updatedKeyP10);
    let key_2 = convertIntoP8(updatedKeyP10);
    setKey1(key_1);
    setKey2(key_2);
  };

  const lsc1 = (updatedKeyP10) => {
    let lsc1arr = [];

    let temp0 = updatedKeyP10[0];
    let temp5 = updatedKeyP10[5];

    for (let i = 1; i <= 4; i++) {
      lsc1arr.push(updatedKeyP10[i]);
    }
    lsc1arr.push(temp0);

    for (let i = 6; i <= 9; i++) {
      lsc1arr.push(updatedKeyP10[i]);
    }
    lsc1arr.push(temp5);
    console.log("lcs1arr", lsc1arr);
    return lsc1arr;
  };

  const convertIntoP8 = (updatedKeyP10) => {
    let updatedKeyP8 = p8.map((index) => updatedKeyP10[index - 1]);
    console.log("Key", updatedKeyP8);
    return updatedKeyP8;
  };

  const convertIntoLcs2 = (updatedKeyP10) => {
    let lsc2arr = [];

    let temp0 = updatedKeyP10[0];
    let temp1 = updatedKeyP10[1];
    let temp5 = updatedKeyP10[5];
    let temp6 = updatedKeyP10[6];

    for (let i = 2; i <= 4; i++) {
      lsc2arr.push(updatedKeyP10[i]);
    }
    lsc2arr.push(temp0);
    lsc2arr.push(temp1);

    for (let i = 7; i <= 9; i++) {
      lsc2arr.push(updatedKeyP10[i]);
    }
    lsc2arr.push(temp5);
    lsc2arr.push(temp6);

    console.log("lcs2arr", lsc2arr);
    return lsc2arr;
  };
  let ptIp,ptIpN1,ptIpN2,n2Ep;
  const updatePlainText = () => {

    ptIp = determineIP(plaintext);
   

    ptIpN1 = ptIp.slice(0, 4);
    ptIpN2 = ptIp.slice(4, 10);

    n2Ep = determineEp(ptIpN2);

    let k1n2Epxor = determineXor(n2Ep, key1);

    console.log("xor", k1n2Epxor);
    let key1N1 = k1n2Epxor.slice(0, 4);
    let key1N2 = k1n2Epxor.slice(4, 10);

    console.log(key1N1, key1N2);

    let key1_s0row = [key1N1[0], key1N1[3]];
    let key1_s0col = [key1N1[1], key1N1[2]];

    console.log(key1_s0row, key1_s0col);

    let k1_s0row = convertIntoNumber(key1_s0row);
    let k1_s0col = convertIntoNumber(key1_s0col);

    let key1_s1row = [key1N2[0], key1N2[3]];
    let key1_s1col = [key1N2[1], key1N2[2]];

    console.log(key1_s0row, key1_s0col);

    let k1_s1row = convertIntoNumber(key1_s1row);
    let k1_s1col = convertIntoNumber(key1_s1col);

    console.log(k1_s0row, k1_s0col);

    console.log(k1_s1row, k1_s1col);

    let k1_s0Val = matrixS0[k1_s0row][k1_s0col];
    let k1_s1val = matrixS1[k1_s1row][k1_s1col];

    let k1_sbox_result = sboxResult(k1_s0Val, k1_s1val);

    console.log("k1sboxresult", k1_sbox_result);

    let p4k1_sbox = determineP4(k1_sbox_result);

    let p4k1_sbox_xor = determineXor(p4k1_sbox, ptIpN1);

    console.log(p4k1_sbox_xor);

    let swap_combine = [...ptIpN2, ...p4k1_sbox_xor];

    console.log("swap_combine", swap_combine);

    let swap_combineN1 = swap_combine.slice(0, 4);
    let swap_combineN2 = swap_combine.slice(4, 10);

    let swap_N2Ep = determineEp(swap_combineN2);

    console.log("swap.n2.ep", swap_N2Ep);

    let k2_swap_N2_Epxor = determineXor(swap_N2Ep, key2);

    console.log("k2_swap_N2_Epxor", k2_swap_N2_Epxor);
    let key2N1 = k2_swap_N2_Epxor.slice(0, 4);
    let key2N2 = k2_swap_N2_Epxor.slice(4, 10);

    console.log(key2N1, key2N2);

    let key2_s0row = [key2N1[0], key2N1[3]];
    let key2_s0col = [key2N1[1], key2N1[2]];

    console.log(key2_s0row, key2_s0col);

    let k2_s0row = convertIntoNumber(key2_s0row);
    let k2_s0col = convertIntoNumber(key2_s0col);

    let key2_s1row = [key2N2[0], key2N2[3]];
    let key2_s1col = [key2N2[1], key2N2[2]];

    console.log(key2_s0row, key2_s0col);

    let k2_s1row = convertIntoNumber(key2_s1row);
    let k2_s1col = convertIntoNumber(key2_s1col);

    console.log(k2_s0row, k2_s0col);

    console.log(k2_s1row, k2_s1col);

    let k2_s0Val = matrixS0[k2_s0row][k2_s0col];
    let k2_s1val = matrixS1[k2_s1row][k2_s1col];

    let k2_sbox_result = sboxResult(k2_s0Val, k2_s1val);

    console.log("k2-sbox-resilt", k2_sbox_result);

    let p4_k2_sbox_result = determineP4(k2_sbox_result);

    console.log("p4_k2_sbox-result", p4_k2_sbox_result);

    let xor_k2_sbox_N1 = determineXor(swap_combineN1, p4_k2_sbox_result);

    console.log("xor_k2_sbox_N1-result", xor_k2_sbox_N1);

    let final_combine = [...xor_k2_sbox_N1, ...swap_combineN2];

    let cipherText = determineIpInverse(final_combine, ipInverse);

    setCipher(cipherText);

    console.log("cipherText", cipherText);
  };

  const convertIntoNumber = (arr) => {
    return arr[0] * 2 + arr[1] * 1;
  };

  const valueToBit = (v) => {
    let result = [];
    if (v == 0) {
      result.push(0);
      result.push(0);
    } else if (v == 1) {
      result.push(0);
      result.push(1);
    } else if (v == 2) {
      result.push(1);
      result.push(0);
    } else if (v == 3) {
      result.push(1);
      result.push(1);
    }
    return result;
  };
  const sboxResult = (v1, v2) => {
    let result = [];
    let r1 = valueToBit(v1);
    let r2 = valueToBit(v2);
    result = [...r1, ...r2];
    return result;
  };

  const determineIP = (plaintext) => {
    return ip.map((index) => plaintext[index - 1]);
  };

  const determineEp = (ptIpN2) => {
    return ep.map((index) => ptIpN2[index - 1]);
  };

  const determineIpInverse = (final_combine, ipInverse) => {
    return ipInverse.map((index) => final_combine[index - 1]);
  };

  const determineXor = (n2Ep, key) => {
    console.log("key", key);
    let xor = [];
    for (let i = 0; i < key.length; i++) {
      xor.push(key[i] ^ n2Ep[i]);
    }
    return xor;
  };

  const determineP4 = (sbox_result) => {
    return p4.map((index) => sbox_result[index - 1]);
  };

  const [indicator,setIndicator] = useState(false);
  const handleSubmit = ()=>{
    updateKey();
    updatePlainText();
    setIndicator(true);
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
            value={plaintext}
            onChange={setPlaintext}
            numInputs={8}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
          <h2>Key</h2>
          <OtpInput
            value={key}
            onChange={setKey}
            numInputs={10}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
          <h2>P10</h2>
          <TwoDigitInput value={p10} onChange={setP10} numInputs={10} />
          <h2>P8</h2>
          <TwoDigitInput value={p8} onChange={setP8} numInputs={8} />
          <h2>P4</h2>
          <OtpInput
            value={p4.join("")}
            onChange={handleP4Change}
            numInputs={4}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
          <h2>E/P</h2>
          <OtpInput
            value={ep.join("")}
            onChange={handleEpChange}
            numInputs={8}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
          <h2>IP</h2>
          <OtpInput
            value={ip.join("")}
            onChange={handleIpChange}
            numInputs={8}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
          <h2>
            IP<sup className="inverse">-1</sup>
          </h2>
          <OtpInput
            value={ipInverse.join("")}
            onChange={handleIpInverseChange}
            numInputs={8}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
        </div>
        <div className="matrix-input-block">
          <div className="matrix-block">
            <h2>S0</h2>
            <div>
              <MatrixInput matrix={matrixS0} setMatrix={setMatrixS0} />
            </div>
          </div>
          <div className="matrix-block">
            <h2>S1</h2>
            <div>
              <MatrixInput matrix={matrixS1} setMatrix={setMatrixS1} />
            </div>
          </div>
        </div>
      </div>
      <div className="submit-btn-block">
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
      {/* {indicator && */}
      <div className="solution-block">
        <div className="solution-sub-block">
        <h1>Key Generation <button>start</button></h1>
        <h3>10 Bit Random Key : <span>0010010111</span></h3>
        <h2>Applying P10 On 10 Bit Random key <button>Apply P10</button></h2>
        <h3>P10 : <span>3 5 2 6 4 8 9 3 10 8</span></h3>
        <h3>key : <span>0 0 1 0 0 1 0 1 1 1</span></h3>
        <h3>newKey[i] = key[p10[i]]</h3>
        <h3>newKey : <span>0 1 1 1 0 1 1 1</span></h3>
        </div>
      </div>
      {/* } */}
    </>
  );
}
