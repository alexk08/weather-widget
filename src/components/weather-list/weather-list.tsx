import React from "react";

import { ErrorState, WeatherListProps } from "../../types/data-types";

import { ERROR_MESSAGE } from "../../helpers/constants";

import { ErrorMessage } from "../error-message";
import { Spinner } from "../spinner";
import { WeatherItem } from "../weather-item";

import "./weather-list.scss";

const WeatherList: React.FC<WeatherListProps> = ({
  weatherDataList,
  loading,
  error,
  isOpenedSettings,
}) => {
  const weatherItems = weatherDataList.map((weatherDataItem) => {
    const { id, ...weatherItemProps } = weatherDataItem;

    return <WeatherItem key={id} {...weatherItemProps} />;
  });

  const spinner = loading ? <Spinner /> : null;

  const errorMessage =
    error && error !== ErrorState.repeatLocation ? (
      <ErrorMessage message={ERROR_MESSAGE[error]} />
    ) : null;

  const clazz = isOpenedSettings ? "weather-list--closed" : "";

  return (
    <ul className={`weather-list ${clazz}`}>
      {weatherItems}
      {errorMessage}
      {spinner}
    </ul>
  );
};

export { WeatherList };
