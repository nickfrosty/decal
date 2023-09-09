import { memo, useRef } from "react";
import { Text, View } from "@/components/core/Themed";
import { ColorSchemeName } from "react-native";
import Colors from "@/constants/Colors";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { TouchableOpacity } from "@/components/core/Styled";
import { shortText } from "@/lib/utils";

export type AccountDetails = {
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

type AccountDetailsItemProps = {
  account: AccountDetails;
  onPress?: (isChecked: boolean) => void;
  shouldImport: boolean;
  colorScheme: NonNullable<ColorSchemeName>;
};

export function AccountDetailsItem({
  colorScheme,
  account,
  shouldImport,
  onPress,
}: AccountDetailsItemProps) {
  return (
    <TouchableOpacity className="mb-1 bg-transparent">
      <BouncyCheckbox
        className={"items-center px-2 py-3 border rounded-lg"}
        style={{
          borderColor: shouldImport
            ? Colors[colorScheme].minorColor
            : Colors[colorScheme].borderColor,
        }}
        size={28}
        // unfillColor="#FFFFFF"
        fillColor={"red"}
        innerIconStyle={{
          borderWidth: 1,
          borderColor: Colors[colorScheme].borderColor,
        }}
        textComponent={
          <AccountDetailsTextComponent
            colorScheme={colorScheme}
            account={account}
            shouldImport={shouldImport}
          />
        }
        isChecked={shouldImport}
        onPress={onPress}
      />
    </TouchableOpacity>
  );
}

export const AccountDetailsTextComponent = memo(
  ({ colorScheme, account, shouldImport }: AccountDetailsItemProps) => (
    <View className="flex flex-row items-center justify-between w-full max-w-full mx-3 bg-transparent">
      <Text
        className={"text-lg"}
        style={{
          color: shouldImport
            ? Colors[colorScheme].text
            : Colors[colorScheme].minorColor,
        }}
      >
        {shortText(account.publicKey.toBase58(), 6)}
      </Text>

      <Text
        className={"pr-10 text-sm"}
        style={{
          color: shouldImport
            ? Colors[colorScheme].text
            : Colors[colorScheme].minorColor,
        }}
      >
        {account.balance / LAMPORTS_PER_SOL} SOL
      </Text>
    </View>
  ),
);
