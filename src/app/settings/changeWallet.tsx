import { Stack, useRouter } from "expo-router";
import { MinorText } from "@/components/core/Styled";
import { ScrollView, MasterStyles, Text, View } from "@/components/core/Themed";
import { ListContainer, ListCheckBox } from "@/components/core/ListContainer";
import { useEffect, useState } from "react";
import {
  UserWalletDetails,
  getAllUserWalletDetails,
} from "@/lib/utils/wallet/details";
import { useAuth } from "@/context/AuthProvider";
import { shortText } from "@/lib/utils";
import { Alert } from "react-native";

/**
 * todo: list of assorted things to add here
 * - toggled text color on the account address text
 * - show the label as well?
 * - better handling of the toggle button displayed
 */

export default function Screen() {
  const router = useRouter();
  const { walletDetails, setWalletDetails } = useAuth();
  const [accounts, setAccounts] = useState<UserWalletDetails[]>([]);

  useEffect(() => {
    (async () => {
      const details = await getAllUserWalletDetails();
      // console.log(details);
      setAccounts(details);
    })();

    // return () => {};
  }, []);

  /**
   * swap the user selected wallet
   */
  function handlePress(address: string) {
    // locate the record from the list of accounts
    const record = accounts.find((item) => item.address === address);

    if (!record) {
      return Alert.alert(
        "Account not found",
        "The selected account was not found.",
      );
    }

    setWalletDetails(record);

    return router.back();
  }

  return (
    <ScrollView style={MasterStyles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Change wallet",
        }}
      />

      <MinorText className="text-base text-center">Select a Wallet</MinorText>

      <ListContainer>
        {accounts.map((item, id) => (
          <ListCheckBox
            label=""
            isTop={id == 0}
            key={id}
            isChecked={walletDetails.address === item.address}
            onPress={() => handlePress(item.address)}
          >
            <View className="bg-transparent">
              <Text className="text-lg">{shortText(item.address)}</Text>
            </View>
          </ListCheckBox>
        ))}
      </ListContainer>
    </ScrollView>
  );
}
