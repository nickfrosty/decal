import { Stack, useRouter } from "expo-router";
import { Alert } from "react-native";
import { useState, useEffect, memo, useCallback } from "react";
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
import { useAsync } from "react-async-hook";

export default function Screen() {
  const router = useRouter();
  // generate a random seed phrase words to start
  const [loading, setLoading] = useState(true);
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);

  // store the public address derived from the seed phrase
  const { result: publicAddress } = useAsync(async () => {
    if (!seedPhrase || seedPhrase.length <= 0) return false;

    const address = await derivePublicAddressFromSeedPhrase(seedPhrase, 0);
    return address.toBase58();
  }, [seedPhrase]);

  /**
   *
   */
  const generate = useCallback(() => {
    try {
      setLoading(true);

      setTimeout(() => {
        setSeedPhrase(generateSeedPhrase());
        setLoading(false);
      }, 1);
    } catch (err) {
      console.log("Unable to determine default public address");
      console.log(err);
    }
  }, [loading, setLoading, setSeedPhrase]);

  // generate on load
  useEffect(() => generate(), []);

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Generate seed phrase",
          headerShown: true,
          // headerLeft: () => null,
          headerRight: () => (
            <TouchableOpacity onPress={() => generate()}>
              <ArrowPathIcon
                style={MasterStyles.icon}
                color={useThemeColor("iconColor")}
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

      {loading ? (
        <Text className="my-10 text-xl text-center">
          Generating seed phrase,{"\n"}
          please wait...
        </Text>
      ) : (
        <>
          {/* todo: this should only be show in developer mode? */}
          {/* todo: also make this a drop down that can view all the other derived addresses */}
          {publicAddress && (
            <ViewBox>
              <Text
                className={"text-center text-base w-full justify-self-center"}
              >
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
              label="Continue"
              onPress={() => router.push("/accounts/seedPhrase/import")}
              className="bg-blue-500"
              labelClassName="text-white"
            />
          </View>
        </>
      )}
    </DefaultLayout>
  );
}
