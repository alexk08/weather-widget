const ERROR_MESSAGE = [
  "",
  "Something went wrong",
  "Something went wrong",
  "Please add location in the settings",
  "This location has already been",
];

const URL_REQUEST = {
  PREFIX: "http://api.openweathermap.org/data/2.5/weather?",
  SUFFIX: "&units=metric&APPID=650926f8530286968de60a6a08b0c2d5",
};

const URL_ICON = {
  PREFIX: "http://openweathermap.org/img/wn/",
  SUFFIX: "@2x.png",
};

const STORAGE = "weather";

const SELECTOR = ".weather-widget";

export { ERROR_MESSAGE, URL_REQUEST, URL_ICON, STORAGE, SELECTOR };
