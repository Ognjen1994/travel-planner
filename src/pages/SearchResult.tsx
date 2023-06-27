import "./SearchResult.scss";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "@/components/Button/Button";
import ChatBubble from "@/components/ChatBubble/ChatBubble";
import DistanceIcon from "@/components/DistanceIcon/DistanceIcon";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Spinner from "@/components/Spinner/Spinner";

import {
  calculateDistance,
  calculateDistances,
} from "../services/distanceCalculator";

const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const origin = searchParams.get("origin") || "";
  const destinations = searchParams.get("destinations")!.split(",");
  const date = searchParams.get("date") || "";
  const passengers = Number(searchParams.get("passengers")) || 0;
  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);
  const [distances, setDistances] = useState<number[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateDistanceApi = async () => {
      setLoading(true);
      try {
        const calculatedDistance = await calculateDistance(
          origin,
          destinations
        );
        setDistance(calculatedDistance);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Error calculating distance.");
        setLoading(false);
      }
    };
    calculateDistanceApi();
    const distances = calculateDistances([origin, ...destinations]);
    setDistances(distances);
  }, []);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = newDate.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  if (error) {
    return <ErrorMessage message={error} onClick={() => navigate(`/`)} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="search-result">
      <div className="search-result__distance">
        <div className="search-result__distance__km">
          {destinations.map((destination, index) => (
            <React.Fragment key={index}>
              <ChatBubble className="search-result__distance__km__bubble">
                {distances ? `${distances[index]} km` : null}
              </ChatBubble>
            </React.Fragment>
          ))}
        </div>
        <div className="search-result__distance__container">
          <DistanceIcon destinationsNum={destinations.length} dots={3} />
        </div>
        <div className="search-result__distance__places">
          <div>{origin}</div>
          {destinations.map((destination, index) => (
            <div
              key={index}
              className="search-result__distance__places__destinations"
            >
              {destination}
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : distance !== null ? (
        <p>
          <span style={{ color: "var(--primary-color)" }}>{distance}</span> km
          is the total distance
        </p>
      ) : (
        <p>Error calculating distance.</p>
      )}
      <p>
        <span style={{ color: "var(--primary-color)" }}>{passengers}</span>{" "}
        passengers
      </p>
      <p style={{ color: "var(--primary-color)" }}>{formatDate(date)}</p>

      <Button
        type="button"
        className="search-result__back-button"
        onClick={() => navigate(`/`)}
      >
        Back
      </Button>
    </div>
  );
};

export default SearchResult;
