import { Popover, Button } from "antd";
import { Link } from "react-router-dom";
import { openNotification } from "../notification";

export const UserMenu = ({ user: { name, picture }, setUser }) => {
  const onLogout = () => {
    openNotification("success");
    setUser(null);
    localStorage.removeItem("seed_key");
  };

  return (
    <Popover
      content={
        <div>
          <div>
            <Link to="/profile">Profile</Link>
          </div>
          <div>
            <Link to="/" onClick={onLogout}>
              Logout
            </Link>
          </div>
        </div>
      }
    >
      <Button type="link">
        {`Hello! ${name.title}. ${name.first} ${name.last}`}
      </Button>
      <img src={picture.thumbnail} alt="" className="user-icon" />
    </Popover>
  );
};
