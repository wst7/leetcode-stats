import axios from "axios";

const fetcher = async (username: string): Promise<any> => {
  try {
    const res = await fetch(
      `https://leetcode-cn.com/api/user_submission_calendar/${username}/`,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    if (!res.ok) throw new Error("Network response was not ok");
    const dataStr = await res.json();
    if (typeof dataStr === "object") return {};
    const data = JSON.parse(dataStr);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default fetcher;
