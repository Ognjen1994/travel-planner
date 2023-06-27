# Travel Planner

Welcome to Travel Planner App! This is a single-page application (SPA) built with React and TypeScript that allows users to perform searches for routes between multiple cities, helping them plan their travel. The app consists of two pages: the search form (home page) and the search results page.

## Installation

To get started with Travel Planner App, follow the instructions below:

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the app in your browser:

   ```
   http://localhost:3000
   ```

## Usage

To use Travel Buddy App, follow these steps:

1. On the home page, you will see a search form.
2. Fill in the following details in the search form:
   City of origin: Select the city of origin from the searchable dropdown list.
   Intermediate cities: (Optional) Add and remove multiple intermediate cities for your route.
   City of destination: Select the city of destination from the searchable dropdown list.
   Date of the trip: Select a future date for your trip.
   Number of passengers: Enter the number of passengers, which should be greater than 0.
3. Click the submit button to navigate to the search results page.
4. On the search results page, you will see the details of your search, including the city of origin, intermediate cities, city of destination, date of the trip, and number of passengers.

## Scripts

In the project directory, you can run the following scripts:

```bash
npm test:unit
```

Launches the test runner in the watch mode.

```bash
npm run test:unit:coverage
```

This command is used to run unit tests with coverage reports using Jest

```bash
npm run lint
```

Runs the linter on the src directory.

```bash
npm run prettier
```

Runs the Prettier code formatter on the src directory.
