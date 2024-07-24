import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";

import "../css/SimpleDES.css";
import "../css/simple-des-min.css";

import TwoDigitInput from "./TwoDigitInput";
import MatrixInput from "./MatrixInput";
// Plaintext Converison
import ConversionIP from "./ConversionIP";
import ConversionIPInverse from "./ConversionIPInverse";
import Swap from "./Swap";
import RoundFunction1 from "./RoundFunction1";
import RoundFunction2 from "./RoundFunction2";
import KeyGeneration from "./KeyGeneration";

export default function DES() {
  // inputs states
  // const [plainText, setPlainText] = useState([1, 0, 1, 0, 0, 1, 0, 1]);
  // const [randomKey, setRandomKey] = useState([0, 0, 1, 0, 0, 1, 0, 1, 1, 1]);
  // const [p10, setP10] = useState([3, 5, 2, 7, 4, 10, 1, 9, 8, 6]);
  // const [p8, setP8] = useState([6, 3, 7, 4, 8, 5, 10, 9]);
  // const [p4, setP4] = useState([2, 4, 3, 1]);
  // const [ip, setIp] = useState([2, 6, 3, 1, 4, 8, 5, 7]);
  // const [ipInverse, setIpInverse] = useState([4, 1, 3, 5, 7, 2, 8, 6]);
  // const [ep, setEp] = useState([4, 1, 2, 3, 2, 3, 4, 1]);

  const [plainText, setPlaintext] = useState(new Array(8).fill(""));
  const [randomKey, setRandomKey] = useState(new Array(8).fill(""));
  const [p10, setP10] = useState(new Array(10).fill(""));
  const [p8, setP8] = useState(new Array(8).fill(""));
  const [p4, setP4] = useState(new Array(4).fill(""));
  const [ip, setIp] = useState(new Array(8).fill(""));
  const [ipInverse, setIpInverse] = useState(new Array(8).fill(""));
  const [ep, setEp] = useState(new Array(8).fill(""));
  const [s0, setS0] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );
  const [s1, setS1] = useState(
    Array.from({ length: 4 }, () => Array(4).fill(""))
  );

  // const matrix0 = [
  //   [1, 0, 3, 2],
  //   [3, 2, 1, 0],
  //   [0, 2, 1, 3],
  //   [3, 1, 3, 2],
  // ];
  // const matrixs1 = [
  //   [0, 1, 2, 3],
  //   [2, 0, 1, 3],
  //   [3, 0, 1, 0],
  //   [2, 1, 0, 3],
  // ];
  // useEffect(() => {
  //   setS0(matrix0);
  //   setS1(matrixs1);
  // }, []);

  const handlePlainTextChange = (value) => {
    const updatedPlaintext = value.split("");
    setPlainText(updatedPlaintext);
  };

  const handleRandomKeyChange = (value) => {
    const updatedKey = value.split("");
    setRandomKey(updatedKey);
  };

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

  const handleStartSignal = () => {
    const isFilled = (arr) => arr.every((val) => val !== "");
    const isMatrixFilled = (matrix) =>
      matrix.every((row) => row.every((val) => val !== ""));

    if (
      isFilled(plainText) &&
      isFilled(randomKey) &&
      isFilled(p10) &&
      isFilled(p8) &&
      isFilled(p4) &&
      isFilled(ip) &&
      isFilled(ipInverse) &&
      isFilled(ep) &&
      isMatrixFilled(s0) &&
      isMatrixFilled(s1)
    ) {
      setStep(1);
    } else {
      alert("Information Missing...");
    }
  };

  // const s0 = [[1,0,3,2],[3,2,1,0],[0,2,1,3],[3,1,3,2]];
  // const s1 = [[0,1,2,3],[2,0,1,3],[3,0,1,0],[2,1,0,3]];
  // const s0 = [
  //   [1, 0, 3, 2],
  //   [3, 2, 1, 0],
  //   [0, 2, 1, 3],
  //   [3, 1, 3, 2],
  // ];
  // const s1 = [
  //   [0, 1, 2, 3],
  //   [2, 0, 1, 3],
  //   [3, 0, 1, 0],
  //   [2, 1, 0, 3],
  // ];

  // step
  const [step, setStep] = useState(0);

  //*****Key Generation variables
  const [key1, setKey1] = useState([]);
  const [key2, setKey2] = useState([]);

  //*****Plaintext Conversion Variable
  // initial permutation result
  const [ipConversionResult, setIpConversionResult] = useState([]);

  // roundfunction result
  const [round1Result, setRound1Result] = useState([]);
  const [round2Result, setRound2Result] = useState([]);

  // swap
  const [swap_result, setSwapResult] = useState([]);

  // IP inverse conversion result
  const [cipherText, setCipherText] = useState([]);

  // functions for Key Genration
  const handleKeyGeneration = ({ key1, key2, lastStep }) => {
    setKey1(key1);
    setKey2(key2);
    setStep(lastStep);
  };

  // functions for Plaintext Encryption
  const handleIPConversion = (result) => {
    setIpConversionResult(result);
  };

  const handleRound1Result = ({ result, lastStep }) => {
    setRound1Result(result);
    setStep(lastStep);
  };

  const handleSwapResult = (result) => {
    setSwapResult(result);
  };

  const handleRound2Result = ({ result, lastStep }) => {
    setRound2Result(result);
    setStep(lastStep);
  };

  const handleIpInverseConversion = (result) => {
    setCipherText(result);
  };

  return (
    <>
      <header className="header">
        <h1 className="header-text">DES Algorithm - 8 Bit</h1>
      </header>
      <div className="main-block">
        <p className="instruction-text">
          *P10 and P8 takes two digit inputs , if you want to fill 8 then fill
          08
        </p>
        <div className="input-block">
          <h2>PlainText</h2>
          <OtpInput
            value={plainText.join("")}
            onChange={handlePlainTextChange}
            numInputs={8}
            renderSeparator={<span className="input-span"></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"input-box"}
          />
          <h2>Key</h2>
          <OtpInput
            value={randomKey.join("")}
            onChange={handleRandomKeyChange}
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
              <MatrixInput matrix={s0} setMatrix={setS0} />
            </div>
          </div>
          <div className="matrix-block">
            <h2>S1</h2>
            <div>
              <MatrixInput matrix={s1} setMatrix={setS1} />
            </div>
          </div>
        </div>
      </div>
      <div className="submit-btn-block">
        <button onClick={handleStartSignal} className="submit-btn">
          Start
        </button>
      </div>
      <div className="solution-block">
        {step >= 1 && (
          <div className="solution-sub-block">
            <h1>Key Generation</h1>
            <div className="result-number-block">
              <div className="bit-number-display">
                <h3>Random Key (10 bit) : </h3>
                <div className="bit-block">
                  {randomKey.map((element, index) => (
                    <span key={index} className="bit-element">
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <h2>
              Applying P10 On 10 Bit Random key
              <button onClick={() => setStep(2)}>Apply P10</button>
            </h2>

            {step >= 2 && step <= 21 && (
              <>
                <KeyGeneration
                  randomKey={randomKey}
                  p10={p10}
                  p8={p8}
                  initialStep={step}
                  onResultUpdate={handleKeyGeneration}
                />
              </>
            )}

            {step >= 6 && step <= 21 && (
              <h1>
                Encrytion of PlainText
                <button
                  className="plaintext-start-btn"
                  onClick={() => setStep(7)}
                >
                  Apply Initial Permutation
                </button>
              </h1>
            )}

            {step >= 7 && step <= 21 && (
              <>
                <ConversionIP
                  inputText={plainText}
                  ip={ip}
                  onResultUpdate={handleIPConversion}
                />
                <h2>
                  Applying Complex Function Round 1
                  <button onClick={() => setStep(8)}>Apply Divide & EP</button>
                </h2>
              </>
            )}

            {step >= 8 && step <= 21 && (
              <RoundFunction1
                s0={s0}
                s1={s1}
                p4={p4}
                ep={ep}
                key1={key1}
                inputText={ipConversionResult}
                initialStep={step}
                onResultUpdate={handleRound1Result}
              />
            )}

            {step >= 13 && step <= 21 && (
              <h2>
                Applying Swap function
                <button onClick={() => setStep(14)}>Apply Swap</button>
              </h2>
            )}

            {step >= 14 && step <= 21 && (
              <>
                <Swap
                  inputText={round1Result}
                  onResultUpdate={handleSwapResult}
                />
                <h2>
                  Applying Complex Function Round 2
                  <button onClick={() => setStep(15)}>Apply Divide & EP</button>
                </h2>
              </>
            )}

            {step >= 15 && step <= 21 && (
              <RoundFunction2
                s0={s0}
                s1={s1}
                p4={p4}
                ep={ep}
                key2={key2}
                inputText={swap_result}
                initialStep={step}
                onResultUpdate={handleRound2Result}
              />
            )}

            {step >= 20 && step <= 21 && (
              <h2>
                Applying IP Inverse
                <button onClick={() => setStep(21)}>Apply IP Inverse</button>
              </h2>
            )}

            {step >= 21 && (
              <>
                <ConversionIPInverse
                  inputText={round2Result}
                  ipInverse={ipInverse}
                  onResultUpdate={handleIpInverseConversion}
                />

                <div className="bit-number-display">
                  <h1>Cipher Text : </h1>
                  <div className="bit-block">
                    {cipherText.map((element, j) => (
                      <span key={j} className="bit-element">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
