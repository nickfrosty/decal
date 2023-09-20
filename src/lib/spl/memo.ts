import { PublicKey, TransactionInstruction } from "@solana/web3.js";

export const MEMO_PROGRAM_ID = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";

type createMemoInstructionProps = {
  payer: PublicKey;
  memo: string;
};

/**
 * Create a memo instruction
 *
 * Read more: https://spl.solana.com/memo
 */
export function createMemoInstruction({
  payer,
  memo,
}: createMemoInstructionProps) {
  return new TransactionInstruction({
    keys: [{ pubkey: payer, isSigner: true, isWritable: true }],
    data: Buffer.from(memo, "utf-8"),
    programId: new PublicKey(MEMO_PROGRAM_ID),
  });
}
