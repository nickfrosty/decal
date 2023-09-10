import { DrawerToggleButton } from "@/components/core/Themed";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        headerLeft: () => <DrawerToggleButton />,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          // headerShown: false,
          drawerLabel: "Home",
          title: "Home",
          // headerRight: () =>{}
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          // headerShown: false,
          drawerLabel: "Settings",
          title: "Settings",
        }}
      />
    </Drawer>
  );
}
