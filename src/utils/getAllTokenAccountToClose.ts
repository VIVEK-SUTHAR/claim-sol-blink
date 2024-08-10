import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import {
  AccountInfo,
  Connection,
  ParsedAccountData,
  PublicKey,
} from "@solana/web3.js";

export type TokenAccount = {
  pubkey: PublicKey;
  account: AccountInfo<Buffer | ParsedAccountData>;
};

export async function getAllTokenAccountsToClose(
  connection: Connection,
  pubKey: string,
): Promise<TokenAccount[]> {
  try {
    const accounts = await connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          {
            dataSize: 165,
          },
          {
            memcmp: {
              offset: 32,
              bytes: pubKey,
            },
          },
        ],
      },
    );

    if (!accounts.length) {
      return [];
    }

    const accountsWithZeroBalance = accounts.filter(
      (tokenAccount: any) =>
        tokenAccount.account.data["parsed"]["info"]["tokenAmount"][
          "uiAmount"
        ] === 0,
    );

    return accountsWithZeroBalance;
  } catch (error) {
    throw new Error(`Failed to fetch token accounts for public key: ${pubKey}`);
  }
}
