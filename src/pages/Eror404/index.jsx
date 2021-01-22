import React from "react";
import { Button } from "antd";

export const ErrorPage = () => {
  return (
    <div class="error">
      <div class="error__code">404</div>
      <div class="error__message">Requested page not found!</div>
      <div class="error__back-button">
        <Button type="primary" size="large">
          Back to home
        </Button>
      </div>
    </div>
  );
};
