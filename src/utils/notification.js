import { notification } from "antd";

export const openNotification = (type) => {
  if (type === "success") {
    notification[type]({
      message: "Successfully logged out",
    });
  } else {
    notification[type]({
      message: "Network Error",
      description: "Please, try again later",
    });
  }
};
