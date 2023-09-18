import { Text, View } from "@/components/core/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import clsx from "clsx";
import { MonoText } from "@/components/core/Styled";

type ComponentProps = {
  label?: string;
};

// export function ScreenHero({
// }: ComponentProps) {
//   return (
//     <>
//       <View className="flex items-center justify-center gap-2 my-4">
//         <View
//           className={clsx(
//             "items-center justify-center w-20 h-20 align-middle rounded-full",
//             iconBackground ?? "bg-gray-400",
//           )}
//         >
//           <FontAwesome size={40} color={iconColor} name={iconName} />
//         </View>

//         {!!iconLabel && (
//           <MonoText className={"text-lg text-gray-600 text-center"}>
//             {iconLabel}
//           </MonoText>
//         )}
//       </View>
//     </>
//   );
// }

type ScreenTitleSectionProps = {
  style?: any;
  title: string;
  description?: string;
};

export function HeroTitleSection({
  style,
  title,
  description,
}: ScreenTitleSectionProps) {
  return (
    <View className="items-center gap-3 bg-transparent" style={style}>
      <Text className={"font-semibold text-2xl text-center"}>{title}</Text>

      {!!description && (
        <Text className={"text-gray-500 text-center text-base"}>
          {description}
        </Text>
      )}
    </View>
  );
}

type HeroIconDetails = {
  icon: JSX.Element;
  label?: string;
  background?: string;
};

// export function HeroGraphic({
//   label,
//   backgroundColor,
//   icon,
// }: FontAwesomeIconDetails) {
//   return (
//     <View className="flex items-center justify-center gap-2 my-4">
//       <View
//         className={clsx(
//           "items-center justify-center w-20 h-20 align-middle rounded-full",
//           backgroundColor ?? "bg-gray-200",
//         )}
//       >
//         {icon}
//       </View>

//       {!!label && (
//         <MonoText className={"text-lg text-gray-600 text-center"}>
//           {label}
//         </MonoText>
//       )}
//     </View>
//   );
// }

export function HeroIcon({ label, background, icon }: HeroIconDetails) {
  return (
    <View className="flex items-center justify-center gap-2 my-4 bg-transparent">
      <View
        className={clsx(
          "items-center justify-center w-20 h-20 align-middle rounded-full",
          background ?? "bg-gray-200",
        )}
      >
        {icon}
      </View>

      {!!label && (
        <MonoText className={"text-lg text-gray-600 text-center"}>
          {label}
        </MonoText>
      )}
    </View>
  );
}
