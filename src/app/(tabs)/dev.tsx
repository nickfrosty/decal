import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { ScrollView, Text, View } from "@/components/core/Themed";
import { GhostLink } from "@/components/core/buttons";

export default function Screen() {
  return (
    <ScrollView>
      <View className={"flex-1 p-4 gap-8 items-center"}>
        <Stack.Screen options={{ title: "Dev Screen" }} />

        <Text className={"font-semibold text-2xl text-center"}>
          Transaction pages
        </Text>

        <View className="flex flex-row items-center justify-center">
          <GhostLink href="/transaction/details" label="Details" />
          <GhostLink href="/transaction/signMessage" label="Sign" />
          <GhostLink href="/transaction/requestApproval" label="Request" />
        </View>

        <View
          className="w-full h-[1px] bg-gray-200 max-w-[80%] justify-self-center"
          // lightColor="#eee"
          // darkColor="rgba(255,255,255,0.1)"
        />

        <Text className={"font-semibold text-2xl text-center"}>Misc pages</Text>

        <View className="flex flex-row items-center justify-center">
          <GhostLink href="/search" label="Search" />
          {/* <GhostLink href="/wallet/generate" label="Generate" /> */}
          {/* <GhostLink href="/transaction/sign" label="Sign" /> */}
          {/* <GhostLink href="/transaction/request" label="Request" /> */}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
