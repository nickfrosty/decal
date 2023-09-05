import clsx from "clsx";
import { Link, LinkProps as DefaultLinkProps } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text } from "@/components/core/Themed";
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from "@/components/StyledText";

type ButtonGenericProps = {
  icon?: React.ComponentProps<typeof FontAwesome>["name"];
  // iconPosition?: "left" | "right";
  label?: string;
  className?: string;
  labelClassName?: string;
};

type LinkProps = ButtonGenericProps & DefaultLinkProps<string>;

type ButtonProps = ButtonGenericProps & TouchableOpacityProps;

export function Button({ icon, label, labelClassName, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      className={
        "flex flex-row items-center justify-center w-full px-4 py-3 border border-transparent space-x-2 text-center rounded-full"
      }
    >
      {!!label && (
        <Text className={clsx("text-lg", labelClassName)}>{label}</Text>
      )}

      {!!icon && <FontAwesome className="w-4 h-4" size={16} name={icon} />}
    </TouchableOpacity>
  );
}

export function LinkButton({ href, icon, label, style }: LinkProps) {
  return (
    <Link
      href={href}
      className={"rounded-lg border w-min flex flex-row px-4 py-2 mx-1"}
      style={style}
      asChild
    >
      <TouchableOpacity className="flex flex-row items-center justify-between space-x-2 w-min">
        {icon && <FontAwesome className="w-4 h-4" size={16} name={icon} />}

        <Text className="text-lg">{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

export function GhostLink(props: LinkProps) {
  return <LinkButton {...props} className="bg-transparent border-gray-300" />;
}
