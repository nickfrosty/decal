import { useMemo, useCallback, forwardRef } from "react";

import {
  MasterStyles,
  Text,
  View,
  useThemeColor,
} from "@/components/core/Themed";
import {
  BottomSheetModal as BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import { TouchableOpacity } from "@/components/core/Styled";
import { XMarkIcon } from "react-native-heroicons/solid";

export type ModalHeaderProps = {
  title: string;
  description?: string;
  handleCloseModal: any;
};

export const ModalHeader = ({
  title,
  description,
  handleCloseModal,
}: ModalHeaderProps) => {
  return (
    <View className="mb-5 bg-transparent">
      <View className="flex flex-row items-center justify-between w-full bg-transparent">
        <Text className={"font-semibold text-xl"}>{title}</Text>

        <TouchableOpacity onPress={handleCloseModal} className="">
          <XMarkIcon
            // color={"black"}
            color={useThemeColor("iconColor")}
            style={MasterStyles.icon}
          />
        </TouchableOpacity>
      </View>

      {!!description && (
        <Text className={"text-base text-gray-500"}>{description}</Text>
      )}
    </View>
  );
};
