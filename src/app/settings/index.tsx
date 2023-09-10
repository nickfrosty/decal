import { Stack } from "expo-router";
import { MinorText } from "@/components/core/Styled";
import { ScrollView, MasterStyles } from "@/components/core/Themed";
import { ListContainer, ListItemLink } from "@/components/core/ListContainer";

export default function Screen() {
  return (
    <ScrollView style={MasterStyles.container}>
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
    </ScrollView>
  );
}