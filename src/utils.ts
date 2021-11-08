export const ascSort = (arr: Array<number | string>) => {
  return arr.sort((a, b) => Number(a) - Number(b))
}