import { Stack } from "expo-router";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { Text, View, ScrollView } from "@/components/core/Themed";
import { MonoText } from "@/components/StyledText";
import { Button } from "@/components/core/buttons";
import { List, ListItem } from "@/components/core/lists";
import { shortText } from "@/lib/utils";

/**
 * todo: the follow is a general list of todo items
 * - transaction simulation!
 * - add support for setting a memo for the transaction
 * - add support for updating compute budget instructions
 * - add a simple network switcher to help people that are currently on another network
 *      but need to just sign this one transaction on a different network
 *      (maybe this should only be enabled when a global "developer mode is enabled")
 * - attempt to determine if a transaction is likely to fail based on the recent blockhash being expired?
 *      (this could also be done with giving a timeout indicator on the page? but this could also make people think they need to rush to sign)
 * - give notice to the user if they are signing a nonce account
 * - detect if multiple transactions are in this?
 * - allow converting network fee to FIAT equivalent
 * - show the advanced transaction details by default when developer mode is enabled?
 */

export default function TransactionRequestScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          // name=""
          options={{ title: "Transaction Request" }}
        />

        <View className="flex items-center justify-center gap-2 my-4">
          <View className="items-center justify-center w-20 h-20 align-middle bg-gray-300 rounded-full">
            <FontAwesome
              className="order-2 w-4 h-4"
              size={40}
              color={"white"}
              name={"question"}
            />
          </View>

          <MonoText className={"text-lg text-gray-600 text-center lowercase"}>
            decal.app
          </MonoText>
        </View>

        <View className="items-center gap-3">
          <Text className={"font-semibold text-2xl"}>Transaction Request</Text>

          <Text className={"text-gray-500"}>
            You are being asked to approve a transaction
          </Text>
        </View>

        {/* simple transaction details */}
        <List>
          {/* <ListItem title="Network" value={"Solana mainnet"} /> */}
          <ListItem
            title="Network fee"
            value={"0.000005 SOL"}
            className="border-b-gray-200"
          />
          <ListItem title="Fee payer" value={"you"} />
        </List>

        {false && (
          <>
            {/* transaction and instruction details section */}
            <View>
              <Text className={"font-semibold text-lg"}>
                Advanced Transaction Details
              </Text>
            </View>

            <View className="flex flex-col">
              {/* pl-5 space-y-2 bg-red-300 gap-y-3 */}
              <List>
                <ListItem
                  title="#0 - Compute Budget Program"
                  className="border-b-gray-300"
                />
                {/* <ListItem title="Fee payer" value={"you"} /> */}
                <ListItem
                  title="Program ID"
                  value={shortText("Comput...111111")}
                />
                {/* <ListItem title="Data" value={"rhdtfhgj"} /> */}
              </List>
              <View className="mb-2"></View>
              <List>
                <ListItem
                  title="#1 - Squads v3"
                  className="border-b-gray-300"
                />
                <ListItem
                  title="Program ID"
                  value={shortText("SMPLec...8ZekMu")}
                />
                {/* <ListItem title="Signer" value={shortText("ryctvykluiuiykudjfg")} /> */}
                {/* <ListItem
              title="Data"
              value={"e7ad315beb18441306000000000102030405"}
            /> */}
              </List>
            </View>
          </>
        )}

        {/* button action area */}
        <View className="flex flex-col gap-3">
          <Button
            label="Approve"
            onPress={() => Alert.alert("approve")}
            className="bg-blue-500"
            labelClassName="text-white"
          />
          <Button
            label="Reject"
            onPress={() => Alert.alert("reject")}
            className="bg-transparent border-gray-300"
            labelClassName="text-black text-base"
            // icon="external-link"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    gap: 20,
  },
});
