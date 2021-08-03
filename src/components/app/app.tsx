import React, { useState, useEffect, useMemo } from "react";

import { arrayMove } from "react-sortable-hoc";

import { ErrorState, WeatherDataTransform } from "../../types/data-types";

import { STORAGE } from "../../helpers/constants";
import {
  getWeatherByName,
  getWeatherByCoords,
  getWeatherByIdArr,
} from "../../helpers/data-service";
import {
  getGeolocation,
  initRequestData,
  requestDataByLocStor,
  transformForSettingsList,
  updateData,
} from "../../helpers/utils";

import { SettingsButton } from "../settings-button";
import { WeatherList } from "../weather-list";
import { SettingsMenu } from "../settings-menu";

import "./app.scss";

const App: React.FC = () => {
  const [geoLocation, setGeoLocation] = useState<GeolocationPosition | null>(
    null
  );

  const [weatherDataList, setWeatherDataList] = useState<
    WeatherDataTransform[]
  >([]);

  const [addedLocation, setAddedLocation] = useState<string>("");

  const [isOpenedSettings, setOpenedSettings] = useState<boolean>(false);

  const [disableSettings, setDisableSettings] = useState<boolean>(false);

  const [loadingState, setLoadingState] = useState<boolean>(true);

  const [errorState, setErrorState] = useState<ErrorState>(ErrorState.noError);

  const savedWeatherData: number[] = useMemo(() => {
    const savedData = localStorage.getItem(STORAGE);

    if (savedData) {
      const dataArr = JSON.parse(savedData);

      dataArr.length && setDisableSettings(true);

      return dataArr;
    }
    return [];
  }, []);

  useEffect(() => {
    if (!savedWeatherData.length) {
      getGeolocation(setGeoLocation, setErrorState, setLoadingState);
      return;
    }

    requestDataByLocStor(
      savedWeatherData,
      setWeatherDataList,
      getWeatherByIdArr,
      setLoadingState,
      setErrorState
    );
  }, [savedWeatherData]);

  useEffect(() => {
    if (geoLocation) {
      initRequestData(
        geoLocation,
        setWeatherDataList,
        getWeatherByCoords,
        setLoadingState,
        setErrorState
      );
    }
  }, [geoLocation]);

  useEffect(() => {
    if (addedLocation) {
      updateData(
        addedLocation,
        setWeatherDataList,
        setAddedLocation,
        getWeatherByName,
        setLoadingState,
        setErrorState
      );
    }
  }, [addedLocation]);

  useEffect(() => {
    const idArr: number[] = weatherDataList.map((dataItem) => dataItem.id);

    errorState ||
      savedWeatherData.length ||
      localStorage.setItem(STORAGE, JSON.stringify(idArr));
  }, [weatherDataList, errorState, savedWeatherData]);

  useEffect(() => {
    let timer: null | ReturnType<typeof setTimeout> = null;

    if (
      errorState === ErrorState.netByName ||
      errorState === ErrorState.repeatLocation
    ) {
      timer = setTimeout(() => setErrorState(ErrorState.noError), 2000);
    }

    return () => {
      timer && clearTimeout(timer);
    };
  }, [errorState]);

  const deleteLocation = (id: number): void => {
    setWeatherDataList((weatherDataList) => {
      const weatherItemIndex = weatherDataList.findIndex(
        (item) => item.id === id
      );
      return [
        ...weatherDataList.slice(0, weatherItemIndex),
        ...weatherDataList.slice(weatherItemIndex + 1),
      ];
    });
  };

  const addLocation = (value: string): void => {
    setAddedLocation(value);
  };

  const toggleSettings = (): void => {
    setOpenedSettings(() => {
      return !isOpenedSettings;
    });
  };

  const sortWeatherList = (oldIndex: number, newIndex: number): void => {
    setWeatherDataList((weatherDataList) => {
      return arrayMove(weatherDataList, oldIndex, newIndex);
    });
  };

  return (
    <div className="weather-container">
      <SettingsButton
        onSettingsButton={toggleSettings}
        disableButton={disableSettings}
        isOpenedSettings={isOpenedSettings}
      />
      <WeatherList
        weatherDataList={weatherDataList}
        loading={loadingState}
        error={errorState}
        isOpenedSettings={isOpenedSettings}
      />
      <SettingsMenu
        locationItems={transformForSettingsList(weatherDataList)}
        onDeleteLocation={deleteLocation}
        onAddLocation={addLocation}
        onSortWeatherList={sortWeatherList}
        isOpenedSettings={isOpenedSettings}
        loading={loadingState}
        error={errorState}
      />
    </div>
  );
};

export { App };
