import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { useEffect, useState } from "react";
import {
  BarCodeEvent,
  BarCodeScannedCallback,
  BarCodeScanner,
  PermissionStatus,
} from "expo-barcode-scanner";
import { Button } from "@/components/core/buttons";
import { ScrollView, Text, View } from "@/components/core/Themed";

export default function Screen() {
  //
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );

  //
  const [scanData, setScanData] = useState("");

  useEffect(() => {
    requestPermissions();
  }, []);

  async function requestPermissions() {
    console.log("requesting camera permissions...");

    const { status, canAskAgain } =
      await BarCodeScanner.requestPermissionsAsync();
    console.log("canAskAgain:", canAskAgain);
    console.log("status:", status);

    setPermissionStatus(status);
  }

  if (permissionStatus != PermissionStatus.GRANTED) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Stack.Screen
            options={{
              title: "Scan QR code",
              // headerShown: false,
            }}
          />
          <Text style={styles.title}>Camera permission is required</Text>

          <Button
            label="Grant Permission"
            className="bg-blue-500 w-min"
            labelClassName="text-white"
            onPress={async () => await BarCodeScanner.requestPermissionsAsync()}
          />
        </View>
      </ScrollView>
    );
  }

  function handleBarcodeScan({ type, data }: BarCodeEvent) {
    console.warn("type:", type);
    console.warn(data);

    setScanData(data);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: "Scan QR code",
            // headerShown: false,
          }}
        />

        <View className="flex items-center justify-center border border-gray-300">
          <BarCodeScanner
            // style={StyleSheet.absoluteFill}
            className="w-64 h-64"
            onBarCodeScanned={handleBarcodeScan}
          />
        </View>

        <Text style={styles.title}>QR Scan</Text>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 16,
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: "#777",
  },
  textBold: {
    fontWeight: "500",
    color: "#000",
  },
  buttonText: {
    fontSize: 21,
    color: "rgb(0,122,255)",
  },
  buttonTouchable: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  amountBlock: {
    width: "100%",
    gap: 12,
  },
  inputBlock: {
    width: "100%",
    gap: 5,
  },
  amountInput: {
    marginVertical: 12,
    width: "100%",
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 48,
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 18,
  },
  multiline: {
    width: "100%",
    height: 100,
    textAlign: "left",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    verticalAlign: "top",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
});
