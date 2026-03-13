import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSaved } from "../../hooks/useSaved";
import { useSavedFacts } from "../../hooks/useFacts";
import { getCategoryColor, CATEGORIES } from "../../constants/categories";
import { Colors } from "../../constants/colors";
import { Fact } from "../../data/facts";

// ── Saved Card 
const SavedCard = ({
  fact,
  onPress,
  index,
}: {
  fact: Fact;
  onPress: () => void;
  index: number;
}) => {
  const color = getCategoryColor(fact.category);

  return (
    <Animated.View entering={FadeInDown.delay(index * 70).springify().damping(14)}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.78}>
        <View
          style={{
            backgroundColor: Colors.bg.elevated,
            borderRadius: 18,
            padding: 16,
            borderWidth: 1,
            borderColor: Colors.border,
            borderTopWidth: 2.5,
            borderTopColor: color,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: "DMSans_700Bold",
              fontSize: 9,
              letterSpacing: 2.2,
              color,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            {fact.category}
          </Text>
          <Text
            style={{
              fontFamily: "PlayfairDisplay_700Bold",
              fontSize: 16,
              color: Colors.text.primary,
              lineHeight: 22,
              marginBottom: 8,
            }}
          >
            {fact.title}
          </Text>
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              fontSize: 12,
              color: Colors.text.secondary,
              lineHeight: 17,
            }}
            numberOfLines={2}
          >
            {fact.body}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_400Regular",
                fontSize: 11,
                color: Colors.text.muted,
              }}
            >
              {fact.readTime} min read
            </Text>
            <Text style={{ fontSize: 13, color }}>◈</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

// ── Empty State 
const EmptyState = () => (
  <Animated.View
    entering={FadeIn.delay(200)}
    style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 120 }}
  >
    <Text style={{ fontSize: 52, marginBottom: 18 }}>🫙</Text>
    <Text
      style={{
        fontFamily: "PlayfairDisplay_700Bold",
        fontSize: 24,
        color: Colors.text.primary,
        textAlign: "center",
        marginBottom: 10,
      }}
    >
      Your jar is empty
    </Text>
    <Text
      style={{
        fontFamily: "DMSans_400Regular",
        fontSize: 14,
        color: Colors.text.secondary,
        textAlign: "center",
        lineHeight: 21,
        paddingHorizontal: 48,
      }}
    >
      Swipe right on any fact to start building your mental library.
    </Text>
  </Animated.View>
);

