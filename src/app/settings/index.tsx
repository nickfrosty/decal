import { Stack } from "expo-router";
import DefaultLayout from "@/components/core/DefaultLayout";
import { MinorText } from "@/components/core/Styled";
import { ListContainer, ListItemLink } from "@/components/core/ListContainer";

export default function Screen() {
  return (
    <DefaultLayout>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Settings",
        }}
      />

      <MinorText className="text-base text-center">
        Developer Settings
      </MinorText>

      <ListContainer>
        <ListItemLink
          isTop={true}
          label="Change wallet"
          href={"/settings/changeWallet"}
        />
        <ListItemLink label="Change wallet" href={"/settings/changeWallet"} />
      </ListContainer>
    </DefaultLayout>
  );
}
