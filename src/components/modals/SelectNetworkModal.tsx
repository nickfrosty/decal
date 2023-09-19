import { Alert } from "react-native";
import { useCallback, useMemo } from "react";
import {
  BottomModal,
  BottomModalProps,
  ModalHeader,
} from "@/components/core/BottomModal";

import { ListCheckBox, ListContainer } from "@/components/core/ListContainer";
import { Text, View } from "@/components/core/Themed";
import { Cluster } from "@solana/web3.js";
import { useConnection } from "@/context/ConnectionProvider";

type NetworkDetails = {
  label: string;
  cluster: Cluster;
};

export const SelectNetworkModal = ({ modalRef }: BottomModalProps) => {
  const { settings, setSettings } = useConnection();

  /**
   * Callback function to close the modal
   */
  const closeModal = useCallback(() => {
    if (modalRef && modalRef.current) return modalRef.current?.dismiss();
  }, []);

  const networks: NetworkDetails[] = useMemo(
    () =>
      [
        // comment for better diffs
        {
          label: "Mainnet",
          cluster: "mainnet-beta",
        },
        {
          label: "Devnet",
          cluster: "devnet",
        },
        {
          label: "Testnet",
          cluster: "testnet",
        },
      ] as NetworkDetails[],
    [],
  );

  /**
   * swap the selected network cluster
   */
  const handleSelectNetwork = useCallback(
    (cluster: Cluster) => {
      // locate the record from the listing
      const record = networks.find((item) => item.cluster === cluster);

      if (!record) {
        return Alert.alert(
          "Network not found",
          "The selected Solana network was not found.",
        );
      }

      // actually update the selected network
      setSettings((prev) => ({ ...prev, cluster, endpoint: undefined }));
      console.log("Solana network changed to:", cluster);
      closeModal();
    },
    [networks],
  );

  return (
    <BottomModal modalRef={modalRef} snapPoints={[]} enableDynamicSizing={true}>
      <ModalHeader
        handleCloseModal={closeModal}
        title="Select a network"
        description="Change the network for balances and transactions"
      />

      <ListContainer>
        {networks.map((item, id) => (
          <ListCheckBox
            label=""
            isTop={id == 0}
            key={id}
            isChecked={settings.cluster === item.cluster}
            onPress={() => handleSelectNetwork(item.cluster)}
          >
            <View className="bg-transparent">
              <Text className="text-lg">{item.label}</Text>
            </View>
          </ListCheckBox>
        ))}
      </ListContainer>
    </BottomModal>
  );
};
