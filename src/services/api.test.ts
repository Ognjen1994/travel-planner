import { searchCities } from "./api";

jest.mock("../utils/utils", () => ({
  citiesData: [
    ["Paris", 48.856614, 2.352222],
    ["Marseille", 43.296482, 5.36978],
    ["Lyon", 45.764043, 4.835659],
    ["Toulouse", 43.604652, 1.444209],
    ["Nice", 43.710173, 7.261953],
  ],
}));

describe("searchCities", () => {
  it("returns filtered cities based on keyword", async () => {
    const keyword = "mar";

    const filteredCities = await searchCities(keyword);

    expect(filteredCities).toEqual(["Marseille"]);
  });

  it("returns an empty array if no cities match the keyword", async () => {
    const keyword = "xyz";

    const filteredCities = await searchCities(keyword);

    expect(filteredCities).toEqual([]);
  });

  it('throws an error if keyword is "fail"', async () => {
    const keyword = "fail";

    await expect(searchCities(keyword)).rejects.toThrow("something went wrong");
  });
});
