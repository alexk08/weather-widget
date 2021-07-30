import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { SettingsButtonProps } from "../../types/data-types";

import "./settings-button.scss";

library.add(faCog, faTimes);

const SettingsButton: React.FC<SettingsButtonProps> = ({
  disableButton,
  onSettingsButton,
  isOpenedSettings,
}) => {
  const clazz = disableButton ? "settings-button--disable" : "";

  const button = isOpenedSettings ? (
    <FontAwesomeIcon icon="times" />
  ) : (
    <FontAwesomeIcon icon="cog" />
  );

  return (
    <button className={`settings-button ${clazz}`} onClick={onSettingsButton}>
      {button}
    </button>
  );
};

export { SettingsButton };
