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


type Data = {
  [key: string]: number
}
type Themes = 'dark' | 'light'

class Card {
  data: Data = {}
  days: number = 365
  theme: Themes = 'light'


  constructor(data: Data, theme: Themes) {
    this.data = data
    if (theme) {
      this.theme = theme
    }

  }

  private renderWeeks() {
    return this.renderDay('ff')
  }

  private renderDay(rect) {
    return new Array(7).fill(1).map((_, idx) => {
      console.log(idx)
      return `
        <rect
          x="0"
          y=${idx * 14}
          width="8.86"
          height="8.86"
          fill="#ccc"
          rx="2"
          ry="2"
        ></rect>
      `
    }).join('')
  }


  public render() {
    return `
      <svg>
        ${this.renderWeeks()}
      </svg>
    `
  }
}



export default Card;