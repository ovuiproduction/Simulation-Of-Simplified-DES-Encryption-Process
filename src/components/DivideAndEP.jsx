import React, { useEffect, useState } from "react";

export default function DivideAndEP({ inputText, ep, onResultUpdate }) {
  const [epRightNibble, setEPRightNibble] = useState([]);
  const [detailedTextRightNibble, setDetailedTextRightNibble] = useState([]);

  const leftNibble = inputText.slice(0, inputText.length / 2);
  const rightNibble = inputText.slice(inputText.length / 2);

  useEffect(() => {
    ep.forEach((index, i) => {
      setTimeout(() => {
        setEPRightNibble((prev) => {
          const newAnimatedKey = [...prev];
          newAnimatedKey[i] = rightNibble[index - 1];
          return newAnimatedKey;
        });
        setDetailedTextRightNibble((prev) => {
          const newText = [
            ...prev,
            `updatedPT[${i}] = PT[EP[${i}]-1] = PT[${index - 1}] = ${
              rightNibble[index - 1]
            }`,
          ];
          return newText;
        });
      }, i * 1000); // Adjust the delay as needed
    });
  }, []);

  useEffect(() => {
    if (epRightNibble.length == 8) {
      if (onResultUpdate) {
        onResultUpdate({ leftNibble, rightNibble, epRightNibble });
      }
    }
  }, [epRightNibble]);

  return (
    <>
      <div className="lcs1-main-container">
        <h3>
          Initial Permuted Text :
          <span className="bit-block">
            {inputText.map((element, j) => (
              <span key={j} className="bit-element">
                {element}
              </span>
            ))}
          </span>
        </h3>
        <div className="lsc1-main-block">
          <div className="lsc1-sub-block">
            <h3>
              Left Nibble :
              <span className="bit-block">
                {leftNibble.map((element, j) => (
                  <span key={`left-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </span>
            </h3>
          </div>
          <div className="lsc1-sub-block">
            <h3>
              Right Nibble :
              <span className="bit-block">
                {rightNibble.map((element, j) => (
                  <span key={`right-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </span>
            </h3>
            <div className="array-generation-block">
              {detailedTextRightNibble.map((element, i) => (
                <p className="generation-line" key={i}>
                  {element}
                </p>
              ))}
            </div>
            <h3>
              Updated Right Nibble:
              <span className="bit-block">
                {epRightNibble.map((element, j) => (
                  <span key={`right-updated-${j}`} className="bit-element">
                    {element}
                  </span>
                ))}
              </span>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
