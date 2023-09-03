import { Stack } from "expo-router";
import { Alert } from "react-native";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/core/DefaultLayout";

import { Text, View } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";
import { PlusIcon } from "react-native-heroicons/outline";

import { SeedPhraseWordList } from "@/components/wallet/SeedPhrase";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";

export default function Screen() {
  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Import wallet using a seed phrase",
          headerShown: true,
          // headerLeft: () => <></>,
          headerRight: () => <></>,
        }}
      />

      <HeroIcon
        background="bg-green-500"
        icon={<PlusIcon size={40} color={"white"} />}
      />

      <HeroTitleSection
        title={"Enter your seed phrase"}
        description={
          "Import your wallet and accounts by entering your seed phrase below"
        }
      />

      <SeedPhraseWordList words={new Array(24).fill("")} isInput={true} />

      {/* <Text className={"text-gray-500 text-center"}>
        Make sure your have written down your seed phrase.{"\n"}
        You will be asked to confirm it on the next screen.
      </Text> */}

      <View className="flex flex-col gap-2">
        <Button
          label="Next"
          onPress={() => Alert.alert("import")}
          className="bg-blue-500"
          labelClassName="text-white"
        />
        {/* <Button
            label="Generate Another"
            onPress={() => Alert.alert("reject")}
            className="bg-transparent border-gray-300"
            labelClassName="text-black text-base"
            // icon="external-link"
          /> */}
      </View>
    </DefaultLayout>
  );
}
