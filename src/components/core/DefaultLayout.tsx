import { StyleSheet } from "react-native";
import { View, ScrollView } from "@/components/core/Themed";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 20,
  },
});

export default function DefaultLayout(props: any) {
  return (
    <ScrollView>
      <View style={styles.container} {...props} />
    </ScrollView>
  );
}
