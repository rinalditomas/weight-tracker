import { WeightData } from "../general/generalInterfaces";

// Function to convert date string to JavaScript Date object
export function parseDate(dateString: string): Date {
  const parts = dateString.split("/");
  return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
}

// Calculate the average weight for a given time period
export function calculateAverageWeight(data: WeightData[], startDate: Date, endDate: Date): number {
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

export let getWhatLeftToGoal = (userData: any, weightData: WeightData[]): number => {
  let goalWeightToNumber = Number(userData.goalWeight);
  let currentWeightToNumber = weightData[0] ? Number(weightData[0].weight) : Number(userData.initialWeight);

  return +(goalWeightToNumber - currentWeightToNumber).toFixed(1);
};
