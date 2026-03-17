import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StreakRing } from "../../components/StreakRing";
import { HeatmapCalendar } from "../../components/HeatmapCalendar";
import { useStreak } from "../../hooks/useStreak";
import { Colors } from "../../constants/colors";
import { resetAll } from "../../utils/storage";
import { useRouter } from "expo-router";

const StatCard = ({
  value,
  label,
  emoji,
  delay = 0,
}: {
  value: string;
  label: string;
  emoji: string;
  delay?: number;
}) => (
  <Animated.View
    entering={FadeInDown.delay(delay).springify().damping(14)}
    style={{ flex: 1 }}
  >
    <View
      style={{
        backgroundColor: Colors.bg.elevated,
        borderRadius: 18,
        padding: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.border,
      }}
    >
      <Text style={{ fontSize: 22, marginBottom: 8 }}>{emoji}</Text>
      <Text
        style={{
          fontFamily: "PlayfairDisplay_700Bold",
          fontSize: 34,
          color: Colors.text.primary,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontFamily: "DMSans_700Bold",
          fontSize: 9,
          letterSpacing: 2,
          color: Colors.amber.DEFAULT,
          textTransform: "uppercase",
          marginTop: 4,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </View>
  </Animated.View>
);

const AchievementBadge = ({
  emoji,
  title,
  subtitle,
  unlocked,
  delay = 0,
}: {
  emoji: string;
  title: string;
  subtitle: string;
  unlocked: boolean;
  delay?: number;
}) => (
  <Animated.View entering={FadeInDown.delay(delay).springify()}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        backgroundColor: Colors.bg.elevated,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: unlocked ? "rgba(245,166,35,0.2)" : Colors.border,
        opacity: unlocked ? 1 : 0.45,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          width: 46,
          height: 46,
          borderRadius: 23,
          backgroundColor: unlocked
            ? "rgba(245,166,35,0.15)"
            : "rgba(255,255,255,0.04)",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: unlocked ? "rgba(245,166,35,0.3)" : Colors.border,
        }}
      >
        <Text style={{ fontSize: 22, opacity: unlocked ? 1 : 0.5 }}>{emoji}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: "DMSans_700Bold",
            fontSize: 14,
            color: unlocked ? Colors.text.primary : Colors.text.muted,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            fontSize: 12,
            color: Colors.text.muted,
            marginTop: 2,
          }}
        >
          {subtitle}
        </Text>
      </View>
      {unlocked && (
        <View
          style={{
            backgroundColor: "rgba(245,166,35,0.2)",
            borderRadius: 100,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "DMSans_700Bold",
              fontSize: 9,
              letterSpacing: 1.5,
              color: Colors.amber.DEFAULT,
              textTransform: "uppercase",
            }}
          >
            Earned
          </Text>
        </View>
      )}
    </View>
  </Animated.View>
);

export default function Streak() {
  const insets = useSafeAreaInsets();
  const { streak, activity, totalLessons } = useStreak(true);
  const router = useRouter();

  const focusTime = Math.round(totalLessons * 3.5 * 10) / 10;

  const streakMessage =
    streak >= 30
      ? "Legendary. A month of daily wisdom. 🌟"
      : streak >= 14
      ? "Two weeks strong — you're unstoppable."
      : streak >= 7
      ? "You're on fire! 12 lessons completed this week."
      : streak >= 3
      ? `${streak} days strong. Don't break the chain.`
      : streak === 1
      ? "Great start! Come back tomorrow to grow your streak."
      : "Start your learning journey today.";

  const handleReset = () => {
    Alert.alert(
      "Reset All Data",
      "This will clear your streak, saved facts, and settings. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetAll();
            router.replace("/(onboarding)");
          },
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-bg-primary">
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 110,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeIn.delay(100)}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <Text
            style={{
              fontFamily: "DMSans_700Bold",
              fontSize: 11,
              letterSpacing: 3.5,
              color: Colors.text.secondary,
              textTransform: "uppercase",
            }}
          >
            PROFILE
          </Text>
        </Animated.View>

        {/* Streak ring */}
        <Animated.View
          entering={FadeIn.delay(200)}
          style={{ alignItems: "center", marginBottom: 18 }}
        >
          <StreakRing
            streak={streak}
            maxStreak={Math.max(streak, 7)}
            size={220}
          />
        </Animated.View>

        {/* Streak message */}
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={{ marginBottom: 32 }}
        >
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              fontSize: 15,
              color: Colors.text.secondary,
              textAlign: "center",
              lineHeight: 23,
            }}
          >
            {streakMessage}
          </Text>
        </Animated.View>

        {/* Heatmap */}
        <Animated.View
          entering={FadeInDown.delay(400).springify()}
          style={{ marginBottom: 18 }}
        >
          <HeatmapCalendar activity={activity} />
        </Animated.View>

        {/* Stats row */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 28 }}>
          <StatCard
            value={String(totalLessons)}
            label="Total Lessons"
            emoji="📚"
            delay={500}
          />
          <StatCard
            value={`${focusTime}h`}
            label="Focus Time"
            emoji="⏱"
            delay={580}
          />
        </View>

        {/* Achievements */}
        <Animated.View entering={FadeInDown.delay(640)}>
          <Text
            style={{
              fontFamily: "DMSans_700Bold",
              fontSize: 10,
              letterSpacing: 2.5,
              color: Colors.text.muted,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Achievements
          </Text>
        </Animated.View>

        <AchievementBadge
          emoji="🌱"
          title="First Spark"
          subtitle="Read your first fact"
          unlocked={totalLessons >= 1}
          delay={700}
        />
        <AchievementBadge
          emoji="🔥"
          title="On Fire"
          subtitle="Maintain a 7-day streak"
          unlocked={streak >= 7}
          delay={760}
        />
        <AchievementBadge
          emoji="📚"
          title="Scholar"
          subtitle="Read 25 facts"
          unlocked={totalLessons >= 25}
          delay={820}
        />
        <AchievementBadge
          emoji="🌙"
          title="Night Owl"
          subtitle="Read a fact after 10 PM"
          unlocked={false}
          delay={880}
        />
        <AchievementBadge
          emoji="🏆"
          title="Luminary"
          subtitle="Maintain a 30-day streak"
          unlocked={streak >= 30}
          delay={940}
        />

        {/* Reset button */}
        <Animated.View entering={FadeInDown.delay(1000)}>
          <TouchableOpacity
            onPress={handleReset}
            style={{
              marginTop: 32,
              paddingVertical: 14,
              borderRadius: 14,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(248,113,113,0.15)",
              backgroundColor: "rgba(248,113,113,0.06)",
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_500Medium",
                fontSize: 13,
                color: "rgba(248,113,113,0.7)",
                letterSpacing: 0.3,
              }}
            >
              Reset App Data
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
