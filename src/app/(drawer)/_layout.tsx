import { DrawerToggleButton } from "@/components/core/Themed";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerLeft: () => <DrawerToggleButton />,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerLabel: "Home",
          title: "Home",
          // headerRight: () =>{}
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          headerShown: true,
          drawerLabel: "Settings",
          title: "Settings",
        }}
      />
    </Drawer>
  );
}
