import React, { useEffect, useState } from "react";

export default function ConversionP4({ inputText, p4, onResultUpdate }) {
  const [result, setResult] = useState([]);
  const [detailedText, setDetailedText] = useState([]);

  useEffect(() => {
    p4.forEach((index, i) => {
      setTimeout(() => {
        setResult((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = inputText[index - 1];
          return newAnimatedKey;
        });
        setDetailedText((prev) => {
          const newText = [
            ...prev,
            `updatedPT[${i}] = sBoxResult[P4[${i}]-1] = sBoxResult[${index - 1}] = ${
              inputText[index - 1]
            }`,
          ];
          return newText;
        });
      }, i * 1000); // Adjust the delay as needed
    });
  }, []);

  useEffect(() => {
    if (result.length == 4) {
      if (onResultUpdate) {
        onResultUpdate(result);
      }
    }
  }, [result]);

  return (
    <>
      <div className="result-number-block">
        <h3 className="bit-number-display">
          <span className="bits-title">SBox Result : </span>
          <span className="bit-block">
            {inputText.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        <h3 className="bit-number-display">
          <span className="bits-title">P4 :</span>
          <span className="bit-block">
            {p4.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>

        {detailedText.map((text, i) => (
          <p className="generation-line" key={i}>
            {text}
          </p>
        ))}
        <h3>
          Updated Text :{" "}
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
