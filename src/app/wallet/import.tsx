import { Link, Stack, useNavigation, useRouter } from "expo-router";
import { Alert } from "react-native";
import { useState } from "react";
import DefaultLayout from "@/components/core/DefaultLayout";

import { View } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";
import { PlusIcon } from "react-native-heroicons/outline";

import { SeedPhraseWordList } from "@/components/wallet/SeedPhrase";
import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { saveTempSeedPhraseToSecureStore } from "@/lib/utils/wallet/import";
import { DEFAULT_SEED_PHRASE_WORD_COUNT } from "@/lib/utils/wallet/constants";

export default function Screen() {
  // track the state of the seed phrase entered by the user
  const [seedPhrase, setSeedPhrase] = useState<string[]>(
    new Array(DEFAULT_SEED_PHRASE_WORD_COUNT).fill(""),
  );

  const router = useRouter();
  const navigation = useNavigation();

  /**
   * handle the preflight checks of the seed phrase before sending to the "import accounts" screen
   */
  async function checkSeedPhraseAndContinue() {
    try {
      // console.log(seedPhrase.join(" ").trim());

      // verify the full seed phrase was entered
      if (
        seedPhrase.filter((item) => !!item.trim()).length !== seedPhrase.length
      ) {
        throw Error(
          `A full ${seedPhrase.length} word seed phrase must be entered`,
        );
      }

      // save the words to the temporary secure storage
      const didSave = await saveTempSeedPhraseToSecureStore(
        seedPhrase.join(" ").trim().toLowerCase(),
      );

      if (didSave) {
        // clear the seed phrase state to prevent words from being saved anywhere insecurely
        setSeedPhrase(new Array(seedPhrase.length).fill(""));

        // note: we use replace to prevent the user from going back to the seed phrase
        return router.replace("/wallet/selectAccounts");
      } else throw Error("Unable to securely save your seed phrase");
    } catch (err) {
      console.warn(err);
      Alert.alert("Unable to securely save your seed phrase");
    }
  }

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

      <SeedPhraseWordList
        seedPhrase={seedPhrase}
        setSeedPhrase={setSeedPhrase}
        isInput={true}
      />

      {/* <Text className={"text-gray-500 text-center"}>
        Make sure your have written down your seed phrase.{"\n"}
        You will be asked to confirm it on the next screen.
      </Text> */}

      <View className="flex flex-col gap-2">
        <Button
          label="Next"
          onPress={() => checkSeedPhraseAndContinue()}
          className="w-full bg-blue-500"
          labelClassName="text-white"
        />
      </View>
    </DefaultLayout>
  );
}
