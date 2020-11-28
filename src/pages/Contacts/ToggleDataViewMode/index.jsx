import { useCallback } from "react";
import PropTypes from "prop-types";
import { Radio, Tooltip } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { DATA_VIEW_MODES } from "../constants";

export const ToggleDataViewMode = ({ dataViewMode, setDataViewMode }) => {
  const handleChangeViewMode = useCallback(
    (e) => setDataViewMode(e.target.value),
    [setDataViewMode]
  );

  return (
    <Radio.Group value={dataViewMode} onChange={handleChangeViewMode}>
      <Tooltip title={DATA_VIEW_MODES.GRID}>
        <Radio.Button value={DATA_VIEW_MODES.GRID}>
          <AppstoreOutlined />
        </Radio.Button>
      </Tooltip>
      <Tooltip title={DATA_VIEW_MODES.TABLE}>
        <Radio.Button value={DATA_VIEW_MODES.TABLE}>
          <UnorderedListOutlined />
        </Radio.Button>
      </Tooltip>
    </Radio.Group>
  );
};

ToggleDataViewMode.propTypes = {
  dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.TABLE, DATA_VIEW_MODES.GRID])
    .isRequired,
  setDataViewMode: PropTypes.func.isRequired,
};
