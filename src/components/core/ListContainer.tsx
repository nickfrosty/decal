import { Link, LinkProps } from "expo-router";
import { TouchableOpacity } from "@/components/core/Styled";
import { Text, View, useThemeColor, ViewProps } from "@/components/core/Themed";

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

type ListItemLinkProps = LinkProps<string> & { label: string; isTop?: boolean };

export function ListItemLink({
  isTop,
  label,
  style,
  ...props
}: ListItemLinkProps) {
  return (
    <TouchableOpacity>
      <Link
        className="flex flex-row items-center justify-between px-4 py-3 border-b border-b-transparent"
        style={[
          isTop && {
            borderBottomColor: useThemeColor("borderColor"),
          },
          style,
        ]}
        {...props}
      >
        <Text className="text-lg">{label}</Text>
      </Link>
    </TouchableOpacity>
  );
}
