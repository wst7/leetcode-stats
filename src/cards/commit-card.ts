import utils from "../utils";
import Card from "./Card"
const { flexLayout, encodeHTML } = utils;


const renderStatsCard = (stats = {}, options = { hide: [] }) => {



  const card = new Card({
    customTitle: "custom_title",
    width: 100,
    height: 100,
  });

  const titleText = `
      <text
        x="0"
        y="0"
        class="header"
        data-testid="header"
      >test</text>
    `;
  
  const statItems = [
    titleText,titleText,titleText
  ]


  return card.render(`
    <svg x="0" y="0">
      ${flexLayout({
        items: statItems,
        gap: 25,
        direction: "column",
      }).join("")}
    </svg> 
  `);
};

export default renderStatsCard;