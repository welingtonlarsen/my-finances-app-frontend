import { Category } from '@/types/expense-types';

export default function getCategoryName(isCategoriesLoading: boolean, categories: Category[], categoryId: number) {
  if (isCategoriesLoading) return '';
  return categories.find((category) => category.id === categoryId)?.name ?? '';
}
