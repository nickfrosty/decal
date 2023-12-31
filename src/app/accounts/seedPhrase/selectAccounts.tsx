import { Stack, useNavigation, useRouter } from "expo-router";
import { Alert, useColorScheme } from "react-native";
import { useState, useEffect, useCallback, memo } from "react";
import DefaultLayout from "@/components/core/DefaultLayout";

import { Text, View } from "@/components/core/Themed";
import { Button } from "@/components/core/buttons";

import { HeroIcon, HeroTitleSection } from "@/components/ScreenHero";
import { UserPlusIcon } from "react-native-heroicons/solid";
import { useAuth } from "@/context/AuthProvider";
import { useConnection } from "@/context/ConnectionProvider";

import { MinorText, TouchableOpacity } from "@/components/core/Styled";
import { AccountDetailsItem } from "@/components/wallet/AccountImportDetails";
import {
  AccountImportDetails,
  getAccountImportDetails,
  importAccountsFromSeedPhrase,
} from "@/lib/utils/wallet/import";
import { StackActions } from "@react-navigation/native";

export default function Screen() {
  const navigation = useNavigation();
  const router = useRouter();
  const theme = useColorScheme() ?? "light";
  const { connection } = useConnection();
  const { walletDetails, setWalletDetails } = useAuth();

  //
  const [maxAccountsToShow, setMaxAccountsToShow] = useState<number>(0);
  const [accounts, setAccounts] = useState<AccountImportDetails[]>([]);

  /**
   * Process the account import request
   */
  const handleImport = useCallback(async () => {
    const successful = await importAccountsFromSeedPhrase(accounts);

    if (successful) {
      // locate an account that was imported
      const firstAccount = accounts.filter((item) => item.shouldImport)[0];

      // auto select set the selected user wallet (if one was not already selected)
      // todo: should this always auto select? we could wrap in an `if` block?
      // if (!walletDetails.address) {
      setWalletDetails({
        address: firstAccount.publicKey.toBase58(),
        label: firstAccount.label,
      });
      // }
      // todo: allow the user to select which auto selects?

      // note: we replace to prevent the user from accessing this
      navigation.dispatch(StackActions.popToTop());
      return router.replace("/");
    } else Alert.alert("Unable to import accounts");
  }, [accounts, walletDetails, setWalletDetails]);

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
      } catch (err) {
        console.log("Unable to prepare account details for import");
        console.error(err);
      }
    }, 1);

    // return () => {
    //   second
    // }
  }, []);

  if (!accounts || accounts.length <= 0) {
    return (
      <DefaultLayout>
        <ScreenHeader />

        <Text className="my-10 text-xl text-center">
          Loading account details,{"\n"}
          please wait...
        </Text>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <ScreenHeader />

      <View className="">
        {accounts.slice(0, maxAccountsToShow).map((account, id) => (
          <AccountDetailsItem
            key={id}
            colorScheme={theme}
            account={account}
            shouldImport={account.shouldImport}
            onPress={(isChecked: boolean) => {
              // todo: do nothing for index=0 ?

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
          onPress={() => handleImport()}
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

/**
 * Reusable screen header component
 */
const ScreenHeader = memo(() => (
  <>
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
  </>
));
