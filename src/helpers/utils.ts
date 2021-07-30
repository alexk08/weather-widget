import {
  ErrorState,
  SettingsLocationItemProps,
  WeatherDataApi,
  WeatherDataTransform,
} from "../types/data-types";

const transformForSettingsList = (
  weatherList: WeatherDataTransform[]
): SettingsLocationItemProps[] => {
  const locationList = weatherList.map((item) => {
    const { country, locationName, id } = item;

    return { country, locationName, id };
  });

  return locationList;
};

const transformData = (data: WeatherDataApi): WeatherDataTransform => {
  return {
    description: _firstLetterToUpperCase(data.weather[0].description),
    icon: data.weather[0].icon,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    visibility: _transformVisibility(data.visibility),
    windDirectionDeg: data.wind.deg,
    windSpeed: _transformWindSpeed(data.wind.speed),
    windDirection: _transformWindDirection(data.wind.deg),
    windType: _calculateWindName(data.wind.speed),
    locationName: data.name,
    country: data.sys.country,
    dewPoint: _calculateDewPoint(data.main.humidity, data.main.temp),
    id: data.id,
  };
};

const _transformWindSpeed = (speed: number): string => {
  const roundedSpeed: number = Math.round(speed * 10) / 10;

  return roundedSpeed.toFixed(1);
};

const _calculateDewPoint = (humidity: number, temperature: number): number => {
  const dewPoint: number = Math.round(temperature - (100 - humidity) / 5);

  return dewPoint;
};

const _transformWindDirection = (deg: number): string => {
  let windDirection: string = "";

  switch (true) {
    case deg > 348.75 || deg < 11.25:
      windDirection = "N";
      break;
    case deg > 11.25 && deg < 33.75:
      windDirection = "NNE";
      break;
    case deg > 33.75 && deg < 56.25:
      windDirection = "NE";
      break;
    case deg > 56.25 && deg < 78.75:
      windDirection = "ENE";
      break;
    case deg > 78.75 && deg < 101.25:
      windDirection = "E";
      break;
    case deg > 101.25 && deg < 123.75:
      windDirection = "ESE";
      break;
    case deg > 123.75 && deg < 146.25:
      windDirection = "SE";
      break;
    case deg > 146.25 && deg < 168.75:
      windDirection = "SSE";
      break;
    case deg > 168.75 && deg < 191.25:
      windDirection = "S";
      break;
    case deg > 191.25 && deg < 213.75:
      windDirection = "SSW";
      break;
    case deg > 213.75 && deg < 236.25:
      windDirection = "SW";
      break;
    case deg > 236.25 && deg < 258.75:
      windDirection = "WSW";
      break;
    case deg > 258.75 && deg < 281.25:
      windDirection = "W";
      break;
    case deg > 281.25 && deg < 303.75:
      windDirection = "WNW";
      break;
    case deg > 303.75 && deg < 326.25:
      windDirection = "NW";
      break;
    case deg > 326.25 && deg < 348.75:
      windDirection = "NNW";
      break;
  }

  return windDirection;
};

const _calculateWindName = (speed: number): string => {
  const speedInKmh: number = speed * 3.6;

  let windName: string = "";

  switch (true) {
    case speedInKmh < 2:
      windName = "Calm";
      break;
    case speedInKmh >= 2 && speedInKmh < 6:
      windName = "Light air";
      break;
    case speedInKmh >= 6 && speedInKmh < 11:
      windName = "Light breeze";
      break;
    case speedInKmh >= 11 && speedInKmh < 20:
      windName = "Gentle breeze";
      break;
    case speedInKmh >= 20 && speedInKmh < 30:
      windName = "Moderate breeze";
      break;
    case speedInKmh >= 30 && speedInKmh < 40:
      windName = "Fresh breeze";
      break;
    case speedInKmh >= 40 && speedInKmh < 50:
      windName = "Strong breeze";
      break;
    case speedInKmh >= 50 && speedInKmh < 61:
      windName = "Moderate gale";
      break;
    case speedInKmh >= 61 && speedInKmh < 75:
      windName = "Fresh gale";
      break;
    case speedInKmh >= 75 && speedInKmh < 88:
      windName = "Strong gale";
      break;
    case speedInKmh >= 88 && speedInKmh < 103:
      windName = "Whole gale";
      break;
    case speedInKmh >= 103 && speedInKmh < 118:
      windName = "Storm";
      break;
    case speedInKmh >= 118:
      windName = "Hurricane";
      break;
  }

  return windName;
};

