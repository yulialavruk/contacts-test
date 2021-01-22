import React from "react";
import { Button } from "antd";

export const ErrorPage = () => {
  return (
    <div className="error">
      <div className="error__code">404</div>
      <div className="error__message">Requested page not found!</div>
      <div className="error__back-button">
        <Button type="primary" size="large">
          Back to home
        </Button>
      </div>
    </div>
  );
};
