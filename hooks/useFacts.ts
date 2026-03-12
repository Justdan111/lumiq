import { useState, useEffect, useCallback } from "react";
import {
  Fact,
  getDailyFact,
  getFactById,
  getNextFacts,
  FACTS,
} from "../data/facts";
import { CategoryId } from "../constants/categories";
import { getSelectedCategories } from "../utils/storage";

export const useDailyFact = () => {
  const [fact, setFact] = useState<Fact | null>(null);
  const [queue, setQueue] = useState<Fact[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFacts = useCallback(async () => {
    const cats = (await getSelectedCategories()) as CategoryId[];
    const activeCats: CategoryId[] =
      cats.length > 0
        ? cats
        : ["science", "history", "philosophy", "tech", "psychology"];
    const daily = getDailyFact(activeCats);
    const next = getNextFacts(activeCats, daily.id, 10);
    setFact(daily);
    setQueue(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFacts();
  }, [loadFacts]);

  const advanceFact = useCallback(() => {
    if (queue.length > 0) {
      const [next, ...rest] = queue;
      setFact(next);
      setQueue(rest);
    }
  }, [queue]);

  return { fact, queue, loading, advanceFact };
};

export const useSavedFacts = (savedIds: string[]): Fact[] => {
  return savedIds
    .map((id) => getFactById(id))
    .filter((f): f is Fact => f !== undefined);
};
