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
import { AccountImportDetails } from "@/lib/utils/wallet/import";

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
    (async () => {
      const accounts = await seedPhraseToKeypairs(words);

      const promises: Promise<number>[] = [];

      accounts.map((item) => {
        promises.push(connection.getBalance(item.publicKey));
      });

      const balances = await Promise.all(promises);

      // track how many accounts actually have a balance (or we will care about)
      let balancedAccounts = 1;
      // note: defaults to 1 since we always care about the first account

      /**
       * format and add each of the account details to the array for display in the UI
       * note: we start at index=1 since the default derived address will always be imported
       */
      const accountDetails: AccountImportDetails[] = [];
      for (let i = 1; i < accounts.length; i++) {
        // console.log(
        //   `[${i}]`,
        //   accounts[i].publicKey.toBase58(),
        //   "-",
        //   balances[i],
        // );

        const details: AccountImportDetails = {
          index: i,
          publicKey: accounts[i].publicKey,
          balance: balances[i],
          shouldImport: i == 0 || balances[i] > 0,
        };

        // todo: auto sort these by if they should be imported, with the `index=0` account always at the top
        if (details.balance > 0 || details.shouldImport) {
          balancedAccounts++;
          accountDetails.unshift(details);
        } else accountDetails.push(details);
      }

      // always add the account index=0 to the top of the list
      accountDetails.unshift({
        index: 0,
        shouldImport: true,
        publicKey: accounts[0].publicKey,
        balance: balances[0],
      });

      // default to showing all the accounts that have a balance on them
      if (balancedAccounts > maxAccountsToShow)
        setMaxAccountsToShow(balancedAccounts);

      // finally, update the state to show the data in the ui
      setAccounts(accountDetails);
      setLoading(false);
    })();

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
