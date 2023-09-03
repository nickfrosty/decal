import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/core/Themed";
import { TextInput } from "react-native-gesture-handler";

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Payment</Text>

      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}

      {/* <View style={styles.inputBlock}>
        <Text style={styles.inputLabel}>Token</Text>

        <TextInput
          style={styles.input}
          placeholder="USDC"
          keyboardType="default"
          enabled={false}
        />
      </View> */}

      <View style={styles.amountBlock}>
        <TextInput
          style={styles.amountInput}
          placeholder="0.00"
          keyboardType="numeric"
          autoFocus={true}
          selectTextOnFocus={true}
        />

        <Text style={styles.inputLabel}>USDC</Text>
      </View>

      <View style={styles.inputBlock}>
        <Text style={styles.inputLabel}>Message</Text>

        <TextInput
          multiline={true}
          style={styles.multiline}
          placeholder="Enter a short memo message"
          keyboardType="default"
        />
      </View>

      <View
        style={{
          gap: 12,
          flexDirection: "row",
        }}
      >
        {/* <Button title="Send" onPress={() => Alert.alert("press")} /> */}
        <Button
          title="Create Payment Request"
          onPress={() => Alert.alert("press")}
        />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    gap: 16,
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
    borderColor: "#eee",
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
    borderColor: "#eee",
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
