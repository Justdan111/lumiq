import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { ParticleBackground } from "../../components/ParticleBackground";

import { useDailyFact } from "../../hooks/useFacts";
import { useSaved } from "../../hooks/useSaved";
import { Colors } from "../../constants/colors";
import { FactCard } from "@/components/FactCard";

export default function Today() {
  const insets = useSafeAreaInsets();
  const { fact, loading, advanceFact } = useDailyFact();
  const { save, isSaved } = useSaved();
  const [cardKey, setCardKey] = useState(0);
  const [cardCount, setCardCount] = useState(0);

  // Hint animation (pulse)
  const hintOpacity = useSharedValue(0);
  const hintY = useSharedValue(4);

  // Header entrance
  const headerAnim = useSharedValue(0);

  useEffect(() => {
    headerAnim.value = withDelay(200, withTiming(1, { duration: 500 }));
    hintOpacity.value = withDelay(
      1400,
      withRepeat(
        withTiming(0.9, { duration: 1400, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
    hintY.value = withDelay(
      1400,
      withRepeat(
        withTiming(-2, { duration: 1400, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
  }, []);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerAnim.value,
    transform: [{ translateY: (1 - headerAnim.value) * -10 }],
  }));

  const hintStyle = useAnimatedStyle(() => ({
    opacity: hintOpacity.value,
    transform: [{ translateY: hintY.value }],
  }));

  const handleSave = async () => {
    if (fact) {
      await save(fact.id);
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    setCardCount((c) => c + 1);
    setCardKey((k) => k + 1);
    advanceFact();
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCardCount((c) => c + 1);
    setCardKey((k) => k + 1);
    advanceFact();
  };

  const getDayGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <View className="flex-1 bg-bg-primary">
      <ParticleBackground />

      {/* Header */}
      <Animated.View
        style={[
          {
            paddingTop: insets.top + 14,
            paddingHorizontal: 24,
            paddingBottom: 12,
          },
          headerStyle,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                fontSize: 12,
                letterSpacing: 3.5,
                color: Colors.amber.DEFAULT,
                textTransform: "uppercase",
              }}
            >
              LUMIQ
            </Text>
            <Text
              style={{
                fontFamily: "DMSans_400Regular",
                fontSize: 12,
                color: Colors.text.muted,
                marginTop: 2,
              }}
            >
              {today}
            </Text>
          </View>

          {/* Streak badge */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              backgroundColor: Colors.bg.elevated,
              borderRadius: 100,
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderWidth: 1,
              borderColor: Colors.border,
            }}
          >
            <Text style={{ fontSize: 12 }}>🔥</Text>
            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                fontSize: 12,
                color: Colors.amber.DEFAULT,
              }}
            >
              {cardCount} today
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Card area */}
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 0,
          paddingBottom: 120,
        }}
      >
        {loading ? (
          <ActivityIndicator color={Colors.amber.DEFAULT} size="large" />
        ) : fact ? (
          <FactCard
            key={cardKey}
            fact={fact}
            onSave={handleSave}
            onSkip={handleSkip}
          />
        ) : (
          <View style={{ alignItems: "center", padding: 40 }}>
            <Text style={{ fontSize: 40, marginBottom: 16 }}>✦</Text>
            <Text
              style={{
                fontFamily: "PlayfairDisplay_700Bold",
                fontSize: 22,
                color: Colors.text.primary,
                textAlign: "center",
              }}
            >
              You&apos;ve read everything!
            </Text>
            <Text
              style={{
                fontFamily: "DMSans_400Regular",
                fontSize: 14,
                color: Colors.text.secondary,
                textAlign: "center",
                marginTop: 10,
                lineHeight: 20,
              }}
            >
              Come back tomorrow for a fresh daily fact.
            </Text>
          </View>
        )}
      </View>

      {/* Swipe hint */}
      {!loading && fact && (
        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 104,
              left: 0,
              right: 0,
              alignItems: "center",
              gap: 8,
            },
            hintStyle,
          ]}
          pointerEvents="none"
        >
          {/* Direction hints */}
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 24 }}
          >
            <View style={{ alignItems: "center", gap: 3 }}>
              <Text
                style={{
                  fontFamily: "DMSans_700Bold",
                  fontSize: 9,
                  letterSpacing: 1.5,
                  color: Colors.skip,
                  textTransform: "uppercase",
                }}
              >
                ← Skip
              </Text>
            </View>

            <View
              style={{
                width: 1,
                height: 16,
                backgroundColor: Colors.border,
              }}
            />

            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                fontSize: 10,
                letterSpacing: 2.2,
                color: Colors.amber.DEFAULT,
                textTransform: "uppercase",
              }}
            >
              SWIPE TO EXPLORE  ✦
            </Text>

            <View
              style={{
                width: 1,
                height: 16,
                backgroundColor: Colors.border,
              }}
            />

            <View style={{ alignItems: "center", gap: 3 }}>
              <Text
                style={{
                  fontFamily: "DMSans_700Bold",
                  fontSize: 9,
                  letterSpacing: 1.5,
                  color: Colors.save,
                  textTransform: "uppercase",
                }}
              >
                Save →
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}
