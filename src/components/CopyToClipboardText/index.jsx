import PropTypes from "prop-types";
import { Typography, Space } from "antd";
const { Paragraph } = Typography;

export const CopyToClipboardText = ({ children, text }) => (
  <>
    <Space align="baseline">
      <Paragraph copyable={{ text }} />
      {children}
    </Space>
  </>
);

CopyToClipboardText.propTypes = {
  text: PropTypes.string.isRequired,
};
