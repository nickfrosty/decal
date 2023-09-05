import { TouchableOpacity as DefaultTouchableOpacity } from "react-native-gesture-handler";
import { Text, TextProps } from "./core/Themed";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function TouchableOpacity(props: DefaultTouchableOpacity["props"]) {
  return <DefaultTouchableOpacity {...props} activeOpacity={0.7} />;
}

export type TouchableOpacityProps = DefaultTouchableOpacity["props"];
