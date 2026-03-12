import React, { useEffect, useMemo } from "react";
import { View, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface StarData {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  maxOpacity: number;
}

const Star = ({ star }: { star: StarData }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      star.delay,
      withRepeat(
        withTiming(star.maxOpacity, {
          duration: star.duration,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: star.x,
          top: star.y,
          width: star.size,
          height: star.size,
          borderRadius: star.size / 2,
          backgroundColor: "#F5A623",
        },
        style,
      ]}
    />
  );
};

interface OrbData {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const Orb = ({ orb }: { orb: OrbData }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      orb.delay,
      withRepeat(
        withTiming(0.12, {
          duration: orb.duration,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true
      )
    );
    translateY.value = withDelay(
      orb.delay,
      withRepeat(
        withTiming(-24, {
          duration: orb.duration * 1.1,
          easing: Easing.inOut(Easing.sin),
        }),
        -1,
        true
      )
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: orb.x - orb.size / 2,
          top: orb.y - orb.size / 2,
          width: orb.size,
          height: orb.size,
          borderRadius: orb.size / 2,
          backgroundColor: orb.color,
        },
        style,
      ]}
    />
  );
};

export const ParticleBackground = () => {
  const stars = useMemo<StarData[]>(
    () =>
      Array.from({ length: 45 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4000,
        duration: Math.random() * 3000 + 2500,
        maxOpacity: Math.random() * 0.5 + 0.15,
      })),
    []
  );

  const orbs = useMemo<OrbData[]>(
    () => [
      { x: width * 0.18, y: height * 0.12, size: 200, color: "#F5A623", delay: 0, duration: 5000 },
      { x: width * 0.88, y: height * 0.38, size: 160, color: "#A78BFA", delay: 1200, duration: 6000 },
      { x: width * 0.08, y: height * 0.68, size: 130, color: "#60A5FA", delay: 600, duration: 5500 },
      { x: width * 0.75, y: height * 0.82, size: 110, color: "#2DD4BF", delay: 2000, duration: 4800 },
    ],
    []
  );

  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", width, height, top: 0, left: 0 }}
    >
      {orbs.map((orb, i) => (
        <Orb key={`orb-${i}`} orb={orb} />
      ))}
      {stars.map((star, i) => (
        <Star key={`star-${i}`} star={star} />
      ))}
    </View>
  );
};
