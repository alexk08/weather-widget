import React, { useState } from "react";

import { AddingFormProps, ErrorState } from "../../types/data-types";

import { ERROR_MESSAGE } from "../../helpers/constants";
import { ErrorMessage } from "../error-message";
import { Spinner } from "../spinner";

import "./adding-form.scss";
import { ReactComponent as Enter } from "./enter-button.svg";

const AddingForm: React.FC<AddingFormProps> = ({
  loading,
  onAddLocation,
  error,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(target.value);
  };

  const onFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    onAddLocation(inputValue);
    setInputValue("");
  };

  const spinner = loading ? <Spinner /> : null;

  const errorMessage =
    error && error !== ErrorState.noGeoLocation ? (
      <ErrorMessage message={ERROR_MESSAGE[error]} />
    ) : null;

  return (
    <div className="adding-form">
      {spinner}
      {errorMessage}
      <form onSubmit={onFormSubmit}>
        <div className="adding-form__input form-group">
          <label htmlFor="adding-input">Add Location:</label>
          <input
            className="form-control"
            type="text"
            id="adding-input"
            placeholder="Enter location"
            onChange={onInputChange}
            value={inputValue}
          />
        </div>
        <button className="adding-form__submit" type="submit">
          <Enter />
        </button>
      </form>
    </div>
  );
};

export { AddingForm };