const _firstLetterToUpperCase = (str: string): string => {
  const firstUpperLetter: string = str[0].toUpperCase();

  return `${firstUpperLetter}${str.slice(1)}`;
};

const _transformVisibility = (visibility: number): string => {
  return (Math.round(visibility / 100) / 10).toFixed(1);
};

const updateData = (
  location: string,
  setData: (value: React.SetStateAction<WeatherDataTransform[]>) => void,
  setLocation: (value: React.SetStateAction<string>) => void,
  getWeather: (location: string) => Promise<WeatherDataTransform>,
  setLoading: (loading: React.SetStateAction<boolean>) => void,
  setError: (error: React.SetStateAction<ErrorState>) => void
): void => {
  const onDataLoaded = (locationData: WeatherDataTransform) => {
    setData((dataList) => {
      const wasAlreadyAdded =
        dataList.findIndex((item) => locationData.id === item.id) !== -1;

      if (wasAlreadyAdded) {
        setLocation("");
        setError(ErrorState.repeatLocation);

        return dataList;
      }

      return [...dataList, locationData];
    });
    setLoading(false);

    setLocation("");
  };

  const onError = () => {
    setError(ErrorState.netByName);
    setLoading(false);
    setLocation("");
  };

  setLoading(true);
  setError(ErrorState.noError);
  getWeather(location).then(onDataLoaded).catch(onError);
};

const requestDataByLocStor = (
  idArr: number[],
  setData: (value: React.SetStateAction<WeatherDataTransform[]>) => void,
  getWeather: (locationIdArr: number[]) => Promise<WeatherDataTransform[]>,
  setLoading: (loading: React.SetStateAction<boolean>) => void,
  setError: (error: React.SetStateAction<ErrorState>) => void
): void => {
  const onDataLoaded = (data: WeatherDataTransform[]): void => {
    setData((weatherDataList) => {
      const isOnlyRemount = weatherDataList.filter(
        (item, idx) => idArr[idx] === item.id
      ).length;

      if (isOnlyRemount) {
        return weatherDataList;
      }

      return [...weatherDataList, ...data];
    });
    setLoading(false);
  };

  const onError = () => {
    setError(ErrorState.net);
    setLoading(false);
  };

  setLoading(true);
  setError(ErrorState.noError);
  getWeather(idArr).then(onDataLoaded).catch(onError);
};

const initRequestData = (
  position: GeolocationPosition,
  setData: (value: React.SetStateAction<WeatherDataTransform[]>) => void,
  getWeather: (position: GeolocationPosition) => Promise<WeatherDataTransform>,
  setLoading: (loading: React.SetStateAction<boolean>) => void,
  setError: (error: React.SetStateAction<ErrorState>) => void
): void => {
  const onDataLoaded = (locationData: WeatherDataTransform) => {
    setData((dataList) => {
      return [...dataList, locationData];
    });
    setLoading(false);
  };

  const onError = () => {
    setError(ErrorState.net);
    setLoading(false);
  };

  setError(ErrorState.noError);
  getWeather(position).then(onDataLoaded).catch(onError);
};

const getGeolocation = (
  setGeoLocation: React.Dispatch<
    React.SetStateAction<GeolocationPosition | null>
  >,
  setError: (error: React.SetStateAction<ErrorState>) => void,
  setLoading: (loading: React.SetStateAction<boolean>) => void
) => {
  const onSuccess = (position: GeolocationPosition) => {
    setGeoLocation(position);
  };

  const onError = () => {
    setError(ErrorState.noGeoLocation);
    setLoading(false);
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
  } else {
    onError();
  }
};

export {
  transformForSettingsList,
  transformData,
  updateData,
  requestDataByLocStor,
  initRequestData,
  getGeolocation,
};
