import React, { useState } from 'react'

const TokenLaunchPad = () => {
  const [tokenName, setTokenName] = useState("");
    const [symbol, setSymbol] = useState("");
    const [image, setImage] = useState("");
    const [supply, setSupply] = useState(0);
  
    function handleSubmit(){
      console.log(tokenName, symbol, image,supply )
    }
  
    return (
      <>
        <div>
          <form action="">
            <input
              type="text"
              placeholder="Enter your token name"
              onChange={(e) => setTokenName(e.target.value)}
            />
            <input
              type="text"
              placeholder="symbol"
              onChange={(e) => setSymbol(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your image url"
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter your token supply"
              onChange={(e) => setSupply(e.target.value)}
            />
            <button onClick={handleSubmit}>Create token</button>
          </form>
        </div>
      </>
    );
  
}

export default TokenLaunchPad
