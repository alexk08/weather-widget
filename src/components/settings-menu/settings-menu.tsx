import React from "react";

import { SettingsProps } from "../../types/data-types";

import { AddingForm } from "../adding-input";
import { LocationList } from "../location-list";

import "./settings-menu.scss";

const SettingsMenu: React.FC<SettingsProps> = ({
  locationItems,
  isOpenedSettings,
  loading,
  onDeleteLocation,
  onAddLocation,
  onSortWeatherList,
  error,
}) => {
  const clazz = isOpenedSettings ? "settings-menu--opened" : "";

  return (
    <div className={`settings-menu ${clazz}`}>
      <h5 className="settings-menu__title">Settings</h5>
      <LocationList
        locationItems={locationItems}
        onDeleteLocation={onDeleteLocation}
        onSortWeatherList={onSortWeatherList}
      />
      <AddingForm
        onAddLocation={onAddLocation}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export { SettingsMenu };
