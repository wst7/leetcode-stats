import dayjs from "dayjs";

export const ascSortDate = (arr: Array<number | string>) => {
  return arr.sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf());
};
