import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { isOnboarded, resetAll } from "../utils/storage";
import { Colors } from "../constants/colors";

export default function Entry() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      await resetAll(); // DEV: always show onboarding
      router.replace("/(onboarding)");
    };
    // Small delay to prevent flash
    const t = setTimeout(check, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.bg.primary }}
    />
  );
}
