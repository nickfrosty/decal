import { StyleSheet } from "react-native";
import { View, ScrollView, ViewProps } from "@/components/core/Themed";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 20,
  },
});

export default function DefaultLayout(props: ViewProps) {
  return (
    <ScrollView>
      <View style={[styles.container, props.style]} {...props} />
    </ScrollView>
  );
}
