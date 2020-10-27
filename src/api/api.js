import axios from "axios";

const url = "https://randomuser.me/api/?results=1";

export const fetchData = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(url);

    return { ...results };
  } catch (error) {}
};
