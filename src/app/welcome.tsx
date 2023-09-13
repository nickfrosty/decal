import { Stack } from "expo-router";
import DefaultLayout from "@/components/core/DefaultLayout";

import EditScreenInfo from "@/components/EditScreenInfo";
import { View } from "@/components/core/Themed";
import { GhostLink } from "@/components/core/buttons";

export default function Screen() {
  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          headerShown: true,
          // comment for better diffs
          title: "Welcome to Decal 🎉",
        }}
      />

      <View className="flex flex-row items-center justify-center my-8">
        <GhostLink href="/accounts/seedPhrase/import" label="Import" />
        <GhostLink href="/accounts/seedPhrase/generate" label="Generate" />
      </View>

      <EditScreenInfo path="app/welcome.tsx" />
    </DefaultLayout>
  );
}