// ── Detail Modal 
const DetailModal = ({
  fact,
  onClose,
  onRemove,
}: {
  fact: Fact;
  onClose: () => void;
  onRemove: () => void;
}) => {
  const color = getCategoryColor(fact.category);
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={true}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,0.72)",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.bg.elevated,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingTop: 12,
            paddingHorizontal: 24,
            paddingBottom: insets.bottom + 28,
            borderTopWidth: 1,
            borderColor: Colors.borderMed,
            maxHeight: "85%",
          }}
        >
          {/* Handle */}
          <View
            style={{
              width: 38,
              height: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255,255,255,0.14)",
              alignSelf: "center",
              marginBottom: 24,
            }}
          />

          {/* Category */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginBottom: 14,
            }}
          >
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: color,
              }}
            />
            <Text
              style={{
                fontFamily: "DMSans_700Bold",
                fontSize: 10,
                letterSpacing: 2.8,
                color,
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
              fontSize: 26,
              color: Colors.text.primary,
              lineHeight: 34,
              marginBottom: 16,
            }}
          >
            {fact.title}
          </Text>

          {/* Divider */}
          <View
            style={{
              height: 1,
              backgroundColor: Colors.border,
              marginBottom: 16,
            }}
          />

          {/* Body */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: 200 }}
          >
            <Text
              style={{
                fontFamily: "DMSans_400Regular",
                fontSize: 15,
                color: Colors.text.secondary,
                lineHeight: 26,
                marginBottom: 8,
              }}
            >
              {fact.body}
            </Text>
          </ScrollView>

          {/* Read time */}
          <Text
            style={{
              fontFamily: "DMSans_400Regular",
              fontSize: 12,
              color: Colors.text.muted,
              marginTop: 12,
              marginBottom: 24,
            }}
          >
            ⏱ {fact.readTime} minute read
          </Text>

          {/* Actions */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                paddingVertical: 15,
                borderRadius: 14,
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.06)",
                borderWidth: 1,
                borderColor: Colors.border,
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSans_500Medium",
                  fontSize: 14,
                  color: Colors.text.secondary,
                }}
              >
                Close
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onRemove}
              style={{
                flex: 1,
                paddingVertical: 15,
                borderRadius: 14,
                alignItems: "center",
                backgroundColor: "rgba(248,113,113,0.10)",
                borderWidth: 1,
                borderColor: "rgba(248,113,113,0.18)",
              }}
            >
              <Text
                style={{
                  fontFamily: "DMSans_500Medium",
                  fontSize: 14,
                  color: Colors.skip,
                }}
              >
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ── Main Screen 
export default function Saved() {
  const insets = useSafeAreaInsets();
  const { savedIds, remove } = useSaved();
  const facts = useSavedFacts(savedIds);
  const [selected, setSelected] = useState<Fact | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter
    ? facts.filter((f) => f.category === filter)
    : facts;

  return (
    <View className="flex-1 bg-bg-primary">
      {/* Header */}
      <View
        style={{
          paddingTop: insets.top + 18,
          paddingHorizontal: 24,
          paddingBottom: 16,
        }}
      >
        <Text
          style={{
            fontFamily: "DMSans_700Bold",
            fontSize: 11,
            letterSpacing: 3.5,
            color: Colors.amber.DEFAULT,
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Lumiq
        </Text>
        <Text
          style={{
            fontFamily: "PlayfairDisplay_700Bold",
            fontSize: 32,
            color: Colors.text.primary,
          }}
        >
          Saved Pieces
        </Text>
        <Text
          style={{
            fontFamily: "DMSans_400Regular",
            fontSize: 13,
            color: Colors.text.secondary,
            marginTop: 2,
          }}
        >
          {facts.length > 0
            ? `${facts.length} piece${facts.length !== 1 ? "s" : ""} in your library`
            : "Refining your mental library"}
        </Text>
      </View>

      {/* Category filters */}
      {facts.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 12,
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => setFilter(null)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 100,
              backgroundColor:
                filter === null
                  ? Colors.amber.dim
                  : "rgba(255,255,255,0.05)",
              borderWidth: 1,
              borderColor:
                filter === null ? Colors.amber.DEFAULT : Colors.border,
            }}
          >
            <Text
              style={{
                fontFamily: "DMSans_500Medium",
                fontSize: 12,
                color:
                  filter === null
                    ? Colors.amber.DEFAULT
                    : Colors.text.secondary,
              }}
            >
              All
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((cat) => {
            const count = facts.filter((f) => f.category === cat.id).length;
            if (count === 0) return null;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() =>
                  setFilter(filter === cat.id ? null : cat.id)
                }
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  borderRadius: 100,
                  backgroundColor:
                    filter === cat.id
                      ? `${cat.color}22`
                      : "rgba(255,255,255,0.05)",
                  borderWidth: 1,
                  borderColor:
                    filter === cat.id ? cat.color : Colors.border,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text
                  style={{
                    fontFamily: "DMSans_500Medium",
                    fontSize: 12,
                    color:
                      filter === cat.id ? cat.color : Colors.text.secondary,
                  }}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ gap: 12, paddingHorizontal: 24 }}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 110,
            paddingTop: 4,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1 }}>
              <SavedCard
                fact={item}
                onPress={() => setSelected(item)}
                index={index}
              />
            </View>
          )}
        />
      )}

      {/* Detail modal */}
      {selected && (
        <DetailModal
          fact={selected}
          onClose={() => setSelected(null)}
          onRemove={async () => {
            await remove(selected.id);
            setSelected(null);
          }}
        />
      )}
    </View>
  );
}
