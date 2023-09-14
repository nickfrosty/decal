/**
 * Library of functions around generating, storing, and using seed phrases
 */

import * as SecureStore from "expo-secure-store";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";
import { DEFAULT_SEED_PHRASE_WORD_COUNT } from "./constants";

export type SeedPhraseInput = string | string[];

/**
 * default configuration settings for the Solana standard derivation path
 *
 * e.g. `m/PURPOSE'/COIN_TYPE'/accountIndex'/0'`
 */
const SOLANA_DERIVE_PATH_SETTINGS = {
  /**
   *
   */
  PURPOSE: 44,

  /**
   * See https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki and
   * See https://github.com/satoshilabs/slips/blob/master/slip-0044.md
   */
  COIN_TYPE: 501,
};

/**
 * construct the general default derivation path to use for Solana wallets
 */
export function solanaDerivationPath(accountIndex: number = 0) {
  return `m/${SOLANA_DERIVE_PATH_SETTINGS.PURPOSE}'/${SOLANA_DERIVE_PATH_SETTINGS.COIN_TYPE}'/${accountIndex}'/0'`;
}

/**
 * get a listing of the first `MAX_KEYPAIRS_TO_RECOVER` keypairs that can be
 * derived from the provided `seedPhrase`
 */
export async function seedPhraseToKeypairs(
  seedPhrase: SeedPhraseInput,
  MAX_KEYPAIRS_TO_RECOVER: number = 24,
) {
  seedPhrase = formatSeedPhrase(seedPhrase);

  // always convert the seed phrase to lower case
  seedPhrase = seedPhrase.trim().toLowerCase();

  // convert the seed phrase into a `seed` buffer
  const seed = await bip39.mnemonicToSeed(seedPhrase);

  let keypairs: Keypair[] = [];

  // recover all the keypairs found from this seed
  for (let index = 0; index <= MAX_KEYPAIRS_TO_RECOVER; index++) {
    const keypair = Keypair.fromSeed(
      derivePath(solanaDerivationPath(index), seed.toString("hex")).key,
    );
    // console.log("index:", index, "-", keypair.publicKey.toBase58());
    keypairs.push(keypair);
  }

  return keypairs;
}

/**
 * derive a single keypair from the provided `seedPhrase` at the
 * desired account index using the default derivation path
 */
export async function derivePublicAddressFromSeedPhrase(
  seedPhrase: SeedPhraseInput,
  accountIndex: number = 0,
) {
  // convert the seed phrase into a `seed` buffer
  const seed = await bip39.mnemonicToSeed(formatSeedPhrase(seedPhrase));

  return Keypair.fromSeed(
    derivePath(solanaDerivationPath(accountIndex), seed.toString("hex")).key,
  ).publicKey;
}

/**
 * generate a new random seed phrase at the desired word count
 */
export function generateSeedPhrase(
  wordCount: 12 | 24 = DEFAULT_SEED_PHRASE_WORD_COUNT,
) {
  //
  const strength = 128 * (wordCount / 12);

  return bip39.generateMnemonic(strength).split(" ");
}

/**
 * format all seed phrases into a standard format
 */
export function formatSeedPhrase(seedPhrase: SeedPhraseInput) {
  // allow an array of seed phrase words
  if (Array.isArray(seedPhrase)) seedPhrase = seedPhrase.join(" ");

  // always trim and convert to lower case
  return seedPhrase.toString().trim().toLowerCase();
}

/**
 * get a stored seed phrase from secure storage
 */
export async function getSeedPhraseFromSecureStore(storageKey: string) {
  return await SecureStore.getItemAsync(storageKey, {
    // authenticationPrompt: "?",
    // keychainService:
  });
}

/**
 * store seed phrase word to secure storage for later retrieval
 *
 */
export async function saveSeedPhraseToSecureStore(
  storageKey: string,
  seedPhrase: SeedPhraseInput,
  allowOverwrite: boolean = false,
) {
  const current = await getSeedPhraseFromSecureStore(storageKey);

  if (!allowOverwrite && !!current)
    throw Error("Not allowed to overwrite existing secure seed phrase");

  seedPhrase = formatSeedPhrase(seedPhrase);

  await SecureStore.setItemAsync(storageKey, seedPhrase, {
    // authenticationPrompt: "?",
    // keychainService:
  });

  // verify the payload was actually written correctly to the SecureStore
  const verify = await getSeedPhraseFromSecureStore(storageKey);
  if (!verify || verify !== seedPhrase)
    throw "Unable to save to temporary secure storage";

  // finally, we are done!
  return true;
}
