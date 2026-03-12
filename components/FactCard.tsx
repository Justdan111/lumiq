import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/colors";
import { getCategoryColor } from "../constants/categories";
import { Fact } from "../data/facts";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 48;
const SWIPE_THRESHOLD = width * 0.28;

interface Props {
  fact: Fact;
  onSave: () => void;
  onSkip: () => void;
}

export const FactCard = ({ fact, onSave, onSkip }: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(50);
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.94);

  const categoryColor = getCategoryColor(fact.category);

  useEffect(() => {
    translateX.value = 0;
    translateY.value = withSpring(0, { damping: 18, stiffness: 110 });
    cardOpacity.value = withTiming(1, { duration: 380 });
    cardScale.value = withSpring(1, { damping: 14, stiffness: 120 });
  }, [fact.id]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      const { translationX, velocityX } = event;
      const shouldSave =
        translationX > SWIPE_THRESHOLD || velocityX > 700;
      const shouldSkip =
        translationX < -SWIPE_THRESHOLD || velocityX < -700;

      if (shouldSave) {
        translateX.value = withSpring(width * 1.6, { velocity: velocityX });
        cardOpacity.value = withTiming(0, { duration: 280 });
        runOnJS(onSave)();
      } else if (shouldSkip) {
        translateX.value = withSpring(-width * 1.6, { velocity: velocityX });
        cardOpacity.value = withTiming(0, { duration: 280 });
        runOnJS(onSkip)();
      } else {
        translateX.value = withSpring(0, { damping: 16 });
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-14, 0, 14],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
        { scale: cardScale.value },
      ],
      opacity: cardOpacity.value,
    };
  });

  const saveOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD * 0.6, SWIPE_THRESHOLD],
      [0, 0.5, 1],
      Extrapolation.CLAMP
    ),
  }));

  const skipOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, -SWIPE_THRESHOLD * 0.6, 0],
      [1, 0.5, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{ width: CARD_WIDTH }, cardStyle]}>
        {/* Main Card */}
        <View
          style={{
            borderRadius: 28,
            overflow: "hidden",
            borderWidth: 1.5,
            borderColor: `${categoryColor}35`,
            shadowColor: categoryColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 24,
            elevation: 12,
          }}
        >
          <LinearGradient
            colors={["#141B2D", "#0D1220", "#080C16"]}
            style={{ padding: 30, minHeight: 400 }}
          >
            {/* Category tag */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: categoryColor,
                }}
              />
              <Text
                style={{
                  fontFamily: "DMSans_700Bold",
                  fontSize: 10,
                  letterSpacing: 2.8,
                  color: categoryColor,
                  textTransform: "uppercase",
                }}
              >
                {fact.category}
              </Text>
            </View>

            {/* Title */}
            <Text
              style={{
                fontFamily: "PlayfairDisplay_700Bold",
                fontSize: 28,
                color: "#F0F4FF",
                lineHeight: 36,
                marginBottom: 18,
              }}
            >
              {fact.title}
            </Text>

            {/* Body */}
            <Text
              style={{
                fontFamily: "DMSans_400Regular",
                fontSize: 15,
                color: "#8892A4",
                lineHeight: 25,
              }}
              numberOfLines={6}
            >
              {fact.body}
            </Text>

            {/* Footer */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 28,
                gap: 10,
              }}
            >
              <View
                style={{
                  height: 1.5,
                  width: 28,
                  backgroundColor: `${categoryColor}60`,
                  borderRadius: 1,
                }}
              />
              <Text
                style={{
                  fontFamily: "DMSans_400Regular",
                  fontSize: 12,
                  color: "#4A5568",
                  letterSpacing: 0.3,
                }}
              >
                {fact.readTime} min read
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* SAVE overlay */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              inset: 0,
              borderRadius: 28,
              backgroundColor: "rgba(52,211,153,0.12)",
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 28,
            },
            saveOverlayStyle,
          ]}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: Colors.save,
              borderRadius: 100,
              paddingHorizontal: 18,
              paddingVertical: 9,
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                fontSize: 13,
                color: Colors.save,
                letterSpacing: 1.2,
              }}
            >
              SAVED ✓
            </Text>
          </View>
        </Animated.View>

        {/* SKIP overlay */}
        <Animated.View
          pointerEvents="none"
          style={[
            {
              position: "absolute",
              inset: 0,
              borderRadius: 28,
              backgroundColor: "rgba(248,113,113,0.10)",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingLeft: 28,
            },
            skipOverlayStyle,
          ]}
        >
          <View
            style={{
              borderWidth: 2,
              borderColor: Colors.skip,
              borderRadius: 100,
              paddingHorizontal: 18,
              paddingVertical: 9,
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                fontSize: 13,
                color: Colors.skip,
                letterSpacing: 1.2,
              }}
            >
              SKIP →
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};
