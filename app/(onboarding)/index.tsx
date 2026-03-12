import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ParticleBackground } from "../../components/ParticleBackground";
import { CATEGORIES, CategoryId } from "../../constants/categories";
import { Colors } from "../../constants/colors";
import { saveSelectedCategories, setOnboarded } from "../../utils/storage";
import { CategoryChip } from "@/components/CategoryChip";

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<CategoryId[]>([]);
  const [loading, setLoading] = useState(false);

  // Stagger entrance animations
  const logoAnim = useSharedValue(0);
  const titleAnim = useSharedValue(0);
  const titleY = useSharedValue(28);
  const subtitleAnim = useSharedValue(0);
  const chipsAnim = useSharedValue(0);
  const buttonAnim = useSharedValue(0);
  const buttonY = useSharedValue(20);

  useEffect(() => {
    logoAnim.value = withDelay(150, withTiming(1, { duration: 500 }));
    titleAnim.value = withDelay(350, withTiming(1, { duration: 600 }));
    titleY.value = withDelay(350, withSpring(0, { damping: 16 }));
    subtitleAnim.value = withDelay(650, withTiming(1, { duration: 500 }));
    chipsAnim.value = withDelay(850, withTiming(1, { duration: 400 }));
    buttonAnim.value = withDelay(1100, withTiming(1, { duration: 500 }));
    buttonY.value = withDelay(1100, withSpring(0, { damping: 14 }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({ opacity: logoAnim.value }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleAnim.value,
    transform: [{ translateY: titleY.value }],
  }));
  const subtitleStyle = useAnimatedStyle(() => ({ opacity: subtitleAnim.value }));
  const chipsStyle = useAnimatedStyle(() => ({ opacity: chipsAnim.value }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonAnim.value,
    transform: [{ translateY: buttonY.value }],
  }));

  const toggle = (id: CategoryId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleBegin = async () => {
    setLoading(true);
    const cats =
      selected.length > 0 ? selected : CATEGORIES.map((c) => c.id);
    await saveSelectedCategories(cats);
    await setOnboarded();
    router.replace("./(tabs)/today");
  };

  return (
    <View className="flex-1 bg-bg-primary">
      <ParticleBackground />

      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 40,
          paddingHorizontal: 28,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo wordmark */}
        <Animated.View style={[{ alignItems: "center" }, logoStyle]}>
          <Text
            style={{
              fontFamily: "DMSans_700Bold",
              fontSize: 12,
              letterSpacing: 5,
              color: Colors.amber.DEFAULT,
              textTransform: "uppercase",
            }}
          >
            LUMIQ
          </Text>
        </Animated.View>

        {/* Hero */}
        <Animated.View style={[{ marginTop: 72 }, titleStyle]}>
          <Text
            style={{
              fontFamily: "PlayfairDisplay_700Bold",
              fontSize: 52,
              color: Colors.text.primary,
              lineHeight: 60,
            }}
          >
            One thing.
          </Text>
          <Text
            style={{
              fontFamily: "PlayfairDisplay_700Bold_Italic",
              fontSize: 52,
              color: Colors.amber.DEFAULT,
              lineHeight: 62,
            }}
          >
            Every day.
          </Text>
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={[{ marginTop: 18 }, subtitleStyle]}>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              fontSize: 16,
              color: Colors.text.secondary,
              lineHeight: 24,
            }}
          >
            Pick your interests. We&apos;ll deliver one mind-expanding idea each day.
          </Text>
        </Animated.View>

        {/* Category chips */}
        <Animated.View style={[{ marginTop: 40 }, chipsStyle]}>
          <Text
            style={{
              fontFamily: "DMSans_700Bold",
              fontSize: 10,
              letterSpacing: 2.5,
              color: Colors.text.muted,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Choose your interests
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
            {CATEGORIES.map((cat, i) => (
              <CategoryChip
                key={cat.id}
                label={cat.label}
                emoji={cat.emoji}
                color={cat.color}
                selected={selected.includes(cat.id)}
                onPress={() => toggle(cat.id)}
                index={i}
              />
            ))}
          </View>

          {selected.length === 0 && (
            <Text
              style={{
                fontFamily: "DMSans_400Regular",
                fontSize: 12,
                color: Colors.text.muted,
                marginTop: 12,
                fontStyle: "italic",
              }}
            >
              Tip: select none to receive facts from all categories
            </Text>
          )}
        </Animated.View>

        <View style={{ flex: 1, minHeight: 48 }} />

        {/* CTA button */}
        <Animated.View style={buttonStyle}>
          <TouchableOpacity onPress={handleBegin} activeOpacity={0.84} disabled={loading}>
            <LinearGradient
              colors={["#FFB940", "#F5A623", "#E8940A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                borderRadius: 18,
                paddingVertical: 19,
                alignItems: "center",
                shadowColor: Colors.amber.DEFAULT,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.45,
                shadowRadius: 16,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSans_700Bold",
                  fontSize: 16,
                  color: "#0A0E1A",
                  letterSpacing: 0.4,
                }}
              >
                {loading ? "Loading..." : "Begin Discovery"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              fontSize: 13,
              color: Colors.text.muted,
              textAlign: "center",
              marginTop: 16,
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                color: Colors.text.secondary,
                fontFamily: "DMSans_500Medium",
              }}
            >
              Sign In
            </Text>
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
