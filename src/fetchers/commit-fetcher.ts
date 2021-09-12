import { Request } from "express";
import axios from "axios";
import { getFullCalendar } from "../utils";

function request(username: Request["query"] | string) {
  const headers = {
    authority: "leetcode-cn.com",
    "content-type": "text/plain",
    origin: "https://leetcode-cn.com",
    "sec-fetch-site": "same-origin",
    "sec-fetch-mode": "cors",
    "sec-fetch-dest": "empty",
    referer: `https://leetcode-cn.com/u/${username}/`,
    // "x-csrftoken": "Cr4np5d7NoiksElDYydtICsjwLEryqXGQKDadrHmiRgogX1IHZuV0McJGKmGm3YF",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
  };
  return axios.get(
    `https://leetcode-cn.com/api/user_submission_calendar/${username}/`,
    {
      headers,
    }
  );
}

const fetcher = (username: Request["query"]): Promise<any> => {
  return request(username)
    .then((res) => {
      const data = res.data;
      console.log("@@ after request");
      const partCalendar = JSON.parse(data);
      const fullCalendar = getFullCalendar(partCalendar);
      return fullCalendar;
    })
    .catch((err) => {
      console.log("@@ catch request");
      // console.log(err)
    });
};

export default fetcher;
