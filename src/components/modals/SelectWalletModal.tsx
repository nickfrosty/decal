import { useCallback, RefObject } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { ModalHeader } from "@/components/core/BottomModal";

import { getAllUserWalletDetails } from "@/lib/utils/wallet/details";
import { useAsync } from "react-async-hook";
import { useAuth } from "@/context/AuthProvider";
import { ListCheckBox, ListContainer } from "@/components/core/ListContainer";
import { Text, View } from "@/components/core/Themed";
import { shortText } from "@/lib/utils";
import { Alert, useColorScheme } from "react-native";
import Colors from "@/constants/Colors";

type ModalProps = {
  modalRef: RefObject<BottomSheetModal>;
  // title?: string;
  snapPoints?: Array<string>;
};

export const SelectWalletModal = ({
  modalRef,
  snapPoints = ["45%", "80%"],
}: ModalProps) => {
  const theme = useColorScheme() ?? "light";
  const { walletDetails, setWalletDetails } = useAuth();

  // const snapPointsMemo = useMemo(() => snapPoints, []);

  // const handleSheetChanges = useCallback((index: number) => {
  //   // console.log("handleSheetChanges", index);
  // }, []);

  /**
   * Callback function to close the modal
   */
  const closeModal = useCallback(() => {
    if (modalRef && modalRef.current) return modalRef.current?.dismiss();
  }, []);

  /**
   *
   */
  const { result: availableWallets, loading } = useAsync(async () => {
    return await getAllUserWalletDetails();
  }, []);

  /**
   * swap the user selected wallet
   */
  const handleSelectWallet = useCallback(
    (address: string) => {
      // locate the record from the list of accounts
      const record = availableWallets?.find((item) => item.address === address);

      if (!record) {
        return Alert.alert(
          "Account not found",
          "The selected account was not found.",
        );
      }

      // actually update the selected wallet
      setWalletDetails(record);
      closeModal();
    },
    [availableWallets],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
      handleStyle={{
        // backgroundColor: "red",
        paddingVertical: 16,
      }}
      handleIndicatorStyle={{
        backgroundColor: Colors[theme].text,
      }}
      backgroundStyle={{
        backgroundColor: Colors[theme].minorBackground,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.8}
          {...props}
        />
      )}
    >
      <BottomSheetScrollView
        contentContainerStyle={{
          // backgroundColor: "red",
          flex: 1,
          paddingHorizontal: 12,
        }}
      >
        <ModalHeader
          handleCloseModal={closeModal}
          title="Select a wallet"
          description="Change your active wallet account"
        />

        <ListContainer>
          {availableWallets?.map((item, id) => (
            <ListCheckBox
              label=""
              isTop={id == 0}
              key={id}
              isChecked={walletDetails.address === item.address}
              onPress={() => handleSelectWallet(item.address)}
            >
              <View className="bg-transparent">
                <Text className="text-lg">{shortText(item.address)}</Text>
              </View>
            </ListCheckBox>
          ))}
        </ListContainer>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
