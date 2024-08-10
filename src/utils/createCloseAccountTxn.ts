import { createCloseAccountInstruction } from "@solana/spl-token";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";
import { TokenAccount } from "./getAllTokenAccountToClose";

export async function createCloseAccountsTransaction(
  tokenAccounts: TokenAccount[],
  sender: PublicKey,
  connection: Connection,
): Promise<Transaction> {
  const transaction = new Transaction();

  for (const tokenAccount of tokenAccounts) {
    transaction.add(
      createCloseAccountInstruction(tokenAccount.pubkey, sender, sender, []),
    );
  }

  const latestBlockhash = await connection.getLatestBlockhash();
  transaction.feePayer = sender;
  transaction.recentBlockhash = latestBlockhash.blockhash;
  transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;

  return transaction;
}
