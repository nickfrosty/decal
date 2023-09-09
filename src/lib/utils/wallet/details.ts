/**
 *
 */

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * async storage key used to get the user's non-secure wallet details
 */
const USER_WALLET_DETAILS_KEY = "USER_WALLET_DETAILS";

/**
 * simple storage format
 */
export type UserWalletDetails = {
  /**
   * base58 string of the wallet's publickey
   */
  address: string;

  /**
   * simple label to show for this wallet account in the UI
   */
  label?: string;
};

/**
 * get all of the user's non-secure wallet details
 */
export async function getAllUserWalletDetails(): Promise<UserWalletDetails[]> {
  const data = await AsyncStorage.getItem(USER_WALLET_DETAILS_KEY);

  if (!data) return [];

  // parse the secure string as the correct type
  return JSON.parse(data) as UserWalletDetails[];
}

/**
 * save a user's non-secure wallet details (including updating an existing item if it already exists)
 */
export async function saveUserWalletDetails(
  newDetails: UserWalletDetails,
  returnData: boolean = false,
) {
  // get the current wallet details
  const data = await getAllUserWalletDetails();

  // determine if the `newDetails` already exists or not
  const existingIndex = data.findIndex(
    (existing) => existing.address === newDetails.address,
  );

  // update the existing record, or add a new record all together
  if (existingIndex >= 0) data[existingIndex] = newDetails;
  else data.push(newDetails);

  // actually update the stored data
  await AsyncStorage.setItem(USER_WALLET_DETAILS_KEY, JSON.stringify(data));

  // verify the new data was correctly saved
  const verify = await getAllUserWalletDetails();
  if (JSON.stringify(verify) === JSON.stringify(data)) {
    return returnData ? data : true;
  } else return false;
}
