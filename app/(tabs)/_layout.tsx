import { Tabs } from "expo-router";
import { FloatingTabBar } from "../../components/FloatingTabBar";

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <FloatingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="today" options={{ title: "Today" }} />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="streak" options={{ title: "Profile" }} />
    </Tabs>
  );
}
