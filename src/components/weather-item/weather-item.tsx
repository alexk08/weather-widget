import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLocationArrow,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { WeatherItemProps } from "../../types/data-types";

import { URL_ICON } from "../../helpers/constants";

import "./weather-item.scss";
import iconGauge from "./icon-gauge.png";

const WeatherItem: React.FC<WeatherItemProps> = ({
  locationName,
  icon,
  temperature,
  description,
  windDirection,
  windDirectionDeg,
  windType,
  windSpeed,
  pressure,
  humidity,
  dewPoint,
  visibility,
  country,
  feelsLike,
}) => {
  library.add(faLongArrowAltUp, faLocationArrow);

  return (
    <li className="weather-item">
      <h6 className="weather-item__location">
        <span>{locationName}, </span>
        <span>{country}</span>
      </h6>
      <div className="weather-item__main-info">
        <div className="weather-item__icon">
          <img
            src={`${URL_ICON.PREFIX}${icon}${URL_ICON.SUFFIX}`}
            alt="weather-icon"
          />
        </div>
        <div className="weather-item__temperature">{temperature}&#176;C</div>
      </div>
      <div className="weather-item__description">
        <span className="weather-item__feels">
          Feels like {feelsLike}&#176;C.{" "}
        </span>
        <span className="weather-item__description">{description}. </span>
        <span className="weather-item__wind-type">{windType}</span>
      </div>
      <div className="weather-item__other-info">
        <div className="weather-item__row">
          <div className="weather-item__wind">
            <FontAwesomeIcon
              transform={{ rotate: windDirectionDeg }}
              icon="long-arrow-alt-up"
            />
            <span className="weather-item__wind-speed"> {windSpeed}m/s </span>
            <span className="weather-item__wind-direction">
              {windDirection}
            </span>
          </div>
          <div className="weather-item__pressure">
            <img src={iconGauge} alt="icon-gauge" />
            <span className="weather-item__pressure">{pressure}hPa</span>
          </div>
        </div>
        <div className="weather-item__row">
          <div className="weather-item__humidity">Humidity: {humidity}%</div>
          <div className="weather-item__dew">Dew point: {dewPoint}&#176;C</div>
        </div>
        <div className="weather-item__visibility">
          Visibility: {visibility}km
        </div>
      </div>
    </li>
  );
};

export { WeatherItem };
