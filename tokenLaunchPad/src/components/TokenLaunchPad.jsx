import React, { useState } from "react";
import {
  createInitializeMint2Instruction,
  createMint,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

const TokenLaunchPad = () => {
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [image, setImage] = useState("");
  const [supply, setSupply] = useState(0);

  const { connection } = useConnection(); // remember to destructure connection here
  const wallet = useWallet();

  async function handleSubmit() {
    // console.log(tokenName, symbol, image,supply )

    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const keypair = Keypair.generate();
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),

      // The upper one just created the account with a data size now we are actually shoving some necessary data inside the account generally of 82 bytes
      createInitializeMint2Instruction(
        keypair.publicKey,
        0, // decimals
        wallet.publicKey, // mint authority
        wallet.publicKey, // freeze authority
        TOKEN_PROGRAM_ID
      )
    );

    // to partial sign the transaction you need to first specify the following things
    transaction.feePayer = wallet.publicKey;
    // Set recent block hash because solana rejects the transaction if its not recent enough on the blockchain so get the recent block's hash and set it in the transaction before partially signing it
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    transaction.partialSign(keypair);
    const response = await wallet.sendTransaction(transaction, connection); // it opens the wallet and asks user to sign the transaction using their private key
    console.log(response);
  }

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default TokenLaunchPad;
