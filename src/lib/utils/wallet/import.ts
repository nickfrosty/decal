/**
 * Code related to importing a seed phrase and/or private key into the wallet
 */

import * as base58 from "bs58";
import { Connection, PublicKey } from "@solana/web3.js";
import * as SecureStore from "expo-secure-store";
import { seedPhraseToKeypairs, storeSingleKeypair } from ".";
import { saveUserWalletDetails } from "./details";

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
  const seedPhrase = (await getTempSeedPhraseToSecureStore()) ?? "";
  // console.log("seed phrase:", seedPhrase);

  if (!seedPhrase) {
    throw Error("No seed phrase was found in temporary secure storage");
  }

  const keypairs = await seedPhraseToKeypairs(seedPhrase);

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
export async function saveTempSeedPhraseToSecureStore(seedPhrase: string) {
  await SecureStore.setItemAsync(TEMP_SEED_PHRASE_KEY, seedPhrase, {
    // authenticationPrompt: "?",
    // keychainService:
  });

  // verify the payload was actually written correctly to the SecureStore
  const verify = await getTempSeedPhraseToSecureStore();
  if (!verify || verify !== seedPhrase)
    throw "Unable to save to temporary secure storage";

  // finally, we are done!
  return true;
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

/**
 * import the selected derived accounts into secure storage for use by the app
 *
 * todo: add some way to inform the ui of each imported status. giving better UX
 */
export async function importAccountsFromSeedPhrase(
  accounts: AccountImportDetails[],
) {
  // console.log("importAccountsFromSeedPhrase");

  const seedPhrase = (await getTempSeedPhraseToSecureStore()) ?? "";
  // console.log("seed phrase:", seedPhrase);

  if (!seedPhrase) {
    throw Error("Seed phrase not found in secure storage");
  }

  const keypairs = await seedPhraseToKeypairs(seedPhrase);

  const toImport = accounts.filter((item) => item.shouldImport);

  if (toImport.length <= 0) throw Error("No accounts to import found");

  // console.log(toImport);

  // save each of the desired keys into secure storage
  for (let i = 0; i < toImport.length; i++) {
    const address = keypairs[toImport[i].index].publicKey.toBase58();

    try {
      // actually store the secret key into secure storage
      // (as a base58 encoded version of the secretKey)
      await storeSingleKeypair(
        address,
        base58.encode(keypairs[toImport[i].index].secretKey),
      );

      // add the newly secured secretKey into the user's wallet details listing
      await saveUserWalletDetails({
        address,
      });

      /**
       * todo: better error handling
       *
       * this currently makes no attempt to inform the user if the failed account was not actually imported
       */

      console.log(address, "imported");
    } catch (err) {
      console.log(`Unable to import key derived at index ${i}: ${address}`);
      console.warn(err);
    }
  }

  // finally, return
  return true;
}
