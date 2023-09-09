import { NextRouter } from "next/router";
import { WeightData } from "../general/generalInterfaces";
import { Dispatch, SetStateAction } from "react";
import { DateInput, WeightInput } from "./newRecordTypes";
import { ErrorProps } from "../general/generalUtils";

export const handleSubmit = (
  event: any,
  weightData: WeightData[],
  setWeightData: (e: any) => void,
  setError: Dispatch<SetStateAction<ErrorProps>>,
  router: NextRouter,
  weightInput: WeightInput,
  dateInput: DateInput,
  setWeightInput: Dispatch<SetStateAction<WeightInput>>,
  setDateInput: Dispatch<SetStateAction<DateInput>>
) => {
  event.preventDefault();

  if (!weightInput) {
    setError("Please enter your weight.");
    return;
  }

  const setDate = dateInput ? new Date(dateInput) : new Date();
  const dateString = setDate.toLocaleDateString();

  const existingWeightData = weightData.find((data: WeightData) => data.date === dateString);

  const transformedWeightInput = weightInput && weightInput.replace(",", ".");

  if (existingWeightData) {
    const confirmed = window.confirm(`You already have a weight record for ${dateString}. Do you want to update it?`);

    if (confirmed) {
      const updatedWeightData = weightData.map((data: WeightData) => {
        if (data.date === dateString) {
          return { ...data, weight: transformedWeightInput };
        }
        return data;
      });

      setWeightData(updatedWeightData);
      localStorage.setItem("weightData", JSON.stringify(updatedWeightData));
      setWeightInput(null);
      setDateInput(null);
      setError(null);
      router.push("/graph");
    }
  } else {
    const newWeightData: WeightData[] = [{ date: dateString, weight: transformedWeightInput }, ...weightData];
    setWeightData(newWeightData);
    localStorage.setItem("weightData", JSON.stringify(newWeightData));
    setWeightInput(null);
    setDateInput(null);
    setError(null);
    router.push("/graph");
  }
};
