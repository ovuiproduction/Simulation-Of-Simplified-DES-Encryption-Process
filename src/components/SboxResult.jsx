import React, { useState, useEffect } from "react";
import "../css/SboxResult.css"
export default function SboxResult({ inputText, s0, s1, onResultUpdate }) {
    const [newLeftNibble, setNewLeftNibble] = useState([]);
    const [newRightNibble, setNewRightNibble] = useState([]);
    const [detailedTextLeftNibble, setDetailedTextLeftNibble] = useState([]);
    const [detailedTextRightNibble, setDetailedTextRightNibble] = useState([]);
    const [result, setResult] = useState([]);
    
    const leftNibble = inputText.slice(0, inputText.length / 2);
    const rightNibble = inputText.slice(inputText.length / 2);

    useEffect(() => {
        const updateLeftNibble = () => {
            const row = parseInt(`${leftNibble[0]}${leftNibble[3]}`, 2);
            const col = parseInt(`${leftNibble[1]}${leftNibble[2]}`, 2);
            const s0Value = s0[row][col];
            const s0Bits = s0Value.toString(2).padStart(2, '0').split('');

            const detailedText = [
                `Row Value = leftNibble[0] leftNibble[3]`,
                `Row Value = ${leftNibble[0]} ${leftNibble[3]}`,
                `Row Value (decimal) = ${row}`,
                `Col Value = leftNibble[1] leftNibble[2]`,
                `Col Value = ${leftNibble[1]} ${leftNibble[2]}`,
                `Col Value (decimal) = ${col}`,
                `S0 Matrix Value = s0[Row,Col]`,
                `S0 Matrix value = s0[${row},${col}]`,
                `S0 Matrix value = ${s0Value}`,
                `S0 Matrix value Bit: ${s0Bits.join('')}`
            ];

            detailedText.forEach((text, index) => {
                setTimeout(() => {
                    setDetailedTextLeftNibble(prev => [...prev, text]);
                    if (index === detailedText.length - 1) {
                        setNewLeftNibble(s0Bits);
                    }
                }, index * 1000);
            });
        };

        const updateRightNibble = () => {
            const row = parseInt(`${rightNibble[0]}${rightNibble[3]}`, 2);
            const col = parseInt(`${rightNibble[1]}${rightNibble[2]}`, 2);
            const s1Value = s1[row][col];
            const s1Bits = s1Value.toString(2).padStart(2, '0').split('');

            const detailedText = [
                `Row Value = rightNibble[0] rightNibble[3]`,
                `Row Value = ${rightNibble[0]} ${rightNibble[3]}`,
                `Row Value (decimal) = ${row}`,
                `Col Value = rightNibble[1] rightNibble[2]`,
                `Col Value = ${rightNibble[1]} ${rightNibble[2]}`,
                `Col Value (decimal) = ${col}`,
                `S1 Matrix Value = s1[Row,Col]`,
                `S1 Matrix value = s1[${row},${col}]`,
                `S1 Matrix value = ${s1Value}`,
                `S1 Matrix value Bit: ${s1Bits.join('')}`
            ];

            detailedText.forEach((text, index) => {
                setTimeout(() => {
                    setDetailedTextRightNibble(prev => [...prev, text]);
                    if (index === detailedText.length - 1) {
                        setNewRightNibble(s1Bits);
                    }
                }, index * 1000);
            });
        };

        updateLeftNibble();
        updateRightNibble();
    }, []);

    useEffect(() => {
        if (newLeftNibble.length === 2 && newRightNibble.length === 2) {
            const combinedResult = [...newLeftNibble, ...newRightNibble];
            setResult(combinedResult);
            if (onResultUpdate) {
                onResultUpdate(combinedResult);
            }
        }
    }, [newLeftNibble, newRightNibble, onResultUpdate]);

    return (
        <div className="sbox-main-block">
            <h3>Key1 xor EP : 
                <span className="bit-block">
                    {inputText.map((element, j) => (
                        <span key={j} className="bit-element">{element}</span>
                    ))}
                </span>
            </h3>
            <div className='lsc1-main-block'>
                <div className='lsc1-sub-block'>
                    <h3>Left Nibble: 
                        <span className="bit-block"> 
                            {leftNibble.map((element, j) => (
                                <span key={`left-${j}`} className="bit-element">{element}</span>
                            ))}
                        </span>
                    </h3>
                    <div className='array-generation-block'>
                        {detailedTextLeftNibble.map((text, i) => (
                            <p className="generation-line" key={`left-detail-${i}`}>{text}</p>
                        ))}
                        <p className="matrix-result-bit-block">S0 Matrix value Bit: 
                        <span className="bit-block"> 
                            {newLeftNibble.map((element, i) => (
                                <span key={`s0Bit-${i}`} className="bit-element">{element}</span>
                            ))}
                        </span>
                        </p>
                    </div>
                </div>
                <div className='lsc1-sub-block'>
                    <h3>Right Nibble: 
                        <span className="bit-block"> 
                            {rightNibble.map((element, j) => (
                                <span key={`right-${j}`} className="bit-element">{element}</span>
                            ))}
                        </span>
                    </h3>
                    <div className='array-generation-block'>
                        {detailedTextRightNibble.map((text, i) => (
                            <p className="generation-line" key={`right-detail-${i}`}>{text}</p>
                        ))}
                        <p className="matrix-result-bit-block">S1 Matrix value Bit:
                        <span className="bit-block">  
                            {newRightNibble.map((element, i) => (
                                <span key={`s1Bit-${i}`} className="bit-element">{element}</span>
                            ))}
                        </span>
                        </p>
                    </div>
                </div>
            </div>
            <h3>Combined Result: 
                <span className="bit-block"> 
                    {result.map((element, j) => (
                        <span key={`result-${j}`} className="bit-element">{element}</span>
                    ))}
                </span>
            </h3>
        </div>
    );
}
