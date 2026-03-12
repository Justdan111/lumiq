import { Colors } from "./colors";


export type CategoryId =
  | "science"
  | "history"
  | "philosophy"
  | "tech"
  | "psychology";

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "science", label: "Science", emoji: "🔬", color: Colors.category.science },
  { id: "history", label: "History", emoji: "📜", color: Colors.category.history },
  { id: "philosophy", label: "Philosophy", emoji: "🧠", color: Colors.category.philosophy },
  { id: "tech", label: "Tech", emoji: "⚡", color: Colors.category.tech },
  { id: "psychology", label: "Psychology", emoji: "🪞", color: Colors.category.psychology },
];

export const getCategoryColor = (id: CategoryId): string =>
  Colors.category[id] ?? Colors.amber.DEFAULT;

export const getCategoryEmoji = (id: CategoryId): string =>
  CATEGORIES.find((c) => c.id === id)?.emoji ?? "✦";
