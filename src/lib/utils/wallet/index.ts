/**
 *
 */

import * as SecureStore from "expo-secure-store";

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
