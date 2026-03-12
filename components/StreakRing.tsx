import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import { Colors } from "../constants/colors";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  streak: number;
  maxStreak?: number;
  size?: number;
}

export const StreakRing = ({ streak, maxStreak = 7, size = 200 }: Props) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const cx = size / 2;
  const cy = size / 2;

  const progress = useSharedValue(0);

  useEffect(() => {
    const target = Math.min(streak / Math.max(maxStreak, streak, 1), 1);
    progress.value = withDelay(
      300,
      withTiming(target, {
        duration: 1600,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [streak]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Defs>
          <LinearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#FFB940" />
            <Stop offset="100%" stopColor="#F5A623" />
          </LinearGradient>
        </Defs>

        {/* Track */}
        <Circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Glow layer */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="rgba(245,166,35,0.2)"
          strokeWidth={strokeWidth + 6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${cx}, ${cy}`}
        />

        {/* Main ring */}
        <AnimatedCircle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="url(#ringGrad)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          rotation="-90"
          origin={`${cx}, ${cy}`}
        />
      </Svg>

      {/* Center text */}
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "PlayfairDisplay_700Bold",
            fontSize: 54,
            color: Colors.text.primary,
            lineHeight: 58,
          }}
        >
          {streak}
        </Text>
        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            fontSize: 14,
            color: Colors.text.secondary,
            marginTop: 2,
          }}
        >
          day streak
        </Text>
        <Text style={{ fontSize: 22, marginTop: 8 }}>🔥</Text>
      </View>
    </View>
  );
};
