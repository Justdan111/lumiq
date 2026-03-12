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
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "science", label: "Science", color: Colors.category.science },
  { id: "history", label: "History", color: Colors.category.history },
  { id: "philosophy", label: "Philosophy", color: Colors.category.philosophy },
  { id: "tech", label: "Tech", color: Colors.category.tech },
  { id: "psychology", label: "Psychology", color: Colors.category.psychology },
];

export const getCategoryColor = (id: CategoryId): string =>
  Colors.category[id] ?? Colors.amber.DEFAULT;
