import { Stack } from "expo-router";
import { Alert, Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View, ScrollView } from "@/components/core/Themed";
import { encodeURL } from "@solana/pay";
import Colors from "@/constants/Colors";
import { PublicKey } from "@solana/web3.js";
import QRCode from "react-native-qrcode-svg";
import { Button } from "@/components/core/buttons";
import { ChevronUpDownIcon } from "react-native-heroicons/solid";

const QR_CODE_SIZE = 200;

// const address = "GQuioVe2yA6KZfstgmirAvugfUZBcdxSi7sHK7JGk3gk";
const address = "EVhZyAqKfzCV1sSEGHZBneJdr3jiM6mMNmd6RcNQM5rm";

export default function RequestScreen() {
  // generate the SolanaPay qr code on the client only (e.g. within useEffect)
  // encode the url with the desired params
  const solanaPayUri = encodeURL({
    recipient: new PublicKey(address),
    // amount: 100,
    // reference: new PublicKey("GQuioVe2yA6KZfstgmirAvugfUZBcdxSi7sHK7JGk3gk"),
    // label: "Decal",
    // message: "this is a message",
    // memo: "this is the memo",
  });

  // console.log(solanaPayUri);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          // name=""
          options={{ title: "Request Payment" }}
        />

        <Pressable
          onPress={() => Alert.alert("copy wallet address")}
          className="p-4 m-4 border border-gray-300 rounded-xl"
        >
          <QRCode
            value={address ?? solanaPayUri.toString()}
            size={QR_CODE_SIZE}
          />
        </Pressable>

        <View className="flex flex-row items-center justify-between w-full px-4 py-3 space-x-4 bg-transparent border border-gray-300 rounded-lg">
          <View className="flex flex-row items-center space-x-2 align-middle">
            <View className="bg-gray-400 rounded-full w-9 h-9"></View>
            <Text className="inline-flex text-lg font-semibold">USDC</Text>
          </View>

          <ChevronUpDownIcon className="w-4 h-4" size={26} color={"black"} />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>Requested amount (optional)</Text>

          <TextInput
            inputMode="numeric"
            className="px-4 py-2 text-lg border border-gray-300 rounded-lg"
            placeholder="How much should they send?"
            keyboardType="default"
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>Memo for the sender (optional)</Text>

          <TextInput
            multiline={true}
            // style={styles.input}
            className="px-4 py-2 text-lg border border-gray-300 rounded-lg"
            placeholder="What is it for?"
            keyboardType="default"
          />
        </View>

        <View className="flex flex-col w-full gap-2">
          <Button
            label="Create a payment link"
            onPress={() => Alert.alert("derp1")}
            className="w-full bg-blue-500"
            labelClassName="text-white"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export function InputAmount() {
  return (
    <View className="text-center">
      <Text
        // style={styles.title}
        darkColor={Colors.dark.minorColor}
        lightColor={Colors.light.minorColor}
        className="text-lg font-normal text-center"
      >
        Requested Amount
      </Text>

      <TextInput
        className="content-center justify-center w-full px-4 py-2 mx-auto my-4 text-5xl text-center bg-transparent place-self-center justify-self-center"
        placeholder="0.00"
        keyboardType="numeric"
        // autoFocus={true}
        selectTextOnFocus={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  amountBlock: {
    width: "100%",
    gap: 12,
  },
  inputBlock: {
    width: "100%",
    gap: 5,
  },
  amountInput: {
    marginVertical: 12,
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 48,
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 18,
  },
  multiline: {
    width: "100%",
    height: 100,
    textAlign: "left",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    verticalAlign: "top",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
