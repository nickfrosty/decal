import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useColorScheme } from "react-native";

import base58 from "bs58";
import { getUserWalletDetails, storeSingleKeypair } from "@/lib/utils/wallet";
import { Keypair } from "@solana/web3.js";

// import various global libraries
import "@/styles/global.css";
import "@/shims";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(drawer)",
  // initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("@@/assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let wallets = await getUserWalletDetails();

  //       console.log("wallets:", wallets);

  //       if (!wallets.length) {
  //         console.log("Generating a new keypair...");
  //         const keypair = Keypair.generate();
  //         const secretKey = base58.encode(keypair.secretKey);

  //         console.log("publicKey:", keypair.publicKey.toBase58());
  //         console.log("secretKey1:", base58.encode(keypair.secretKey));
  //         const test = Keypair.fromSecretKey(base58.decode(secretKey));
  //         console.log("test publicKey:", keypair.publicKey.toBase58());

  //         // await storeSingleKeypair("demo", keypair.secretKey.toString())
  //       }

  //       console.log("new wallets details:", wallets);
  //     } catch (err) {
  //       console.log("Unable to get keystore data");
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{}}>
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="wallet/generate" options={{ headerShown: false }} />

        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="settings" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="modal" options={{ presentation: "modal" }} /> */}
        <Stack.Screen name="send" options={{ presentation: "modal" }} />
        <Stack.Screen name="request" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
