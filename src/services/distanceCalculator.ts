import { citiesData } from "../utils/utils";

export const calculateDistance = async (
  origin: string,
  destinations: string[]
): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate distance calculation failure for Dijon city
  if (origin === "Dijon" || destinations.includes("Dijon")) {
    throw new Error("Error calculating distance.");
  }

  let totalDistance = 0;

  const distances = calculateDistances([origin, ...destinations]);

  distances.forEach(el => (totalDistance += el));

  return Number(totalDistance.toFixed(2));
};

export const calculateDistances = (cities: string[]): number[] => {
  const distances: number[] = [];

  for (let i = 0; i < cities.length - 1; i++) {
    const originCoordinates = getCoordinates(cities[i]);
    const destinationCoordinates = getCoordinates(cities[i + 1]);
    console.log("Destionacione ", destinationCoordinates);
    const distance = calculateHaversineDistance(
      originCoordinates,
      destinationCoordinates
    );

    if (isNaN(distance)) {
      throw new Error("Error calculating distance.");
    }
    distances.push(distance);
  }

  return distances;
};

const getCoordinates = (city: string): [number, number] => {
  const cityData = citiesData.find(data => data[0] === city);
  if (cityData) {
    return [cityData[1], cityData[2]];
  }
  throw new Error("City coordinates not found.");
};

const calculateHaversineDistance = (
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
): number => {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const earthRadius = 6371; // in kilometers

  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return Number(distance.toFixed(2));
};
