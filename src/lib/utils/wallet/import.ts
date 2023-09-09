/**
 * Code related to importing a seed phrase and/or private key into the wallet
 */

import * as base58 from "bs58";
import { Connection, PublicKey } from "@solana/web3.js";
import * as SecureStore from "expo-secure-store";
import { seedPhraseToKeypairs } from ".";

const TEMP_SEED_PHRASE_KEY = "TMP_SEED_PHRASE_KEY";

export type AccountImportDetails = {
  /**
   * account index used in the derivation path
   */
  index: number;

  /**
   * publicKey of the account
   */
  publicKey: PublicKey;

  /**
   * lamport balance of the account
   */
  balance: number;

  /**
   * whether or not this account should be imported into the wallet's SecureStorage
   */
  shouldImport: boolean;

  /**
   * custom label to set for this account after import
   *
   * todo: this. maybe long press on the checkbox to allow the user to input the label?
   * ideally, these would auto populate if the account owns a solana domain name?
   */
  label?: string;
};

/**
 * get a listing of the account details for the seed phrase stored in temp secure storage.
 * Including: `publicKey`, `balance`, and derivation account `index`
 */
export async function getAccountImportDetails(connection: Connection) {
  const words = (await getTempSeedPhraseToSecureStore()) ?? "";
  console.log("seed phrase:", words);

  if (!words) {
    throw Error("No seed phrase was found in temporary secure storage");
  }

  const keypairs = await seedPhraseToKeypairs(words);

  // get the balance of all the derived accounts from the blockchain
  const balances = await Promise.all(
    keypairs.map((item) => connection.getBalance(item.publicKey)),
  );

  // compute the formatted account details for the UI to display
  const accountDetails: AccountImportDetails[] = [];
  // note: we start at index=1 since the default derived address will always be imported
  for (let i = 1; i < keypairs.length; i++) {
    // console.log(
    //   `[${i}]`,
    //   keypairs[i].publicKey.toBase58(),
    //   "-",
    //   balances[i],
    // );

    // console.log(`[${i}]`, base58.encode(keypairs[i].secretKey));

    const details: AccountImportDetails = {
      index: i,
      publicKey: keypairs[i].publicKey,
      balance: balances[i],
      shouldImport: i == 0 || balances[i] > 0,
    };

    // sort these by if they should be imported or not (to-be-imported on top of course)
    if (details.balance > 0 || details.shouldImport) {
      accountDetails.unshift(details);
    } else {
      accountDetails.push(details);
    }
  }

  // always add the account at index=0 to the top of the list
  accountDetails.unshift({
    index: 0,
    shouldImport: true,
    publicKey: keypairs[0].publicKey,
    balance: balances[0],
  });

  // finally, return the formatted AccountDetails
  return accountDetails;
}

/**
 * temporarily store seed phrase words to secure storage for retrieval
 */
export async function saveTempSeedPhraseToSecureStore(words: string) {
  return await SecureStore.getItemAsync(TEMP_SEED_PHRASE_KEY, {
    // authenticationPrompt: "?",
    // keychainService:
  });
}

/**
 * get the temporarily stored seed phrase words from secure storage
 */
async function getTempSeedPhraseToSecureStore() {
  return await SecureStore.getItemAsync(TEMP_SEED_PHRASE_KEY, {
    // authenticationPrompt: "?",
    // keychainService:
  });
}
