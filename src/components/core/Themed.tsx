/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import Colors from "@/constants/Colors";

import {
  StyleSheet,
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  ScrollView as DefaultScrollView,
} from "react-native";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  props?: { light?: string; dark?: string },
) {
  const theme = useColorScheme() ?? "light";

  // use the custom color provided via the props
  if (!!props && props[theme]) {
    return props[theme];
  }

  // fallback to the themed color
  return Colors[theme][colorName];
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor("text", {
    light: lightColor,
    dark: darkColor,
  });

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor("background", {
    light: lightColor,
    dark: darkColor,
  });

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, children, ...otherProps } = props;
  const backgroundColor = useThemeColor("background", {
    light: lightColor,
    dark: darkColor,
  });

  return (
    <DefaultScrollView>
      <View style={[{ backgroundColor }, style]} {...otherProps}>
        {children}
      </View>
    </DefaultScrollView>
  );
}

export const MasterStyles = StyleSheet.create({
  icon: {
    height: 28,
    width: 28,
    margin: 3,
    resizeMode: "contain",
    marginHorizontal: 12,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 16,
    gap: 20,
    flexGrow: 1,
  },
});
