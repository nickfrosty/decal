import { Stack } from "expo-router";
import DefaultLayout from "@/components/core/DefaultLayout";

import { Text, View } from "@/components/core/Themed";
import { GhostButton, GhostLink } from "@/components/core/buttons";
import { useTransaction } from "@/context/TransactionProvider";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

// const wallet = Keypair.generate().publicKey;
const wallet = new PublicKey("Dp1Je1aJ9zifmHpbe64bbLabMqFsAsLnXnSsNSiNsNWL");
console.log("wallet:", wallet.toBase58());

const receiver = Keypair.generate().publicKey;
// const receiver = new PublicKey("GQuioVe2yA6KZfstgmirAvugfUZBcdxSi7sHK7JGk3gk");
console.log("receiver:", receiver.toBase58());

const transaction = new VersionedTransaction(
  new TransactionMessage({
    payerKey: wallet,
    instructions: [
      // ix - #1
      SystemProgram.transfer({
        fromPubkey: wallet,
        lamports: 10_000_000,
        toPubkey: receiver,
      }),
      // ix - #2
      // SystemProgram.transfer({
      //   fromPubkey: wallet,
      //   lamports: 1,
      //   toPubkey: Keypair.generate().publicKey,
      // }),
    ],
    // todo: I am intentionally setting no value
    recentBlockhash: "",
  }).compileToV0Message(),
);

export default function Screen() {
  const { triggerTransactionRequest } = useTransaction();

  return (
    <DefaultLayout>
      <View className={"flex-1 p-4 gap-8 items-center"}>
        <Stack.Screen options={{ title: "Dev Screen" }} />

        <Text className={"font-semibold text-2xl text-center"}>
          Transaction pages
        </Text>

        <View className="flex flex-row items-center justify-center gap-2">
          <GhostLink href="/transaction/details" label="Details" />
          <GhostLink href="/transaction/signMessage" label="Sign" />
          <GhostButton
            label="Request"
            onPress={() => triggerTransactionRequest(transaction)}
          />
        </View>

        <View
          className="w-full h-[1px] bg-gray-200 max-w-[80%] justify-self-center"
          // lightColor="#eee"
          // darkColor="rgba(255,255,255,0.1)"
        />

        <Text className={"font-semibold text-2xl text-center"}>Misc pages</Text>

        <View className="flex flex-row items-center justify-center">
          <GhostLink href="/search" label="Search" />
          {/* <GhostLink href="/accounts/seedPhrase/generate" label="Generate" /> */}
          {/* <GhostLink href="/transaction/sign" label="Sign" /> */}
          {/* <GhostLink href="/transaction/request" label="Request" /> */}
        </View>
      </View>
    </DefaultLayout>
  );
}
