import { citiesData } from "../utils/utils";

export const searchCities = async (keyword: string): Promise<string[]> => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    if (keyword === "fail") throw new Error("something went wrong");
    const filteredCities = citiesData
      .filter(city => city[0].toLowerCase().includes(keyword.toLowerCase()))
      .map(city => city[0]);

    return filteredCities;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};
