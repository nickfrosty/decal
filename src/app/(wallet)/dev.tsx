import { Stack } from "expo-router";
import DefaultLayout from "@/components/core/DefaultLayout";

import { Text, View } from "@/components/core/Themed";
import { GhostLink } from "@/components/core/buttons";

export default function Screen() {
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
          {/* <GhostLink href="/accounts/seedPhrase/generate" label="Generate" /> */}
          {/* <GhostLink href="/transaction/sign" label="Sign" /> */}
          {/* <GhostLink href="/transaction/request" label="Request" /> */}
        </View>
      </View>
    </DefaultLayout>
  );
}
