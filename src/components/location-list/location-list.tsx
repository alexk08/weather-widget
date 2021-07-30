import React from "react";

import { LocationListProps } from "../../types/data-types";

import { LocationItem } from "../location-item";
import { SortableLocationList } from "./sortable-location-list";

import "./location-list.scss";

const LocationList: React.FC<LocationListProps> = ({
  locationItems,
  onDeleteLocation,
  onSortWeatherList,
}) => {
  const elements: JSX.Element[] = locationItems.map((item, index) => {
    const { id, locationName, country } = item;

    return (
      <LocationItem
        locationName={locationName}
        country={country}
        id={id}
        index={index}
        onDeleteLocation={onDeleteLocation}
        key={id}
      />
    );
  });
  return (
    <SortableLocationList
      onSortEnd={({ oldIndex, newIndex }) =>
        onSortWeatherList(oldIndex, newIndex)
      }
      useDragHandle
    >
      {elements}
    </SortableLocationList>
  );
};

export { LocationList };
