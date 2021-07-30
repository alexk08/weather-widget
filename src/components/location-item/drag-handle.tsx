import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortableHandle } from "react-sortable-hoc";

library.add(faBars);

const DragHandle = SortableHandle(() => (
  <button className="location-item__drag-button">
    <FontAwesomeIcon icon="bars" />
  </button>
));

export { DragHandle };
