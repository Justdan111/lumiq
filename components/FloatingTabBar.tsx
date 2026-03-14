import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

// Tab icon SVG paths as unicode symbols
const TAB_CONFIG = [
  {
    name: "today",
    label: "Today",
    activeIcon: "⊞",
    inactiveIcon: "⊟",
  },
  {
    name: "saved",
    label: "Saved",
    activeIcon: "◈",
    inactiveIcon: "◇",
  },
  {
    name: "streak",
    label: "Profile",
    activeIcon: "◎",
    inactiveIcon: "○",
  },
];

const TabButton = ({
  config,
  isFocused,
  onPress,
  isMiddle,
}: {
  config: (typeof TAB_CONFIG)[0];
  isFocused: boolean;
  onPress: () => void;
  isMiddle: boolean;
}) => {
  const scale = useSharedValue(1);
  const activeAnim = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    activeAnim.value = withTiming(isFocused ? 1 : 0, { duration: 220 });
  }, [isFocused]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: activeAnim.value,
    transform: [{ scaleX: activeAnim.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    opacity: activeAnim.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 1 + activeAnim.value * (isMiddle ? 0.05 : 0.08) },
      { translateY: isFocused && isMiddle ? -1 : 0 },
    ],
  }));

  if (isMiddle) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", marginTop: -20 }}>
        {/* Raised circle for middle tab */}
        <Animated.View style={containerStyle}>
          <TouchableOpacity
            onPress={onPress}
            onPressIn={() => { scale.value = withSpring(0.9); }}
            onPressOut={() => { scale.value = withSpring(1); }}
            activeOpacity={1}
          >
            <View
              style={{
                width: 80,
                height: 58,
                borderRadius: 29,
                backgroundColor: isFocused ? Colors.amber.DEFAULT : Colors.bg.elevated,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 3,
                borderColor: isFocused
                  ? Colors.amber.light
                  : "rgba(255,255,255,0.10)",
                shadowColor: isFocused ? Colors.amber.DEFAULT : "#000",
                shadowOffset: { width: 0, height: isFocused ? 6 : 3 },
                shadowOpacity: isFocused ? 0.55 : 0.3,
                shadowRadius: isFocused ? 14 : 8,
                elevation: isFocused ? 12 : 6,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: isFocused ? Colors.bg.primary : Colors.text.secondary,
                }}
              >
                {isFocused ? config.activeIcon : config.inactiveIcon}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Text
          style={{
            fontFamily: "DMSans_700Bold",
            fontSize: 10,
            letterSpacing: 0.8,
            color: isFocused ? Colors.amber.DEFAULT : Colors.text.muted,
            marginTop: 5,
          }}
        >
          {config.label}
        </Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        containerStyle,
        {
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 16,
          paddingVertical: 8,
          minWidth: 72,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.88); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        activeOpacity={1}
        style={{ alignItems: "center", gap: 4 }}
      >
        <Animated.Text
          style={[
            iconStyle,
            {
              fontSize: 20,
              color: isFocused ? Colors.amber.DEFAULT : Colors.text.muted,
            },
          ]}
        >
          {isFocused ? config.activeIcon : config.inactiveIcon}
        </Animated.Text>

        <Text
          style={{
            fontFamily: isFocused ? "DMSans_700Bold" : "DMSans_400Regular",
            fontSize: 10,
            letterSpacing: 0.6,
            color: isFocused ? Colors.amber.DEFAULT : Colors.text.muted,
          }}
        >
          {config.label}
        </Text>

        {/* Active dot */}
        <Animated.View
          style={[
            {
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: Colors.amber.DEFAULT,
              marginTop: 1,
            },
            dotStyle,
          ]}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export const FloatingTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        bottom: insets.bottom + 14,
        left: 20,
        right: 20,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: "rgba(13, 18, 32, 0.96)",
          borderRadius: 100,
          paddingHorizontal: 8,
          paddingBottom: 8,
          paddingTop: 8,
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.09)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.45,
          shadowRadius: 22,
          elevation: 16,
          // subtle inner glow
          gap: 0,
        }}
      >
        {state.routes.map((route, index) => {
          const config = TAB_CONFIG[index];
          const isFocused = state.index === index;
          const isMiddle = index === 1;

          return (
            <TabButton
              key={route.key}
              config={config}
              isFocused={isFocused}
              isMiddle={isMiddle}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
};
