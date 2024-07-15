import React,{useState,useEffect} from "react";

export default function DetermineXOR({inputText1,inputText2,onResultUpdate}){
    const [result, setResult] = useState([]);
    const [detailedText, setDetailedText] = useState([]);
    
    useEffect(() => {
        inputText1.forEach((_, i) => {
            setTimeout(() => {
              setResult((prev) => {
                const newAnimatedKey = [...prev];
                newAnimatedKey[i] = inputText1[i]^inputText2[i];
                return newAnimatedKey;
              });
              setDetailedText((prev) => {
                const newText = [
                  ...prev,
                  `Result[${i}] = EP[${i}] ^ Key1[${i}] = ${inputText1[i]} ^ ${inputText2[i]} = ${inputText1[i]^inputText2[i]}`
                ];
                return newText;
              });
            }, i * 1000); // Adjust the delay as needed
          });
    }, []);


    useEffect(()=>{
      {inputText1.length}
        if(result.length == inputText2.length){
            if(onResultUpdate){
              onResultUpdate(result);
            }
        }
    },[result]);

    return(
        <>
         <div className="result-number-block">
                <h3>
                  EP : 
                  <span className="bit-block">
                    {inputText1.map((element,j)=>(
                        <span key={j} className="bit-element">{element}</span>
                    ))}
                  </span>
                </h3>
                <h3>
                  Key 1 : 
                  <span className="bit-block">
                    {inputText2.map((element,j)=>(
                        <span key={j} className="bit-element">{element}</span>
                    ))}
                  </span>
                </h3>
                {detailedText.map((text, i) => (
                  <p className="generation-line" key={i}>{text}</p>
                ))}
                <h3>
                  XOR result : {" "}
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
    )
}