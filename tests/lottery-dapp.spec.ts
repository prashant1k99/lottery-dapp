import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { LotteryDapp } from "../app";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

describe("Lottery DApp testing", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const wallet = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.LotteryDapp as Program<LotteryDapp>;

  it("should initialize config", async () => {
    const startTime = new anchor.BN(Math.floor(Date.now() / 1000));

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const endTime = new anchor.BN(Math.floor(oneYearFromNow.getTime() / 1000));

    const initConfig = await program.methods.initializeConfig(
      startTime,
      endTime,
      new anchor.BN(10_000), // 10_000 lamports for every ticket
    ).instruction();

    const blockHashWithContext = await provider.connection.getLatestBlockhash();

    const tx = new anchor.web3.Transaction(
      {
        feePayer: wallet.publicKey,
        blockhash: blockHashWithContext.blockhash,
        lastValidBlockHeight: blockHashWithContext.lastValidBlockHeight,
      },
    ).add(initConfig);

    const signature = await anchor.web3.sendAndConfirmTransaction(
      provider.connection,
      tx,
      [wallet.payer],
      {
        // To read a full error
        skipPreflight: true
      }
    );

    console.log("Your transaction signature: ", signature);

    const initLotteryIx = await program.methods.initializeLottery().accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
    }).instruction();

    const initLotteryTx = new anchor.web3.Transaction(
      {
        feePayer: wallet.publicKey,
        blockhash: blockHashWithContext.blockhash,
        lastValidBlockHeight: blockHashWithContext.lastValidBlockHeight,
      },
    ).add(initLotteryIx);

    const initLotterySignature = await anchor.web3.sendAndConfirmTransaction(
      provider.connection,
      initLotteryTx,
      [wallet.payer],
      {
        skipPreflight: true
      }
    )

    console.log("Your lottery transaction signature: ", initLotterySignature);
  });
});
