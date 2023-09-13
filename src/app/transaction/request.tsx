import { Stack } from "expo-router";
import { Alert } from "react-native";

import DefaultLayout from "@/components/core/DefaultLayout";
import { Text, View } from "@/components/core/Themed";
import { Button, GhostButton } from "@/components/core/buttons";
import { List, ListItem } from "@/components/core/lists";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import { useSimulateTransaction } from "@/hooks/useSimulateTransaction";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { InstructionDetails } from "@/components/transactions/InstructionDetails";
import { formatLamportsToSol, shortText } from "@/lib/utils";
import { useMemo, useState } from "react";
import { TouchableOpacity, ViewBox } from "@/components/core/Styled";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "react-native-heroicons/solid";

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

export default function TransactionRequestScreen() {
  // track some react state
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(true);

  // construct the transaction simulation
  const simulation = useSimulateTransaction({
    // comment for better diffs
    tx: transaction,
  });

  // memoize a nice label for the fee payer
  const feePayerLabel = useMemo(() => {
    const addr = simulation.accountAddresses[0] || "[err]";

    if (addr === wallet.toBase58()) return "you";
    else return shortText(addr);
  }, [transaction.message]);

  /**
   * details to get from the simulation:
   * - error message
   * - logs
   * - account state changes?
   */

  console.log("accountChanges:", simulation.accountChanges);

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Transaction Request",
        }}
      />

      <HeroIcon
        background="bg-gray-300"
        icon={<QuestionMarkCircleIcon size={40} color={"white"} />}
        label="decal.app"
      />

      <HeroTitleSection
        title={"Transaction Request"}
        description={"You are being asked to approve a transaction"}
      />

      {/* todo: this should be themed */}
      {!!simulation?.error && (
        <ViewBox className="bg-red-500 border-red-700">
          <Text className="text-base">
            If approved, this transaction is still likely to fail!
          </Text>
        </ViewBox>
      )}

      {/* simple transaction details */}
      <List>
        {/* <ListItem isTopItem={true} title="Network" value={"Solana mainnet"} /> */}
        <ListItem
          isTopItem={true}
          title="Network fee"
          value={`${formatLamportsToSol(simulation.estimatedFee)} SOL`}
        />
        <ListItem title="Fee payer" value={feePayerLabel} />
      </List>

      <>
        {/* transaction and instruction details section */}
        <View className="flex flex-row items-center justify-between">
          <Text className={"font-semibold text-lg"}>
            Advanced Transaction Details
          </Text>

          <TouchableOpacity
            className="p-2"
            onPress={() => setShowAdvancedDetails((prev) => !prev)}
          >
            {showAdvancedDetails ? (
              <ChevronDoubleUpIcon className="" size={20} color={"white"} />
            ) : (
              <ChevronDoubleDownIcon className="" size={20} color={"white"} />
            )}
          </TouchableOpacity>
        </View>

        {/* process each of the instructions for display */}
        {showAdvancedDetails && (
          <View className="flex flex-col">
            {transaction.message.compiledInstructions.map((ix, key) => (
              <InstructionDetails
                key={key}
                index={key}
                ix={ix}
                programId={simulation.accountAddresses[ix.programIdIndex]}
              />
            ))}
          </View>
        )}
      </>

      {/* button action area */}
      <View className="flex flex-col gap-3">
        <Button
          label="Approve"
          onPress={() => Alert.alert("approve")}
          className="w-full bg-blue-500"
          labelClassName="text-white"
        />
        <GhostButton
          label="Reject"
          onPress={() => Alert.alert("reject")}
          // className=""
          labelClassName="text-base"
          // icon="external-link"
        />
      </View>
    </DefaultLayout>
  );
}
