import { ReactElement, ReactNode } from "react";

export interface WeatherDataTransform {
  description: string;
  icon: string;
  temperature: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  visibility: string;
  windDirectionDeg: number;
  windSpeed: string;
  windDirection: string;
  windType: string;
  locationName: string;
  country: string;
  dewPoint: number;
  id: number;
}

export interface WeatherDataApi {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherListProps {
  weatherDataList: WeatherDataTransform[];
  loading: boolean;
  error: ErrorState;
  isOpenedSettings: boolean;
}

export interface WeatherItemProps {
  description: string;
  icon: string;
  temperature: number;
  feelsLike: number;
  pressure: number;
  humidity: number;
  visibility: string;
  windDirectionDeg: number;
  windSpeed: string;
  windDirection: string;
  windType: string;
  locationName: string;
  country: string;
  dewPoint: number;
}

export interface LocationItemProps {
  locationName: string;
  country: string;
  id: number;
  index: number;
  onDeleteLocation: (id: number) => void;
}

export interface LocationListProps {
  locationItems: SettingsLocationItemProps[];
  onDeleteLocation: (id: number) => void;
  onSortWeatherList: (oldIdx: number, newIdx: number) => void;
}

export interface SettingsLocationItemProps {
  locationName: string;
  country: string;
  id: number;
}

export interface SettingsProps {
  locationItems: SettingsLocationItemProps[];
  isOpenedSettings: boolean;
  loading: boolean;
  onDeleteLocation: (id: number) => void;
  onAddLocation: (value: string) => void;
  onSortWeatherList: (oldIdx: number, newIdx: number) => void;
  error: ErrorState;
}

export interface AddingFormProps {
  loading: boolean;
  onAddLocation: (value: string) => void;
  error: ErrorState;
}

export interface SortableLocationListProps {
  children: (ReactElement & ReactNode)[];
}

export interface SortableLocationItemProps {
  children: ReactElement & ReactNode;
}

export interface SettingsButtonProps {
  disableButton: boolean;
  onSettingsButton: () => void;
  isOpenedSettings: boolean;
}

export enum ErrorState {
  noError,
  net,
  netByName,
  noGeoLocation,
  repeatLocation,
}

export interface ErrorMessageProps {
  message: string;
}
