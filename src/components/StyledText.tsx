import { TouchableOpacity as DefaultTouchableOpacity } from "react-native-gesture-handler";
import { Text, TextProps } from "./core/Themed";
import { forwardRef } from "react";

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export const TouchableOpacity = forwardRef<
  DefaultTouchableOpacity,
  DefaultTouchableOpacity["props"]
>((props: DefaultTouchableOpacity["props"], ref) => {
  return <DefaultTouchableOpacity {...props} activeOpacity={0.7} />;
});

export type TouchableOpacityProps = DefaultTouchableOpacity["props"];
