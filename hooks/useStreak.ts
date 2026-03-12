import { getActivity, getStreakData, getTotalLessons, updateStreak } from "../utils/storage";
import { useState, useEffect } from "react";


export const useStreak = (autoUpdate = false) => {
  const [streak, setStreak] = useState(0);
  const [activity, setActivity] = useState<Record<string, number>>({});
  const [totalLessons, setTotalLessons] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (autoUpdate) {
        const s = await updateStreak();
        setStreak(s);
      } else {
        const { streak: s } = await getStreakData();
        setStreak(s);
      }
      const act = await getActivity();
      setActivity(act);
      const total = await getTotalLessons();
      setTotalLessons(total);
      setLoading(false);
    };
    load();
  }, [autoUpdate]);

  return { streak, activity, totalLessons, loading };
};
