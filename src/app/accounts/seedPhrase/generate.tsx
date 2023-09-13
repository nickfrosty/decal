import { Stack } from "expo-router";
import { Alert } from "react-native";
import { useState, useEffect, memo } from "react";
import DefaultLayout from "@/components/core/DefaultLayout";

import {
  MasterStyles,
  Text,
  View,
  useThemeColor,
} from "@/components/core/Themed";
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
import { TouchableOpacity, ViewBox } from "@/components/core/Styled";

export default function Screen() {
  // generate a random seed phrase words to start
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  // store the public address derived from the seed phrase
  const [publicAddress, setPublicAddress] = useState<string>("");

  //
  useEffect(() => {
    setTimeout(async () => {
      try {
        const seedPhrase = generateSeedPhrase();
        const address = await derivePublicAddressFromSeedPhrase(seedPhrase, 0);

        setPublicAddress(address.toBase58());
        setSeedPhrase(seedPhrase);
      } catch (err) {
        console.log("Unable to determine default public address");
        console.log(err);
      }
    });
  }, []);

  /**
   * Reusable screen header component
   */
  const ScreenHeader = memo(() => (
    <>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Generate seed phrase",
          headerShown: true,
          // headerLeft: () => null,
          // headerLeft: () => <></>,
          headerRight: () => (
            <TouchableOpacity>
              <ArrowPathIcon
                style={MasterStyles.icon}
                color={useThemeColor("iconColor")}
                onPress={() => {
                  // first clear the seed phrase
                  setSeedPhrase([]);
                  // then generate a new one
                  setTimeout(() => setSeedPhrase(generateSeedPhrase()), 1);
                }}
              />
            </TouchableOpacity>
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
    </>
  ));

  if (seedPhrase.length <= 0) {
    return (
      <DefaultLayout>
        <ScreenHeader />

        <Text className="my-10 text-xl text-center">
          Generating seed phrase,{"\n"}
          please wait...
        </Text>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <ScreenHeader />

      {/* todo: this should only be show in developer mode? */}
      {/* todo: also make this a drop down that can view all the other derived addresses */}
      {!!publicAddress && (
        <ViewBox>
          <Text className={"text-center text-base w-full justify-self-center"}>
            Your default public address will be:{`\n`}
            {shortText(publicAddress, 10, "...")}
          </Text>
        </ViewBox>
      )}

      <SeedPhraseWordList seedPhrase={seedPhrase} />

      <Text className={"text-gray-500 text-center"}>
        Make sure your have written down your seed phrase.{"\n"}
        You will be asked to confirm it on the next screen.
      </Text>

      <View className="flex flex-col gap-2">
        <Button
          // href="/accounts/seedPhrase/import"
          label="Continue"
          onPress={() => Alert.alert("continue")}
          className="bg-blue-500"
          labelClassName="text-white"
        />
      </View>
    </DefaultLayout>
  );
}
