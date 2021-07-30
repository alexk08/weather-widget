import React from "react";
import ReactDOM from "react-dom";

import { App } from "./components/app";
import { SELECTOR } from "./helpers/constants";

import "./index.scss";

const onLoaded = () => {  
  const elements = document.querySelectorAll(SELECTOR);

  elements.forEach((el) => {
    ReactDOM.render(<App />, el);
  });
}

document.addEventListener("DOMContentLoaded", onLoaded);
