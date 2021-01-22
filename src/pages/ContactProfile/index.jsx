import { useLocation, useHistory } from "react-router-dom";
import { Button } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import { Profile } from "../../components/Profile";

export const ContactProfile = () => {
  let history = useHistory();
  let location = useLocation();

  const { propsContact } = location;
  return (
    <div className="profile">
      <h1 className="profile__title">Contact View</h1>
      <Profile contact={propsContact} />
      <div className="text-center">
        <Button type="primary" onClick={() => history.push("/contacts")}>
          <DoubleLeftOutlined />
          Back
        </Button>
      </div>
    </div>
  );
};
