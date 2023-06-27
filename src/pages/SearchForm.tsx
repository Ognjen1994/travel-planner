import "./SearchForm.scss";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";
import CloseButton from "@/components/CloseButton/CloseButton";
import DatePicker from "@/components/DatePicker/DatePicker";
import DistanceIcon from "@/components/DistanceIcon/DistanceIcon";
import InputCounter from "@/components/InputCounter/InputCounter";
import LinkButton from "@/components/LinkButton/LinkButton";
import { debounce } from "@/utils/utils";

import Select from "../components/Select/Select";
import { searchCities } from "../services/api";

interface FormErrors {
  origin: string;
  destinations: string[];
  date: string;
  passengers: string;
}

interface FormData {
  origin: string;
  destinations: string[];
  destinationInputValues: string[];
  date: Date;
  passengers: number;
}

type OptionType = {
  value: string;
  label: string;
};

const SearchForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    origin: "",
    destinations: [""],
    destinationInputValues: [],
    date: new Date(),
    passengers: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState<unknown[]>([]);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({
    origin: "",
    destinations: [""],
    date: "",
    passengers: "",
  });

  const handleCityChange = (
    selectedCity: OptionType,
    field: string,
    index?: number
  ) => {
    const city = selectedCity ? selectedCity.value : "";
    if (field === "origin") {
      setFormData(prevData => ({ ...prevData, [field]: city }));
    } else if (field.startsWith("destination-") && typeof index === "number") {
      const newDestinations = [...formData.destinations];
      newDestinations[index] = city;
      setFormData(prevData => ({ ...prevData, destinations: newDestinations }));
    }
  };

  const handleAddDestination = (e: React.FormEvent) => {
    e.preventDefault();
    const newDestinations: string[] = [...formData.destinations];
    const newDestinationInputValues: string[] = [
      ...formData.destinationInputValues,
    ];
    newDestinations.push("");
    newDestinationInputValues.push("");
    setFormData(prevData => ({
      ...prevData,
      destinations: newDestinations,
      destinationInputValues: newDestinationInputValues,
    }));
  };

  const handleRemoveDestination = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    const newDestinations = [...formData.destinations];
    const newDestinationInputValues = [...formData.destinationInputValues];
    newDestinations.splice(index, 1);
    newDestinationInputValues.splice(index, 1);
    setFormData(prevData => ({
      ...prevData,
      destinations: newDestinations,
      destinationInputValues: newDestinationInputValues,
    }));
  };

  const validateForm = () => {
    const errors: FormErrors = {
      origin: "",
      destinations: [],
      date: "",
      passengers: "",
    };
    let hasErrors = false;

    if (!formData.origin) {
      errors.origin = "City of origin is required.";
      hasErrors = true;
    }

    const destinationErrors: string[] = [];
    formData.destinations.forEach((destination, index) => {
      if (!destination) {
        destinationErrors[index] = "City of destination is required.";
        hasErrors = true;
      }
    });

    if (destinationErrors.length > 0) {
      errors.destinations = destinationErrors;
    }

    if (!formData.date) {
      errors.date = "Date of the trip is required.";
      hasErrors = true;
    } else {
      const tripDate = new Date(formData.date);
      const currentDate = new Date();
      if (tripDate <= currentDate) {
        errors.date = "Date of the trip must be in the future.";
        hasErrors = true;
      }
    }

    if (formData.passengers <= 0) {
      errors.passengers = "Value must be greater than 0.";
      hasErrors = true;
    }

    setFormErrors(errors);
    return !hasErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { origin, destinations, date, passengers } = formData;
    const queryParams = new URLSearchParams({
      origin,
      destinations: destinations.join(","),
      date: date.toString(),
      passengers: passengers.toString(),
    });
    navigate(`/search-results?${queryParams}`);
  };

  const loadCities = debounce((inputValue: string) => {
    if (inputValue === "") {
      setCityOptions([]);
      return;
    }
    setIsLoading(true);
    setError("");
    searchCities(inputValue)
      .then((filteredCities: string[]) => {
        setCityOptions(
          filteredCities.map((city: string) => ({
            value: city,
            label: city,
          }))
        );
      })
      .catch((err: Error) => {
        console.log(err);
        setError("An error occurred while fetching cities. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 300);

  return (
    <div className="search-form">
      <form onSubmit={handleSubmit}>
        <div className="search-form__container">
          <div className="search-form__content">
            <div className="search-form__content__distance">
              <DistanceIcon
                destinationsNum={formData.destinations.length}
                className="search-form__content__distance__icon"
              />
            </div>
            <div className="search-form__content__destinations">
              <div>
                <label htmlFor="origin">City of origin</label>
                <Select
                  isSearchable
                  isClearable
                  id="origin"
                  value={
                    formData.origin
                      ? { value: formData.origin, label: formData.origin }
                      : null
                  }
                  options={cityOptions}
                  placeholder="City of origin"
                  isLoading={isLoading}
                  className={formErrors.origin ? "error" : ""}
                  onChange={(selectedCity: OptionType) =>
                    handleCityChange(selectedCity, "origin")
                  }
                  onInputChange={(inputValue: string) => {
                    loadCities(inputValue);
                  }}
                />
                {formErrors.origin && (
                  <div className="error-message--color">
                    {formErrors.origin}
                  </div>
                )}
              </div>
              {formData.destinations.map((destination, index) => (
                <div
                  key={destination + index}
                  className="search-form__content__input"
                >
                  <label htmlFor={`destination-${index}`}>
                    City of destination
                  </label>
                  <Select
                    isClearable
                    isSearchable
                    id={`destination-${index}`}
                    value={
                      destination
                        ? { value: destination, label: destination }
                        : null
                    }
                    options={cityOptions}
                    placeholder="City of destination"
                    isLoading={isLoading}
                    className={
                      formErrors.destinations && formErrors.destinations[index]
                        ? "error"
                        : ""
                    }
                    onChange={(selectedCity: OptionType) =>
                      handleCityChange(
                        selectedCity,
                        `destination-${index}`,
                        index
                      )
                    }
                    onInputChange={(inputValue: string) => {
                      loadCities(inputValue);
                    }}
                  />
                  {formErrors.destinations &&
                    formErrors.destinations[index] && (
                      <div className="error-message--color">
                        {formErrors.destinations[index]}
                      </div>
                    )}
                  {index > 0 && (
                    <CloseButton
                      className="search-form__content__remove-btn"
                      onClick={e => handleRemoveDestination(e, index)}
                    />
                  )}
                </div>
              ))}
              <LinkButton
                className="search-form__content__add-destination"
                onClick={handleAddDestination}
              >
                <span className="search-form__content__add-destination__icon">
                  +
                </span>
                Add Destination
              </LinkButton>
            </div>
          </div>
          <div className="search-form__right-section">
            <div>
              <label htmlFor="passengers">Passengers</label>
              <InputCounter
                className={`search-form__right-section__input__passenger ${
                  formErrors.passengers ? "error" : ""
                }`}
                value={formData.passengers}
                onChange={(val: number) => {
                  setFormData(prevData => ({
                    ...prevData,
                    passengers: val,
                  }));
                }}
              />
              {formErrors.passengers && (
                <div className="error-message--color">
                  {formErrors.passengers}
                </div>
              )}
            </div>
            <div className="search-form__right-section__input">
              <label htmlFor="date">Date</label>
              <DatePicker
                id="date"
                className={`search-form__right-section__input__date ${
                  formErrors.date ? "error" : ""
                }`}
                value={formData.date}
                onChange={(val: Date) => {
                  setFormData(prevData => ({
                    ...prevData,
                    date: val,
                  }));
                }}
              />
              {formErrors.date && (
                <div className="error-message--color">{formErrors.date}</div>
              )}
            </div>
          </div>
        </div>
        <Button type="submit" className="search-form__submit">
          Submit
        </Button>
      </form>

      {error && <div className="search-form__error-message">{error}</div>}
    </div>
  );
};

export default SearchForm;
