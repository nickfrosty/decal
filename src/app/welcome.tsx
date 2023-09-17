import { Stack } from "expo-router";
import DefaultLayout from "@/components/core/DefaultLayout";

import { View } from "@/components/core/Themed";
import { GhostLink, LinkButton } from "@/components/core/buttons";

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

      <View className="flex flex-col gap-2 my-8 place-self-center">
        <LinkButton
          href="/accounts/seedPhrase/generate"
          className="bg-blue-500"
          label="Generate new seed phrase"
        />
        <GhostLink
          href="/accounts/seedPhrase/import"
          className=""
          label="Import seed phrase"
        />
      </View>
    </DefaultLayout>
  );
}
