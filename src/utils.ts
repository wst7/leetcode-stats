export const descSort = (arr: Array<number | string>) => {
  return arr.sort((a, b) => Number(b) - Number(a))
}