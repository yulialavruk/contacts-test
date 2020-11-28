import { useState, useEffect } from "react";
import { DATA_VIEW_MODES } from "./constants";

const getInitialDataViewMode = () =>
  localStorage.getItem("dataViewMode") || DATA_VIEW_MODES.TABLE;

export const useDataViewMode = () => {
  const [dataViewMode, setDataViewMode] = useState(getInitialDataViewMode);

  useEffect(() => localStorage.setItem("dataViewMode", dataViewMode), [
    dataViewMode,
  ]);

  return [dataViewMode, setDataViewMode];
};
