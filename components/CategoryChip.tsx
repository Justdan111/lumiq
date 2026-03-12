import React, { useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../constants/colors";

interface Props {
  label: string;
  color: string;
  selected: boolean;
  onPress: () => void;
  index?: number;
}

export const CategoryChip = ({
  label,
  color,
  selected,
  onPress,
  index = 0,
}: Props) => {
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);
  const pressScale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(index * 90, withSpring(1, { damping: 11, stiffness: 180 }));
    opacity.value = withDelay(index * 90, withTiming(1, { duration: 250 }));
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value * pressScale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => { pressScale.value = withSpring(0.92); }}
        onPressOut={() => { pressScale.value = withSpring(1); }}
        activeOpacity={1}
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 18,
          paddingVertical: 11,
          borderRadius: 100,
          borderWidth: 1.5,
          borderColor: selected ? color : "rgba(255,255,255,0.12)",
          backgroundColor: selected
            ? `${color}20`
            : "rgba(255,255,255,0.04)",
        }}
      >
        <Text
          style={{
            fontFamily: "DMSans_500Medium",
            fontSize: 14,
            color: selected ? color : Colors.text.secondary,
            letterSpacing: 0.2,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
