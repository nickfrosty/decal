import { Stack } from "expo-router";
import { Alert, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/core/DefaultLayout";

import { Text, View } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";

import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { UserPlusIcon } from "react-native-heroicons/solid";
import { seedPhraseToKeypairs } from "@/lib/utils/wallet";
import { useConnection } from "@/context/ConnectionProvider";

import { MinorText, TouchableOpacity } from "@/components/core/Styled";
import { AccountDetailsItem } from "@/components/wallet/AccountImportDetails";
import {
  AccountImportDetails,
  getAccountImportDetails,
} from "@/lib/utils/wallet/import";

// todo: remove this hard coded string
const words = "";

export default function Screen() {
  const theme = useColorScheme() ?? "light";
  const { connection } = useConnection();

  //
  const [loading, setLoading] = useState<boolean>(true);
  const [maxAccountsToShow, setMaxAccountsToShow] = useState<number>(0);
  const [accounts, setAccounts] = useState<AccountImportDetails[]>([]);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const accountDetails = await getAccountImportDetails(connection);

        const importCounter = accountDetails.filter(
          (account) =>
            account.shouldImport || account.balance > 0 || account.index == 0,
        ).length;

        // default to showing all the accounts that have a balance on them
        if (importCounter > maxAccountsToShow)
          setMaxAccountsToShow(importCounter);

        // finally, update the state to show the data in the ui
        setAccounts(accountDetails);
        setLoading(false);
      } catch (err) {
        console.log("Unable to prepare account details for import");
        console.error(err);
      }
    }, 1);

    // return () => {
    //   second
    // }
  }, []);

  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          // comment for better diffs
          title: "Select accounts",
          headerShown: true,
          // headerLeft: () => <></>,
          headerRight: () => <></>,
        }}
      />

      <HeroIcon
        background="bg-green-500"
        icon={<UserPlusIcon size={40} color={"white"} />}
      />

      <HeroTitleSection
        title={"Select accounts to import"}
        description={"Select any of the following accounts to import"}
      />

      <View className="">
        {accounts.slice(0, maxAccountsToShow).map((account, id) => (
          <AccountDetailsItem
            key={id}
            colorScheme={theme}
            account={account}
            shouldImport={account.shouldImport}
            onPress={(isChecked: boolean) => {
              // todo: do nothing for index=0

              console.log(account.publicKey.toBase58(), "-", isChecked);

              setAccounts((prev) =>
                prev.map((item) => {
                  if (
                    item.publicKey.toBase58() != account.publicKey.toBase58()
                  ) {
                    return item;
                  } else {
                    return Object.assign(item, { shouldImport: isChecked });
                  }
                }),
              );
            }}
          />
        ))}
      </View>

      {maxAccountsToShow < accounts.length && (
        <TouchableOpacity
          onPress={() => setMaxAccountsToShow((prev) => prev + 5)}
        >
          <MinorText className={"text-gray-500 text-center"}>
            Load more accounts?
          </MinorText>
        </TouchableOpacity>
      )}

      <View className="flex flex-col gap-2">
        <Button
          label="Import"
          onPress={() => Alert.alert("import")}
          className="bg-blue-500"
          labelClassName="text-white"
        />
      </View>

      <Text className={"text-center"}>
        PS: You can always import more of these later!
      </Text>
    </DefaultLayout>
  );
}
