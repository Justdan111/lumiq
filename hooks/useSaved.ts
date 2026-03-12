import { useState, useEffect, useCallback } from "react";
import {
  getSavedFactIds,
  saveFactId,
  removeSavedFactId,
} from "../utils/storage";

export const useSaved = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSavedFactIds().then((ids) => {
      setSavedIds(ids);
      setLoading(false);
    });
  }, []);

  const save = useCallback(async (id: string) => {
    await saveFactId(id);
    setSavedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const remove = useCallback(async (id: string) => {
    await removeSavedFactId(id);
    setSavedIds((prev) => prev.filter((i) => i !== id));
  }, []);

  const toggle = useCallback(
    async (id: string) => {
      if (savedIds.includes(id)) {
        await remove(id);
      } else {
        await save(id);
      }
    },
    [savedIds, save, remove]
  );

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  return { savedIds, loading, save, remove, toggle, isSaved };
};
