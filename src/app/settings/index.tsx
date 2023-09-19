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
import { Text, View } from "@/components/core/Themed";
import { useAuth } from "@/context/AuthProvider";
import { shortText } from "@/lib/utils";

export default function Screen() {
  const { walletAddress } = useAuth();
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

        <View className="p-4 bg-transparent border border-white rounded-lg">
          <View className="flex flex-row items-center space-x-4 overflow-hidden bg-transparent">
            <View className="flex-shrink-0 w-20 h-20 bg-transparent bg-gray-500 rounded-full"></View>
            <View className="w-full bg-transparent whitespace-nowrap overflow-clip">
              <Text className="w-full text-lg overflow-ellipsis overflow-clip">
                Profile Name
              </Text>
              <MinorText className="text-base">@username</MinorText>
              <MinorText className="text-base">
                {shortText(walletAddress?.toBase58() || "[err]")}
              </MinorText>
            </View>
          </View>
        </View>

        <MinorText className="text-base text-center">Settings</MinorText>

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
