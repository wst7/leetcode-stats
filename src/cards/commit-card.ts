const total = 365;
const getDateKey = (today, diff: number): string => {
  return (today - 86400 * diff).toString();
};

const renderCommitCard = ({ data, theme }) => {
  const commitdata = {};
  const today = new Date();
  today.setHours(8, 0, 0, 0);
  const todayStamp = today.getTime() / 1000;
  for (let index = 0; index <= total; index++) {
    const dateKey = getDateKey(todayStamp, index);
    commitdata[dateKey] = data[dateKey] || 0;
  }

  return commitdata;
};

export default renderCommitCard;
