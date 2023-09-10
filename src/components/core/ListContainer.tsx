import { Link, LinkProps } from "expo-router";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/components/core/Styled";
import { Text, View, useThemeColor, ViewProps } from "@/components/core/Themed";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type BaseProps = { label: string; isTop?: boolean };

export function ListContainer(props: ViewProps) {
  return (
    <View
      className="border rounded-lg"
      style={{
        borderColor: useThemeColor("borderColor"),
      }}
    >
      {props.children}
    </View>
  );
}

export function ListItem({
  isTop,
  label,
  style,
  children,
  ...props
}: BaseProps & TouchableOpacityProps) {
  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-between px-4 py-3 border-y border-y-transparent"
      style={[
        !isTop && { borderTopColor: useThemeColor("borderColor") },
        style,
      ]}
      {...props}
    >
      {children ? children : <Text className="text-lg">{label}</Text>}
    </TouchableOpacity>
  );
}

export function ListItemLink({
  isTop,
  label,
  style,
  ...props
}: BaseProps & LinkProps<string>) {
  return (
    <TouchableOpacity>
      <Link
        className="flex flex-row items-center justify-between px-4 py-3 border-y border-y-transparent"
        style={[
          !isTop && { borderTopColor: useThemeColor("borderColor") },
          style,
        ]}
        {...props}
      >
        <Text className="text-lg">{label}</Text>
      </Link>
    </TouchableOpacity>
  );
}

export function ListCheckBox({
  isTop,
  label,
  style,
  textComponent,
  ...props
}: BaseProps & BouncyCheckbox["props"]) {
  return (
    <BouncyCheckbox
      className="flex flex-row items-center px-4 py-3 border-y border-y-transparent"
      style={[
        !isTop && { borderTopColor: useThemeColor("borderColor") },
        style,
      ]}
      textComponent={textComponent ?? props.children}
      size={26}
      // unfillColor="#FFFFFF"
      fillColor={"red"}
      iconStyle={{
        marginRight: 14,
      }}
      innerIconStyle={{
        borderWidth: 1,
        // borderColor: Colors[colorScheme].borderColor,
      }}
      {...props}
    ></BouncyCheckbox>
  );
}
