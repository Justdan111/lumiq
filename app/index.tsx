import { useEffect } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { isOnboarded } from "../utils/storage";
import { Colors } from "../constants/colors";

export default function Entry() {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
      const onboarded = await isOnboarded();
      router.replace(onboarded ? "/(tabs)/today" : "/(onboarding)");
    };
    // Small delay to prevent flash
    const t = setTimeout(check, 100);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.bg.primary }}
    />
  );
}
