import { createCloseAccountsTransaction } from "@/utils/createCloseAccountTxn";
import {
  getAllTokenAccountsToClose,
  TokenAccount,
} from "@/utils/getAllTokenAccountToClose";
import {
  ACTIONS_CORS_HEADERS,
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
} from "@solana/actions";
import { Connection, PublicKey, Transaction } from "@solana/web3.js";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const payload: ActionGetResponse = {
    icon: "https://res.cloudinary.com/dazemzk7u/image/upload/v1723235594/zgsmeu9qj3s60o6u6bbn.png",
    title: "Reclaim Your SOL Rent",
    description:
      "Effortlessly close unneeded token accounts and recover the SOL rent they hold. Take back what's yours with just a few clicks.",
    label: "Claim",
    links: {
      actions: [
        {
          label: "Claim rent",
          href: `${url.href}`,
        },
      ],
    },
  };
  return Response.json(payload, {
    headers: ACTIONS_CORS_HEADERS,
  });
}

export const OPTIONS = GET;
export async function POST(request: Request) {
  let body: ActionPostRequest;
  let sender: PublicKey;

  try {
    body = await request.json();
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    return createErrorResponse("Invalid request body", 400);
  }

  try {
    sender = new PublicKey(body.account);
  } catch (error) {
    return createErrorResponse("Invalid account", 400);
  }

  const HELIUS_RPC = process.env.HELIUS_RPC_URL;
  if (!HELIUS_RPC) {
    console.error("HELIUS_RPC_URL is not set in environment variables");
    return createErrorResponse("Internal Error", 500);
  }

  const connection = new Connection(HELIUS_RPC, "confirmed");

  let tokenAccounts: TokenAccount[];
  try {
    tokenAccounts = await getAllTokenAccountsToClose(
      connection,
      sender.toString(),
    );
  } catch (error) {
    console.error("Error fetching token accounts:", error);
    return createErrorResponse("Failed to fetch token accounts", 500);
  }

  if (!tokenAccounts || tokenAccounts.length === 0) {
    return createErrorResponse("No accounts found to close", 400);
  }

  let transaction: Transaction;
  try {
    transaction = await createCloseAccountsTransaction(
      tokenAccounts,
      sender,
      connection,
    );
  } catch (error) {
    return createErrorResponse("Failed to create transaction", 500);
  }

  let payload: ActionPostResponse;
  try {
    payload = await createPostResponse({
      fields: {
        transaction,
        message: "Transaction created",
      },
    });
  } catch (error) {
    return createErrorResponse("Failed to create response", 500);
  }

  return new Response(JSON.stringify(payload), {
    headers: ACTIONS_CORS_HEADERS,
  });
}

function createErrorResponse(message: string, status: number) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: ACTIONS_CORS_HEADERS,
  });
}
