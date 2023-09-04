import { Stack } from "expo-router";
import { Alert } from "react-native";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/core/DefaultLayout";

import { Text, View } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "react-native-heroicons/outline";

import { shortText } from "@/lib/utils";
import {
  derivePublicAddressFromSeedPhrase,
  generateSeedPhrase,
} from "@/lib/utils/wallet";
import { SeedPhraseWordList } from "@/components/wallet/SeedPhrase";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";

export default function Screen() {
  // generate a random seed phrase words to start
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  // store the public address derived from the seed phrase
  const [publicAddress, setPublicAddress] = useState<string>("");

  //
  useEffect(() => {
    setTimeout(() => setSeedPhrase(generateSeedPhrase()));
  }, []);

  //
  useEffect(() => {
    // do nothing when there is no seed phrase actually set
    if (seedPhrase.length == 0) return;

    (async () => {
      try {
        const address = await derivePublicAddressFromSeedPhrase(seedPhrase, 0);
        setPublicAddress(address.toBase58());
      } catch (err) {
        console.log("Unable to determine default public address");
        console.log(err);
      }
    })();
  }, [seedPhrase]);

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Generate a seed phrase",
          headerShown: true,
          // headerLeft: () => null,
          headerLeft: () => <></>,
          headerRight: () => (
            <ArrowPathIcon
              size={24}
              color={"black"}
              onPress={() => {
                // first clear the seed phrase
                setSeedPhrase([]);
                // then generate a new one
                setTimeout(() => setSeedPhrase(generateSeedPhrase()), 1);
              }}
            />
          ),
        }}
      />

      <HeroIcon
        background="bg-yellow-400"
        icon={<ExclamationTriangleIcon size={40} color={"black"} />}
      />

      <HeroTitleSection
        title={"Write down your seed phrase"}
        description={
          "Write this down. Keep it in a safe place. " +
          "The safest you can imagine. And never share it with anyone!"
        }
      />

      {seedPhrase.length > 0 ? (
        <>
          {/* todo: this should only be show in developer mode? */}
          {/* todo: also make this a drop down that can view all the other derived addresses */}
          {!!publicAddress && (
            <Text
              className={
                "text-gray-500 text-center text-base border border-gray-300 bg-gray-100 px-3 py-2 rounded-xl"
              }
            >
              Your default public address will be:{`\n`}
              {shortText(publicAddress, 10, "...")}
            </Text>
          )}

          <SeedPhraseWordList words={seedPhrase} />
        </>
      ) : (
        <Text className="my-10 text-xl text-center">
          Generating seed phrase,{"\n"}
          please wait...
        </Text>
      )}

      <Text className={"text-gray-500 text-center"}>
        Make sure your have written down your seed phrase.{"\n"}
        You will be asked to confirm it on the next screen.
      </Text>

      <View className="flex flex-col gap-2">
        <Button
          // href="/wallet/import"
          label="Continue"
          onPress={() => Alert.alert("continue")}
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
