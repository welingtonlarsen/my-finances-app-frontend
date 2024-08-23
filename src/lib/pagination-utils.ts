export const canFetchMore = (itemsLenght: number, currentPage: number, pageSize: number) => {
  const maxItems = currentPage * pageSize;
  return itemsLenght === maxItems;
};
