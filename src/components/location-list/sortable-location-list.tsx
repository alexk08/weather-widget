import { SortableContainer } from "react-sortable-hoc";
import { SortableLocationListProps } from "../../types/data-types";

const SortableLocationList = SortableContainer(
  ({ children }: SortableLocationListProps) => {
    return <ul className="location-list">{children}</ul>;
  }
);

export { SortableLocationList };
