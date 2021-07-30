import React from "react";

import { ErrorMessageProps, ErrorState } from "../../types/data-types";

import { ERROR_MESSAGE } from "../../helpers/constants";

import "./error-message.scss";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const warning =
    message === ERROR_MESSAGE[ErrorState.noGeoLocation] ||
    message === ERROR_MESSAGE[ErrorState.repeatLocation]
      ? "error-message--warning"
      : "";

  return <div className={`error-message ${warning}`}>{message}</div>;
};

export { ErrorMessage };
