import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { LocationItemProps } from "../../types/data-types";

import { SortableLocationItem } from "./sortable-location-item";
import { DragHandle } from "./drag-handle";

import "./location-item.scss";

library.add(faTrashAlt);

const LocationItem: React.FC<LocationItemProps> = ({
  locationName,
  country,
  id,
  index,
  onDeleteLocation,
}) => {
  return (
    <SortableLocationItem index={index}>
      <li className="location-item">
        <DragHandle />
        <div className="location-item__name">
          <span className="location-item__place">{locationName}, </span>
          <span className="location-item__country"> {country}</span>
        </div>
        <button
          className="location-item__delete"
          onClick={() => onDeleteLocation(id)}
        >
          <FontAwesomeIcon icon="trash-alt" />
        </button>
      </li>
    </SortableLocationItem>
  );
};

export { LocationItem };
