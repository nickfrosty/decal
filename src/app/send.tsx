import { Stack } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { useCallback, useState } from "react";

import { TextInput } from "@/components/core/Styled";
import { Text, View } from "@/components/core/Themed";
import Colors from "@/constants/Colors";
import { Button } from "@/components/core/buttons";
import { ChevronUpDownIcon } from "react-native-heroicons/solid";
import DefaultLayout from "@/components/core/DefaultLayout";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useTransaction } from "@/context/TransactionProvider";
import { useAuth } from "@/context/AuthProvider";
import { createMemoInstruction } from "@/lib/spl/memo";

export default function Screen() {
  //
  const { triggerTransactionRequest, cancelTransaction } = useTransaction();
  const { walletAddress } = useAuth();

  // state tracking
  const [amount, setAmount] = useState<string>("0.001");
  const [message, setMessage] = useState<string>("testing...");
  const [address, setAddress] = useState<string>(
    "Hdm44USM6M3hwoMQvv3GJQeK8AyGHTptk7KqFDjfM8Bm",
  );

  /**
   *
   */
  const handleSendAction = useCallback(() => {
    try {
      // ensure there is an authed user
      if (!walletAddress) return Alert.alert("No wallet found...");

      // validate the number
      const amountToSend = parseFloat(amount);
      if (amountToSend.toString() != amount.toString()) {
        return Alert.alert("Invalid amount to send");
      } else if (amountToSend <= 0)
        return Alert.alert("Enter an amount to send");

      // validate the address as a public key
      let toPubkey: PublicKey | null = null;
      try {
        toPubkey = new PublicKey(address.trim());
      } catch (err) {
        console.log("Invalid pubkey:", err);
        if (!toPubkey) return Alert.alert("Invalid receiving address");
      }

      // validate the memo message
      // todo: this

      // construct a transaction to perform the transfer
      const transaction = new VersionedTransaction(
        new TransactionMessage({
          payerKey: walletAddress,
          instructions: [
            // ix - #1
            SystemProgram.transfer({
              fromPubkey: walletAddress,
              lamports: LAMPORTS_PER_SOL / amountToSend,
              toPubkey: toPubkey,
            }),
            // add a memo instruction
            createMemoInstruction({ payer: walletAddress, memo: message }),
          ],
          // note: I am intentionally setting no value so the simulation can auto set it
          recentBlockhash: "",
        }).compileToV0Message(),
      );

      console.log("transaction?");

      // transaction.sign()

      // trigger it!
      triggerTransactionRequest(transaction);
    } catch (err) {
      console.log(err);
      Alert.alert("Unable to send tokens");
    }
  }, [walletAddress, amount, address, triggerTransactionRequest]);

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          // comment for better diffs
          headerShown: true,
          title: "Send",
        }}
      />

      <InputAmount amount={amount} setAmount={setAmount} />

      <View className="w-full gap-y-2">
        <Text className="text-base">Receiver address</Text>

        <TextInput
          multiline={true}
          // style={styles.input}
          className="px-4 py-2 text-lg border border-gray-300 rounded-lg"
          placeholder="Who to send this to?"
          keyboardType="default"
          value={address.toString()}
          onChangeText={(e) => setAddress(e)}
        />
      </View>

      {/* <View className="flex flex-row items-center justify-between w-full px-4 py-3 space-x-4 bg-transparent border border-gray-300 rounded-lg">
        <View className="flex flex-row items-center space-x-2 align-middle">
          <View className="bg-gray-400 rounded-full w-9 h-9"></View>
            <Text className="inline-flex text-lg font-semibold">
              12.12 USDC
            </Text> 

          <View className="flex flex-row gap-1 bg-transparent">
            <Text className="inline-flex text-lg font-semibold">12.12</Text>
            <Text className="inline-flex text-lg font-semibold">
              USDC (max)
            </Text>
          </View>
        </View>

        <ChevronUpDownIcon className="w-4 h-4" size={26} color={"black"} />
      </View> */}

      <View className="w-full gap-y-2">
        <Text className="text-base">Note to the recipient (optional)</Text>

        <TextInput
          multiline={true}
          // style={styles.input}
          className="px-4 py-2 text-lg border border-gray-300 rounded-lg"
          placeholder="What is it for?"
          keyboardType="default"
          value={message.toString()}
          onChangeText={(e) => setMessage(e)}
        />
      </View>

      <View className="flex flex-col w-full gap-2">
        <Button
          label="Send"
          onPress={handleSendAction}
          className="w-full bg-blue-500"
          labelClassName="text-white text-lg"
        />
      </View>
    </DefaultLayout>
  );
}

type InputAmountProps = {
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
};

export function InputAmount({ amount, setAmount }: InputAmountProps) {
  return (
    <View className="text-center">
      <Text
        darkColor={Colors.dark.minorColor}
        lightColor={Colors.light.minorColor}
        className="text-lg font-normal text-center"
      >
        Amount
      </Text>

      <TextInput
        style={styles.amountInput}
        placeholder="0.00"
        keyboardType="numeric"
        autoFocus={true}
        selectTextOnFocus={true}
        value={amount.toString()}
        onChangeText={(e) => setAmount(e)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
});
