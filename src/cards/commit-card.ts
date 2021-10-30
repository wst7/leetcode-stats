import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

type Data = {
  [key: string]: number;
};
type Themes = "dark" | "light";

type CommitsData = {
  date: string;
  commits: number;
  color: string;
  month: number;
  day: number; // day of week
  week: number;
};

enum Levels {
  none = "#ebedf0",
  less = "#ace6ad",
  medium = "#69c06e",
  height = "#539e57",
  more = "#386c3e",
}

class Card {
  data: Data = {};
  commitsData: CommitsData[] = [];
  days: number = 365;
  theme: Themes = "light";
  // levels = {
  //   0: "#ebedf0",
  //   1: "#ace6ad",
  //   2: "#69c06e",
  //   3: "#539e57",
  //   4: "#386c3e",
  // };
  unit = 12;

  constructor(data: Data, theme: Themes) {
    this.data = data;
    this.setCommitsData(data);
    if (theme) {
      this.theme = theme;
    }
  }

  private setCommitsData(data: Data) {
    const completeData = this.getCompleteData(data);
    const stamps = Object.keys(completeData);
    console.log(stamps.length);
    const commitsData = stamps.map((stamp) => {
      const date = dayjs(stamp);
      return {
        date: date.format("YYYY-MM-DD"),
        commits: completeData[stamp],
        month: date.month() + 1,
        day: date.day(),
        week: date.week(),
        color: this.getColor(completeData[stamp]),
      };
    });
    this.commitsData = commitsData;
  }

  private getColor(commits: number): string {
    if (commits <= 0) {
      return Levels.none;
    } else if (commits <= 3) {
      return Levels.less;
    } else if (commits <= 6) {
      return Levels.medium;
    } else if (commits <= 10) {
      return Levels.height;
    } else {
      return Levels.more;
    }
  }

  private getCompleteData(data: Data): Data {
    const completeData = {};
    const today = new Date();
    today.setHours(8, 0, 0, 0);
    const todayStamp = today.getTime() / 1000;
    for (let index = 0; index < this.days; index++) {
      const dateKey = this.getDateKey(todayStamp, index);
      completeData[dateKey] = data[dateKey] || 0;
    }

    return completeData;
  }

  private getDateKey(stamp: number, diff: number): string {
    return (stamp - 86400 * diff).toString();
  }

  private renderDays() {
    return this.commitsData
      .map((item) => {
        return `
          <rect
            x=${item.week * this.unit}
            y=${item.day * this.unit}
            width="10"
            height="10"
            fill=${item.color}
            rx="2"
            ry="2"
            data-commits=${item.commits}
            title=${`${item.commits} commits on ${item.date}`}
          ></rect>
        `;
      })
      .join("");
  }

  public render() {
    return `
      <svg 
        version="1.1"
        baseProfile="full"
        width="640" height="100"
        xmlns="http://www.w3.org/2000/svg"
        style="border:1px solid #d0d7de"
      >
        <g style="text-align:center">${this.renderDays()}</g>
      </svg>
    `;
  }
}

export default Card;
