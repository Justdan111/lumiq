import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  CATEGORIES: "lumiq:categories",
  SAVED_FACTS: "lumiq:saved_facts",
  STREAK: "lumiq:streak",
  LAST_OPENED: "lumiq:last_opened",
  ONBOARDED: "lumiq:onboarded",
  ACTIVITY: "lumiq:activity",
  TOTAL_LESSONS: "lumiq:total_lessons",
};

// ── Onboarding 
export const setOnboarded = async (): Promise<void> => {
  await AsyncStorage.setItem(KEYS.ONBOARDED, "true");
};

export const isOnboarded = async (): Promise<boolean> => {
  const val = await AsyncStorage.getItem(KEYS.ONBOARDED);
  return val === "true";
};

// ── Categories 
export const saveSelectedCategories = async (categories: string[]): Promise<void> => {
  await AsyncStorage.setItem(KEYS.CATEGORIES, JSON.stringify(categories));
};

export const getSelectedCategories = async (): Promise<string[]> => {
  const raw = await AsyncStorage.getItem(KEYS.CATEGORIES);
  return raw ? JSON.parse(raw) : [];
};

// ── Saved Facts 
export const getSavedFactIds = async (): Promise<string[]> => {
  const raw = await AsyncStorage.getItem(KEYS.SAVED_FACTS);
  return raw ? JSON.parse(raw) : [];
};

export const saveFactId = async (id: string): Promise<void> => {
  const existing = await getSavedFactIds();
  if (!existing.includes(id)) {
    await AsyncStorage.setItem(
      KEYS.SAVED_FACTS,
      JSON.stringify([...existing, id])
    );
  }
};

export const removeSavedFactId = async (id: string): Promise<void> => {
  const existing = await getSavedFactIds();
  await AsyncStorage.setItem(
    KEYS.SAVED_FACTS,
    JSON.stringify(existing.filter((i) => i !== id))
  );
};

// ── Streak 
export const getStreakData = async (): Promise<{
  streak: number;
  lastOpened: string | null;
}> => {
  const streakRaw = await AsyncStorage.getItem(KEYS.STREAK);
  const lastOpened = await AsyncStorage.getItem(KEYS.LAST_OPENED);
  return {
    streak: streakRaw ? parseInt(streakRaw, 10) : 0,
    lastOpened,
  };
};

export const updateStreak = async (): Promise<number> => {
  const today = new Date().toDateString();
  const { streak, lastOpened } = await getStreakData();

  if (lastOpened === today) return streak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isConsecutive = lastOpened === yesterday.toDateString();

  const newStreak = isConsecutive ? streak + 1 : 1;
  await AsyncStorage.setItem(KEYS.STREAK, String(newStreak));
  await AsyncStorage.setItem(KEYS.LAST_OPENED, today);
  await recordActivity(today);
  await incrementTotalLessons();
  return newStreak;
};

// ── Activity Heatmap 
export const recordActivity = async (dateString: string): Promise<void> => {
  const raw = await AsyncStorage.getItem(KEYS.ACTIVITY);
  const activity: Record<string, number> = raw ? JSON.parse(raw) : {};
  activity[dateString] = (activity[dateString] || 0) + 1;
  await AsyncStorage.setItem(KEYS.ACTIVITY, JSON.stringify(activity));
};

export const getActivity = async (): Promise<Record<string, number>> => {
  const raw = await AsyncStorage.getItem(KEYS.ACTIVITY);
  return raw ? JSON.parse(raw) : {};
};

// ── Total Lessons 
export const incrementTotalLessons = async (): Promise<void> => {
  const raw = await AsyncStorage.getItem(KEYS.TOTAL_LESSONS);
  const count = raw ? parseInt(raw, 10) : 0;
  await AsyncStorage.setItem(KEYS.TOTAL_LESSONS, String(count + 1));
};

export const getTotalLessons = async (): Promise<number> => {
  const raw = await AsyncStorage.getItem(KEYS.TOTAL_LESSONS);
  return raw ? parseInt(raw, 10) : 0;
};

// ── Reset (dev helper) 
export const resetAll = async (): Promise<void> => {
  await AsyncStorage.multiRemove(Object.values(KEYS));
};
