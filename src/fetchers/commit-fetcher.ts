import axios from "axios";

const fetcher = async (username: string): Promise<any> => {
  try {
    const res = await axios.get(
      `https://leetcode-cn.com/api/user_submission_calendar/${username}/`,
      {
        responseType: "text",
      }
    );
    if (typeof res.data === "object") return {};
    const data = JSON.parse(res.data);
    console.log(data)
    return data;
  } catch (e) {
    console.error(e.message);
  }
};

export default fetcher;
