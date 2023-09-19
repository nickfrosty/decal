import { Stack } from "expo-router";
import DefaultLayout from "@/components/core/DefaultLayout";
import { MinorText } from "@/components/core/Styled";
import {
  ListContainer,
  ListItem,
  ListItemLink,
} from "@/components/core/ListContainer";
import { useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SelectWalletModal } from "@/components/modals/SelectWalletModal";
import { SelectNetworkModal } from "@/components/modals/SelectNetworkModal";

export default function Screen() {
  const selectWalletModalRef = useRef<BottomSheetModal>(null);
  const selectNetworkModalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <SelectNetworkModal modalRef={selectNetworkModalRef} />
      <SelectWalletModal modalRef={selectWalletModalRef} />

      <DefaultLayout>
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Settings",
          }}
        />

        <MinorText className="text-base text-center">
          Developer Settings
        </MinorText>

        <ListContainer>
          <ListItem
            isTop={true}
            onPress={() => selectWalletModalRef.current?.present()}
            label="Change wallet"
          />
          <ListItem
            onPress={() => selectNetworkModalRef.current?.present()}
            label="Change network"
          />
        </ListContainer>
      </DefaultLayout>
    </>
  );
}
