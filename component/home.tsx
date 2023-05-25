import * as React from "react";
import { WeightData } from "../pages";
import Link from "next/link";

export interface IAppProps {
  weightData: WeightData[];
  userData: any;
}

export default function Home({ weightData, userData }: IAppProps) {
  // Function to convert date string to JavaScript Date object
  function parseDate(dateString: string): Date {
    const parts = dateString.split("/");
    return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
  }

  // Calculate the average weight for a given time period
  function calculateAverageWeight(data: WeightData[], startDate: Date, endDate: Date): number {
    const filteredData = data.filter((item) => {
      const itemDate = parseDate(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });

    if (filteredData.length === 0) {
      return 0; // No data available for the given period
    }

    const sum = filteredData.reduce((total, item) => total + parseFloat(item.weight), 0);
    const average = sum / filteredData.length;
    return parseFloat(average.toFixed(1));
  }

  // Convert the weight values in the array from strings to numbers
  const convertedWeightData: any = weightData.map((item: any) => ({
    date: item.date,
    weight: parseFloat(item.weight),
  }));

  let renderCorrectArrow = (weight: any) => {
    let weightCheck = weight;
    if (typeof weight === "string") weightCheck = Number(weight);

    if (weightCheck < 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 self-center text-green-500 mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
        </svg>
      );
    }
    if (weightCheck > 1) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 self-center text-red-500 mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
        </svg>
      );
    }
  };

  let getWhatLeftToGoal = (): number => {
    let goalWeightToNumber = Number(userData.goalWeight);
    let currentWeightToNumber = Number(weightData[0].weight);

    return +(goalWeightToNumber - currentWeightToNumber).toFixed(1);
  };

  // Calculate the average weight for the last week
  const currentDate = new Date();
  const lastWeekStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7);
  const lastWeekAverage = calculateAverageWeight(convertedWeightData, lastWeekStartDate, currentDate);
  const lastWeekDifference = Number((lastWeekAverage - userData.initialWeight).toFixed(1));

  // Calculate the average weight for the last month
  const lastMonthStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
  const lastMonthAverage = calculateAverageWeight(convertedWeightData, lastMonthStartDate, currentDate);
  const lastMonthDifference = Number((lastMonthAverage - userData.initialWeight).toFixed(1));

  // Calculate the average weight for the last 6 months
  const lastSixMonthsStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
  const lastSixMonthsAverage = calculateAverageWeight(convertedWeightData, lastSixMonthsStartDate, currentDate);
  const lastSixMonthsDifference = Number((lastSixMonthsAverage - userData.initialWeight).toFixed(1));

  // Calculate the average weight for the last year
  const lastYearStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
  const lastYearAverage = calculateAverageWeight(convertedWeightData, lastYearStartDate, currentDate);
  const lastYearDifference = Number((lastYearAverage - userData.initialWeight).toFixed(1));

  function calculateProgress(initialWeight: any, goalWeight: any, currentWeight: any) {
    const weightDifference = Math.abs(initialWeight - goalWeight);
    const progress = ((weightDifference - Math.abs(currentWeight - goalWeight)) / weightDifference) * 100;
    return Math.max(0, Math.min(100, progress)); // Ensure the progress is between 0 and 100
  }
  console.log("userData:", weightData);
  return (
    <div className="bg-white h-[91%] overflow-y-auto flex flex-col items-center py-4 px-8">
      <button
        onClick={() => {
          localStorage.removeItem("weightData");
          localStorage.removeItem("weightData");
        }}
      >
        delete
      </button>
      <Link href={"/settings"} className="self-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mb-20 mt-6 text-gray-500 "
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </Link>

      <h1 className=" text-3xl text-gray-500 ">My weight progress</h1>
      <div className="w-full flex flex-col items-center py-8 space-y-4">
        <div className="flex flex-col space-y-2 items-center">
          <h1 className="text-6xl font-bold text-gray-600">{weightData[0] && weightData[0].weight}</h1>
          <p>{weightData[0] && weightData[0].date}</p>
          <h1 className="text-lg text-gray-500">{`${Math.abs(getWhatLeftToGoal())}kg left to my goal`}</h1>
        </div>
        <div className="w-full flex items-center space-x-2">
          <h1 className="text-gray-500 text-sm">{`${userData.initialWeight}`}</h1>
          <div className="relative w-full h-3 bg-gray-200 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-opacity-70  bg-orange-500  rounded-full"
              style={{
                width: `${calculateProgress(
                  Number(userData.initialWeight),
                  Number(userData.goalWeight),
                  Number(weightData[0].weight)
                )}%`,
              }}
            ></div>
          </div>
          <h1 className="text-gray-500 text-sm">{`${userData.goalWeight}`}</h1>
        </div>
      </div>
      <div className="flex flex-col w-full space-y-4">
        <h1 className="text-gray-500 text-xl">Trends</h1>
        <div className="grid gap-4 grid-cols-2">
          <div className="border rounded-xl shadow flex px-4 py-4 flex-col space-y-4">
            <h1 className="text-gray-400 ">Last 7 days</h1>
            <div className="flex items-end">
              {renderCorrectArrow(lastWeekDifference)}

              <h1 className="text-gray-700 text-4xl">{Math.abs(lastWeekDifference)}</h1>
              <h1 className="text-gray-400 ">gr</h1>
            </div>
          </div>
          <div className="border rounded-xl shadow flex px-4 py-4 flex-col space-y-4">
            <h1 className="text-gray-400 ">Last 30 days</h1>
            <div className=" flex items-end">
              {renderCorrectArrow(lastMonthDifference)}

              <h1 className="text-gray-700 text-4xl">{Math.abs(lastMonthDifference)}</h1>
              <h1 className="text-gray-400 ">kg</h1>
            </div>
          </div>
          <div className="border rounded-xl shadow flex px-4 py-4 flex-col space-y-4">
            <h1 className="text-gray-400 ">Last 6 months</h1>
            <div className="flex items-end">
              {renderCorrectArrow(lastSixMonthsDifference)}

              <h1 className="text-gray-700 text-4xl">{Math.abs(lastSixMonthsDifference)}</h1>
              <h1 className="text-gray-400 ">kg</h1>
            </div>
          </div>
          <div className="border rounded-xl shadow flex px-4 py-4 flex-col space-y-4">
            <h1 className="text-gray-400 ">Last year</h1>
            <div className="flex items-end">
              {renderCorrectArrow(lastYearDifference)}
              <h1 className="text-gray-700 text-4xl">{Math.abs(lastYearDifference)}</h1>
              <h1 className="text-gray-400 ">kg</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
