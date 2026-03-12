import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../constants/colors";

interface Props {
  activity: Record<string, number>;
  weeks?: number;
}

const getColor = (count: number): string => {
  if (count === 0) return "rgba(255,255,255,0.05)";
  if (count === 1) return "rgba(245,166,35,0.28)";
  if (count === 2) return "rgba(245,166,35,0.50)";
  if (count === 3) return "rgba(245,166,35,0.72)";
  return Colors.amber.DEFAULT;
};

export const HeatmapCalendar = ({ activity, weeks = 12 }: Props) => {
  const today = new Date();

  // Build grid: weeks columns × 7 rows
  const grid: { date: Date; count: number }[][] = [];
  for (let w = weeks - 1; w >= 0; w--) {
    const col: { date: Date; count: number }[] = [];
    for (let d = 6; d >= 0; d--) {
      const date = new Date(today);
      date.setDate(today.getDate() - (w * 7 + d));
      col.push({ date, count: activity[date.toDateString()] || 0 });
    }
    grid.push(col);
  }

  return (
    <View
      style={{
        backgroundColor: Colors.bg.elevated,
        borderRadius: 20,
        padding: 18,
        borderWidth: 1,
        borderColor: Colors.border,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Text
          style={{
            fontFamily: "DMSans_700Bold",
            fontSize: 10,
            letterSpacing: 2.2,
            color: Colors.text.muted,
            textTransform: "uppercase",
          }}
        >
          Learning Activity
        </Text>
        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            fontSize: 11,
            color: Colors.text.muted,
          }}
        >
          Last {weeks} weeks
        </Text>
      </View>

      {/* Grid */}
      <View style={{ flexDirection: "row", gap: 3 }}>
        {grid.map((col, wi) => (
          <View key={wi} style={{ flexDirection: "column", gap: 3 }}>
            {col.map((cell, di) => (
              <View
                key={di}
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: 3,
                  backgroundColor: getColor(cell.count),
                }}
              />
            ))}
          </View>
        ))}
      </View>

      {/* Legend */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 12,
          justifyContent: "flex-end",
          gap: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            fontSize: 10,
            color: Colors.text.muted,
            marginRight: 3,
          }}
        >
          Less
        </Text>
        {[0, 1, 2, 3, 4].map((v) => (
          <View
            key={v}
            style={{
              width: 11,
              height: 11,
              borderRadius: 2,
              backgroundColor: getColor(v),
            }}
          />
        ))}
        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            fontSize: 10,
            color: Colors.text.muted,
            marginLeft: 3,
          }}
        >
          More
        </Text>
      </View>
    </View>
  );
};
