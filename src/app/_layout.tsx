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
import { ConnectionProvider } from "@/context/ConnectionProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { TransactionProvider } from "@/context/TransactionProvider";

// import various global libraries
import "@/styles/global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/welcome` keeps a back button present.
  initialRouteName: "(wallet)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
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

  // do nothing while the assets are still loading
  if (!loaded) return null;

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <BottomSheetModalProvider>
          <ConnectionProvider>
            <TransactionProvider>
              <Stack
                screenOptions={{
                  // comment for better diffs
                  headerShown: false,
                }}
              />
            </TransactionProvider>
          </ConnectionProvider>
        </BottomSheetModalProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
