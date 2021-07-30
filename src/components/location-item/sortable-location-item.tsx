import { SortableElement } from "react-sortable-hoc";
import { SortableLocationItemProps } from "../../types/data-types";

const SortableLocationItem = SortableElement(
  ({ children }: SortableLocationItemProps) => <>{children}</>
);

export { SortableLocationItem };
