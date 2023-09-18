import {
  View,
  ScrollView,
  ViewProps,
  MasterStyles,
} from "@/components/core/Themed";

export default function DefaultLayout(props: ViewProps) {
  return (
    <ScrollView>
      <View style={[MasterStyles.container, props.style]} {...props} />
    </ScrollView>
  );
}
