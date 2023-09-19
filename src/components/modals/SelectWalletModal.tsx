import { useCallback } from "react";
import {
  BottomModal,
  BottomModalProps,
  ModalHeader,
} from "@/components/core/BottomModal";

import { getAllUserWalletDetails } from "@/lib/utils/wallet/details";
import { useAsync } from "react-async-hook";
import { useAuth } from "@/context/AuthProvider";
import { ListCheckBox, ListContainer } from "@/components/core/ListContainer";
import { Text, View } from "@/components/core/Themed";
import { shortText } from "@/lib/utils";
import { Alert } from "react-native";

export const SelectWalletModal = ({ modalRef }: BottomModalProps) => {
  const { walletDetails, setWalletDetails } = useAuth();

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
    <BottomModal modalRef={modalRef} snapPoints={[]} enableDynamicSizing={true}>
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
    </BottomModal>
  );
};
