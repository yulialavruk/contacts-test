import axios from "axios";

const url = "https://randomuser.me/api/";

export const fetchData = (params) =>
  axios.get(url, params).then(({ data: { results } }) => results);
