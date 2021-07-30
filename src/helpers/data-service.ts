import { WeatherDataApi, WeatherDataTransform } from "../types/data-types";
import { URL_REQUEST } from "./constants";
import { transformData } from "./utils";

const getWeatherByName = async (
  location: string
): Promise<WeatherDataTransform> => {
  const url: string = `${URL_REQUEST.PREFIX}q=${location}${URL_REQUEST.SUFFIX}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Received HTTP Error: ${response.status}`);
  }

  const body: WeatherDataApi = await response.json();
  const result: WeatherDataTransform = transformData(body);

  return result;
};

const getWeatherByCoords = async (
  position: GeolocationPosition
): Promise<WeatherDataTransform> => {
  const {
    coords: { latitude, longitude },
  } = position;

  const lon = longitude.toFixed(4);
  const lat = latitude.toFixed(4);

  const url: string = `${URL_REQUEST.PREFIX}lat=${lat}&lon=${lon}${URL_REQUEST.SUFFIX}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Received HTTP Error: ${response.status}`);
  }

  const body: WeatherDataApi = await response.json();
  const result: WeatherDataTransform = transformData(body);

  return result;
};

const getWeatherByIdArr = async (
  locationIdArr: number[]
): Promise<WeatherDataTransform[]> => {
  const promiseArr = locationIdArr.map((id, idx) =>
    fetch(`${URL_REQUEST.PREFIX}id=${id}${URL_REQUEST.SUFFIX}`)
  );
  const responses = await Promise.all(promiseArr);

  const idxBadRes = responses.findIndex((res) => !res.ok);

  if (idxBadRes !== -1) {
    throw new Error(`Received HTTP Error: ${responses[idxBadRes].status}`);
  }

  const bodies: WeatherDataApi[] = await Promise.all(
    responses.map((res) => res.json())
  );
  const results = bodies.map((body) => transformData(body));

  return results;
};

export { getWeatherByName, getWeatherByCoords, getWeatherByIdArr };
