/**
 *
 */

import * as SecureStore from "expo-secure-store";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as bip39 from "bip39";
import { DEFAULT_SEED_PHRASE_WORD_COUNT } from "./constants";

const USER_WALLET_METADATA_KEY = "user_wallet_metadata";

/**
 * simple storage format
 */
type UserWalletDetails = {
  /**
   * reference key used to access the private key via `SecureStore`
   */
  key: string;

  /**
   * base58 string of the wallet's publickey
   */
  address: string;

  /**
   * account index in on the derivation path for this account
   */
  index: number;

  /**
   * custom derivation path used for this wallet account
   *
   * todo: this would be used to support multiple derivation paths, should the need arise
   * todo: this will also require some sort of string replacement to use the correct account `index`
   */
  // derivationPath?: string;
};

type UserWalletMetadata = UserWalletDetails[];

/**
 * base58 encoded `secretKey` from a keypair
 *
 * note: convert this to a Keypair using Keypair.fromSecretKey(base58.decode(val))
 */
type SecureStoreSecretKey = string;

/**
 *
 */
export async function getUserWalletDetails(): Promise<UserWalletMetadata> {
  const data = await SecureStore.getItemAsync(USER_WALLET_METADATA_KEY, {
    // authenticationPrompt: "?",
    // keychainService:
  });

  if (!data) return [];

  // parse the secure string as the correct type
  return JSON.parse(data) as UserWalletMetadata;
}

/**
 * get a keypair's secret data from SecureStore via its `storageKey`
 */
export async function getSingleKeypairFromSecureStore(storageKey: string) {
  return await SecureStore.getItemAsync(storageKey, {
    // authenticationPrompt: "?",
    // keychainService:
  });
}

/**
 * store a single keypair's secret key (aka `payload`) into the SecureStore
 */
export async function storeSingleKeypair(storageKey: string, payload: string) {
  // get the current stored data at `storageKey` to ensure it is not already filled
  const current = await getSingleKeypairFromSecureStore(storageKey);

  // make sure we are not about to overwrite new, different payload...
  if (!!current && current !== payload)
    throw "SecureStore `storageKey` is already in use";

  // write the privateKey `payload` to the secure store
  await SecureStore.setItemAsync(storageKey, payload, {
    // authenticationPrompt: "?",
    // keychainService:
  });

  // verify the payload was actually written correctly to the SecureStore
  const verify = await getSingleKeypairFromSecureStore(storageKey);
  if (!verify || verify !== payload) throw "Se";

  // finally, we are done!
  return true;
}

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
function solanaDerivationPath(accountIndex: number = 0) {
  return `m/${SOLANA_DERIVE_PATH_SETTINGS.PURPOSE}'/${SOLANA_DERIVE_PATH_SETTINGS.COIN_TYPE}'/${accountIndex}'/0'`;
}

/**
 * get a listing of the first `MAX_KEYPAIRS_TO_RECOVER` keypairs that can be
 * derived from the provided `seedPhrase`
 */
export async function seedPhraseToKeypairs(
  seedPhrase: string | string[],
  MAX_KEYPAIRS_TO_RECOVER: number = 24,
) {
  // allow an array of seed phrase words
  if (Array.isArray(seedPhrase)) seedPhrase = seedPhrase.join(" ");

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
  seedPhrase: string | string[],
  accountIndex: number = 0,
) {
  // allow an array of seed phrase words
  if (Array.isArray(seedPhrase)) seedPhrase = seedPhrase.join(" ");

  // convert the seed phrase into a `seed` buffer
  const seed = await bip39.mnemonicToSeed(seedPhrase);

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
