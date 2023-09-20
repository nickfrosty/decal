import { useCallback, useMemo, useState } from "react";
import {
  BottomModal,
  BottomModalProps,
  ModalHeader,
} from "@/components/core/BottomModal";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";

import { Text, View } from "@/components/core/Themed";
import { List, ListItem } from "@/components/core/lists";
import { VersionedTransaction } from "@solana/web3.js";
import { formatLamportsToSol, shortText } from "@/lib/utils";
import { MinorText, TouchableOpacity, ViewBox } from "@/components/core/Styled";
import { Button, GhostButton } from "@/components/core/buttons";
// import { useSimulateTransaction } from "@/hooks/useSimulateTransaction";
import { Alert } from "react-native";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "react-native-heroicons/solid";
import { InstructionDetails } from "@/components/transactions/InstructionDetails";
import { useAuth } from "@/context/AuthProvider";

type ModalProps = BottomModalProps & {
  transaction: VersionedTransaction | null;
  simulation: any;
};

export const TransactionModal = ({
  modalRef,
  transaction,
  simulation,
}: ModalProps) => {
  const { walletAddress } = useAuth();

  /**
   * Callback function to close the modal
   */
  const closeModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  // track some react state
  const [showAdvancedDetails, setShowAdvancedDetails] = useState(false);

  // memoize a nice label for the fee payer
  const feePayerLabel = useMemo(() => {
    const addr = simulation?.accountAddresses[0] || "[err]";
    if (addr === walletAddress?.toBase58()) return "you";
    else return shortText(addr);
  }, [transaction]);

  return (
    <BottomModal
      modalRef={modalRef}
      // note: this is intentionally blank to make the modal size fit to the content by default
      snapPoints={[]}
      enableDynamicSizing={true}
    >
      <ModalHeader
        handleCloseModal={closeModal}
        // title={"Transaction Request"}
        // description="Change your active wallet account"
      />

      <View className="mb-4 bg-transparent">
        <HeroIcon
          background="bg-gray-300"
          icon={<QuestionMarkCircleIcon size={40} color={"white"} />}
          label="decal.app"
        />

        <HeroTitleSection
          title={"Transaction Request"}
          description={"You are being asked to approve a transaction"}
        />
      </View>

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

      {/* transaction and instruction details section */}
      <TouchableOpacity
        onPress={() => setShowAdvancedDetails((prev) => !prev)}
        className="flex flex-row items-center justify-between my-4 bg-transparent"
      >
        <MinorText className={"w-full text-center text-base"}>
          Toggle advanced details
          {/* {showAdvancedDetails
            ? "Toggle advanced details"
            : "Show advanced details?"} */}
        </MinorText>

        {/* <View className="p-2 bg-transparent">
          {showAdvancedDetails ? (
            <ChevronDoubleUpIcon className="" size={20} color={"white"} />
          ) : (
            <ChevronDoubleDownIcon className="" size={20} color={"white"} />
          )}
        </View> */}
      </TouchableOpacity>

      {/* process each of the instructions for display */}
      {showAdvancedDetails && (
        <View className="flex flex-col bg-transparent">
          {transaction?.message.compiledInstructions.map((ix, key) => (
            <InstructionDetails
              key={key}
              index={key}
              ix={ix}
              programId={simulation.accountAddresses[ix.programIdIndex]}
            />
          ))}
        </View>
      )}

      {/* button action area */}
      <View className="flex flex-col my-4 bg-transparent gap-y-3">
        <Button
          label="Approve"
          onPress={() => Alert.alert("approve")}
          className="w-full bg-blue-500"
          labelClassName="text-white"
        />
        <GhostButton
          label="Reject"
          onPress={closeModal}
          // className=""
          labelClassName="text-base"
          // icon="external-link"
        />
      </View>
    </BottomModal>
  );
};
