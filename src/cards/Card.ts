import utils from "../utils";
const { flexLayout, encodeHTML } = utils;

type Options = {
  width?: number;
  height?: number;
  customTitle?: string;
  defaultTitle?: string;
};

class Card {
  width: number;
  height: number;
  title: string;

  constructor({ width = 100, height = 100, customTitle, defaultTitle = "" }: Options) {
    this.width = width;
    this.height = height;

    // returns theme based colors with proper overrides and defaults

    this.title =
      customTitle !== undefined
        ? encodeHTML(customTitle)
        : encodeHTML(defaultTitle);
  }

  setTitle(text) {
    this.title = text;
  }

  renderTitle() {
    const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >${this.title}</text>
    `;

    return `
      <g
        data-testid="card-title"
      >
        ${flexLayout({
          items: [titleText],
          gap: 25,
          direction: "",
        }).join("")}
      </g>
    `;
  }

  render(body) {
    return `
      <svg
        width="${this.width}"
        height="${this.height}"
        viewBox="0 0 ${this.width} ${this.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          .header {
            font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
            fill: #ccc;
            animation: fadeInAnimation 0.8s ease-in-out forwards;
          }
        </style>


        <rect
          data-testid="card-bg"
          x="0.5"
          y="0.5"
          rx="10px"
          height="99%"
          stroke="#ccc"
          width="${this.width - 1}"
          
        />

        ${this.renderTitle()}

        <g
          data-testid="main-card-body"
        >
          ${body}
        </g>
      </svg>
    `;
  }
}

export default Card;
