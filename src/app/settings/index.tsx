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

export default function Screen() {
  const selectWalletModalRef = useRef<BottomSheetModal>(null);

  return (
    <>
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
          <ListItemLink label="Change wallet" href={"/settings/changeWallet"} />
        </ListContainer>
      </DefaultLayout>
    </>
  );
}
