import { Stack } from "expo-router";
import { Alert, StyleSheet, TextInput } from "react-native";

import { ScrollView, Text, View } from "@/components/core/Themed";
import Colors from "@/constants/Colors";
import { Button } from "@/components/core/buttons";
import { ChevronUpDownIcon } from "react-native-heroicons/solid";
import { TouchableOpacity } from "@/components/StyledText";

export default function Screen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Stack.Screen
          // name=""
          options={{ title: "Send" }}
        />

        <InputAmount />

        <View className="flex flex-row items-center justify-between w-full px-4 py-3 space-x-4 bg-transparent border border-gray-300 rounded-lg">
          <View className="flex flex-row items-center space-x-2 align-middle">
            <View className="bg-gray-400 rounded-full w-9 h-9"></View>
            {/* <Text className="inline-flex text-lg font-semibold">
              12.12 USDC
            </Text> */}

            <View className="flex flex-row gap-1 bg-transparent">
              <Text className="inline-flex text-lg font-semibold">12.12</Text>
              <Text className="inline-flex text-lg font-semibold">
                USDC {/*(max)*/}
              </Text>
            </View>
          </View>

          <ChevronUpDownIcon className="w-4 h-4" size={26} color={"black"} />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.inputLabel}>
            Note to the recipient (optional)
          </Text>

          <TextInput
            multiline={true}
            // style={styles.input}
            className="px-4 py-2 text-lg border border-gray-300 rounded-lg"
            placeholder="What is it for?"
            keyboardType="default"
          />
        </View>

        <View className="flex flex-col w-full gap-2">
          <Button
            label="Send"
            onPress={() => Alert.alert("derp1")}
            className="w-full bg-blue-500"
            labelClassName="text-white"
          />
        </View>
      </View>
    </ScrollView>
  );
}

export function InputAmount() {
  return (
    <View className="text-center">
      <Text
        // style={styles.title}
        darkColor={Colors.dark.minorColor}
        lightColor={Colors.light.minorColor}
        className="text-lg font-normal text-center"
      >
        Amount
      </Text>

      <TextInput
        style={styles.amountInput}
        placeholder="0.00"
        keyboardType="numeric"
        autoFocus={true}
        selectTextOnFocus={true}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
    gap: 20,
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
