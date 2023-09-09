/**
 * Code related to importing a seed phrase and/or private key into the wallet
 */

import { PublicKey } from "@solana/web3.js";
import * as SecureStore from "expo-secure-store";

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
