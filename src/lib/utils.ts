/**
 *
 */

import { LAMPORTS_PER_SOL } from "@solana/web3.js";

/**
 *
 * todo: there is an edge case if the text.length of < `length`, then characters will be duplicated in the response
 */
export function shortText(
  text: string,
  length: number = 6,
  separator: string = "...",
) {
  return (
    text.substring(0, length) + separator + text.substring(text.length - length)
  );
}

/**
 * Convert a lamport number to a pretty to look at SOL value
 */
export function formatLamportsToSol(lamports: number) {
  return Intl.NumberFormat(undefined, {
    minimumSignificantDigits: 1,
    minimumFractionDigits: 3,
  }).format(lamports / LAMPORTS_PER_SOL);
}
